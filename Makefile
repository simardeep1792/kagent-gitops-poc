KIND_CLUSTER := kagent-demo
CONTEXT := kind-kagent-demo

.PHONY: test build-images load-images deploy-local status gateway-forward canary-v2

test:
	cd apps/simple-api && npm test

build-images:
	docker build --build-arg APP_VERSION=v1 -t kagent-poc-api:v1 apps/simple-api
	docker build --build-arg APP_VERSION=v2 -t kagent-poc-api:v2 apps/simple-api
	docker build -t kagent-poc-frontend:1.0 apps/frontend-api

load-images:
	kind load docker-image --name $(KIND_CLUSTER) kagent-poc-api:v1 kagent-poc-api:v2 kagent-poc-frontend:1.0

deploy-local: test build-images load-images
	kubectl --context $(CONTEXT) create namespace poc --dry-run=client -o yaml | kubectl apply -f -
	kubectl --context $(CONTEXT) label namespace poc istio-injection=enabled --overwrite
	helm upgrade --install istio-ingressgateway istio/gateway --namespace istio-ingress --create-namespace --set service.type=ClusterIP --wait --timeout 5m
	kubectl --context $(CONTEXT) apply -f gitops/bootstrap/project.yaml
	kubectl --context $(CONTEXT) apply -f gitops/bootstrap/root-application.yaml

status:
	kubectl --context $(CONTEXT) get applications -n argocd
	kubectl --context $(CONTEXT) get rollouts,deployments,pods -n poc

gateway-forward:
	kubectl --context $(CONTEXT) -n istio-ingress port-forward service/istio-ingressgateway 8082:80

canary-v2:
	cd gitops/apps/poc-stack && kustomize edit set image kagent-poc-api=kagent-poc-api:v2
	git add gitops/apps/poc-stack/kustomization.yaml
	git commit -m "Promote API to v2 canary"
	git push

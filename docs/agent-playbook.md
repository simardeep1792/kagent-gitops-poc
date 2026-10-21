# Agent Playbook

## istio-agent

Use it to draft and review Gateway, VirtualService, DestinationRule, and mTLS resources. Ask it for YAML, then validate against `gitops/apps/poc-stack/istio.yaml` before committing.

## argo-rollouts-conversion-agent

Use it to convert a Deployment to a Rollout or adjust canary and blue-green strategies. It supports Argo Rollouts, not Argo CD application administration.

## k8s-agent

Use it for live-cluster state: pods, events, Argo CD Applications, Istio CRDs, and rollout status.

## helm-agent

Use it to explain Helm releases and chart values. Do not let it upgrade platform components without a reviewed change.

## Boundaries

- Kagent is not a replacement for code review or GitOps approval.
- No dedicated Argo CD agent is included with Kagent 0.10.3.
- Prometheus and Grafana are not part of the first POC phase, so canary promotion uses manual gates rather than metric analysis.

# Kagent GitOps POC

A local progressive-delivery lab for Kubernetes agents. The project deploys a small API, a browser frontend, and an image-template workload through Argo CD. Istio provides traffic routing and Argo Rollouts manages canary promotion.

## Architecture

```text
GitHub repository -> Argo CD -> Argo Rollouts -> Istio Gateway -> frontend / API
                                      |
                                   canary steps

Kagent: istio-agent, argo-rollouts-conversion-agent, k8s-agent, helm-agent
```

## Workloads

- `poc-stack`: frontend plus `simple-api`, initially at `v1`.
- `own-image`: a safe NGINX template to replace with an image you own.

## Local Quick Start

The repository assumes the `kind-kagent-demo` cluster created for this POC.

```bash
make deploy-local
make status
```

Open the local ingress gateway with `make gateway-forward`, then visit `http://localhost:8082`.

To move the API from v1 to v2:

```bash
make canary-v2
kubectl -n poc argo rollouts get rollout simple-api --watch
```

The rollout pauses at 10% and 50%. Promote or abort it with:

```bash
kubectl -n poc argo rollouts promote simple-api
kubectl -n poc argo rollouts abort simple-api
```

## Security Notes

- This is a local Kind POC, not a production deployment.
- Images use explicit tags. Replace `own-image` with an immutable digest before using a real workload.
- Kagent's demo profile has broad permissions. Review agent-generated manifests before syncing them.
- The Argo CD repository is public to avoid placing GitHub credentials in this local lab.

See `docs/demo-runbook.md` for the guided demonstration and `docs/agent-playbook.md` for prompts.

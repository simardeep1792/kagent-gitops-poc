# Kagent GitOps POC

## Purpose

Local Kind demonstration of GitOps, Istio traffic management, Argo Rollouts, and Kagent-assisted operations.

## Commands

- `make test`: run API unit tests.
- `make deploy-local`: build images, load them into Kind, install the ingress gateway, and create Argo CD bootstrap resources.
- `make status`: inspect Argo CD applications and POC workloads.
- `make gateway-forward`: expose the application at `http://localhost:8082`.

## Conventions

- Keep Kubernetes resources scoped to namespace `poc`.
- Use explicit image tags; never use `latest`.
- Review generated YAML before committing it.
- Do not add credentials to Git. The local Argo CD project uses a public GitHub repository.

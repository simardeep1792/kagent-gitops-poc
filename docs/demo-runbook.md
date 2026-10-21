# Demo Runbook

## Before the demo

1. Run `make deploy-local`.
2. In a second terminal, run `make gateway-forward`.
3. Open `http://localhost:8082` and verify the frontend reports API `v1`.
4. Open Argo CD at `https://localhost:8081` and confirm `poc-stack` and `own-image` are Healthy.

## Canary demonstration

1. Run `make canary-v2`.
2. Watch the rollout with `kubectl -n poc argo rollouts get rollout simple-api --watch`.
3. At the 10% pause, refresh the frontend several times. Some requests should report v2.
4. Promote with `kubectl -n poc argo rollouts promote simple-api`.
5. At the 50% pause, ask Kagent to review `api-routes` and the Rollout status.
6. Promote again, or demonstrate recovery using `kubectl -n poc argo rollouts abort simple-api`.

## Kagent prompts

- `Review the Istio VirtualService named api-routes in namespace poc. Explain the stable and canary traffic split.`
- `Inspect the Argo Rollout simple-api in namespace poc. Which promotion step is active and what is required next?`
- `Generate a safer canary schedule for this local API with pauses at 5%, 25%, and 50%. Return YAML only.`

## Cleanup

Delete the applications in Argo CD, then remove the POC namespace:

```bash
kubectl -n argocd delete application poc-stack own-image
kubectl delete namespace poc
```

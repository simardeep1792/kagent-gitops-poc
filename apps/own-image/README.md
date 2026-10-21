# Bring Your Own Image

Replace the `nginx:1.27-alpine` image in `gitops/apps/own-image/deployment.yaml` with an immutable tag or digest.

Before changing it, record:

- Container port and health endpoint.
- Required environment variables and Secret references.
- CPU and memory requests/limits.
- Whether the image registry needs an image pull secret.

The workload is intentionally a standard Deployment. Convert it to an Argo Rollout only after its health checks are proven.

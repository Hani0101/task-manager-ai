# task-manager-ai
Task Manager with AI features

## Connecting the Pages frontend to the backend

GitHub Pages cannot reach a backend running on `localhost` in a Codespace. Make port 3000 public in the Codespace **Ports** tab, then open the Pages site with the forwarded URL as the `api` query parameter:

```text
https://hani0101.github.io/task-manager-ai/?api=https%3A%2F%2F3000-YOUR-CODESPACE-URL
```

The frontend saves this API URL in browser storage. It remains usable only while the Codespace and its forwarded port are running. For a permanent deployment, replace it with the URL of a publicly hosted backend.

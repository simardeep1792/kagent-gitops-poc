const status = document.querySelector("#api-status");
const refresh = document.querySelector("#refresh");

async function refreshStatus() {
  refresh.disabled = true;
  status.textContent = "Checking the routed API...";

  try {
    const response = await fetch("/api/version", { cache: "no-store" });
    if (!response.ok) throw new Error(`API returned ${response.status}`);

    const api = await response.json();
    status.textContent = `${api.service} is serving ${api.version}`;
  } catch (error) {
    status.textContent = `Unable to reach the API: ${error.message}`;
  } finally {
    refresh.disabled = false;
  }
}

refresh.addEventListener("click", refreshStatus);
refreshStatus();

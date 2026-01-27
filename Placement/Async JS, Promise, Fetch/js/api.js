function logApi(url, method, status, duration, source) {
  state.apiLogs.unshift({ url, method, status, duration, source });
  state.apiLogs = state.apiLogs.slice(0, 5);
  renderDevPanel();
}

function fetchWithRetry(url, options = {}, retries = 2) {
  const start = performance.now();

  return fetch(url, options)
    .then(res => {
      const duration = Math.round(performance.now() - start);
      logApi(url, options.method || "GET", res.status, duration, "network");
      if (!res.ok) throw new Error("API error");
      return res.json();
    })
    .catch(err => {
      if (retries > 0) {
        return fetchWithRetry(url, options, retries - 1);
      }
      throw err;
    });
}

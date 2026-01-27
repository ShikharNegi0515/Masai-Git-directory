function renderDevPanel() {
    document.getElementById("dev-panel").innerHTML =
        "<h4>Dev Panel</h4>" +
        state.apiLogs.map(log =>
            `<div>${log.method} ${log.url} | ${log.status} | ${log.duration}ms</div>`
        ).join("");
}

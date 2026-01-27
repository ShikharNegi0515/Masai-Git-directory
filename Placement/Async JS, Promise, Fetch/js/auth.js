// const BASE_URL = "https://fakestoreapi.com";

document.getElementById("login-btn").onclick = function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            state.token = data.token;
            localStorage.setItem("token", data.token);
            showUser(username);
        })
        .catch(() => showError("Login failed"));
};

function showUser(name) {
    document.getElementById("user-info").innerHTML =
        `Logged in as ${name} <button onclick="logout()">Logout</button>`;
}

function logout() {
    localStorage.clear();
    location.reload();
}

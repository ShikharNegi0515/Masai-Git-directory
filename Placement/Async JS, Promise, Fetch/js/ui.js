function showLoader(show) {
    document.getElementById("loader").style.display = show ? "block" : "none";
}

function showError(msg) {
    document.getElementById("error").innerText = msg;
}

document.getElementById("search").oninput = function (e) {
    const term = e.target.value;

    state.searchHistory.unshift(term);
    state.searchHistory = state.searchHistory.slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(state.searchHistory));

    renderSearchHistory();

    const filtered = state.products.filter(p =>
        p.title.toLowerCase().includes(term.toLowerCase())
    );

    renderProducts(filtered);
};

document.getElementById("products").addEventListener("click", function (e) {
    if (e.target.classList.contains("add-btn")) {
        const id = Number(e.target.dataset.id);
        const product = state.products.find(p => p.id === id);
        addToCart(product);
    }
});

function renderSearchHistory() {
    document.getElementById("search-history").innerHTML =
        "Recent searches: " + state.searchHistory.join(", ");
}

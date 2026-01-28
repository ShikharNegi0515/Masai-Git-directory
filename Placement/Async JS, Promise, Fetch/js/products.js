function loadProducts() {
    showLoader(true);

    fetchWithRetry(`${BASE_URL}/products`)
        .then(data => {
            state.products = data;
            localStorage.setItem("productCache", JSON.stringify(data));
            renderProducts(data);
        })
        .catch(() => {
            const cached = JSON.parse(localStorage.getItem("productCache"));
            if (cached) {
                document.getElementById("cache-label").innerText =
                    "⚠ Loaded from cache";
                renderProducts(cached);
            } else {
                showError("Failed to load products");
            }
        })
        .finally(() => showLoader(false));
}

function renderProducts(products) {
    const container = document.getElementById("products");
    container.innerHTML = products.map(p =>
        `<div class="product">
      <h4>${p.title}</h4>
      <p>$${p.price}</p>
      <button class="add-btn" data-id="${p.id}">Add</button>
    </div>`
    ).join("");
}

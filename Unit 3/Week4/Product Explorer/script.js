const productsContainer = document.getElementById("products");
const pagination = document.getElementById("pagination");
const categoryFilters = document.getElementById("categoryFilters");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");

let products = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 8;
let debounceTimer = null;

async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    products = data;
    filteredProducts = data;
    renderCategoryFilters();
    renderProducts();
    renderPagination();
}

function renderProducts() {
    productsContainer.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = filteredProducts.slice(start, end);

    if (currentItems.length === 0) {
        productsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    currentItems.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
    `;
        productsContainer.appendChild(div);
    });
}

function renderPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        currentPage--;
        renderProducts();
        renderPagination();
    };

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        currentPage++;
        renderProducts();
        renderPagination();
    };

    const pageInfo = document.createElement("span");
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    pagination.append(prevBtn, pageInfo, nextBtn);
}

function renderCategoryFilters() {
    const categories = [...new Set(products.map((p) => p.category))];
    categoryFilters.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.onclick = () => {
        filteredProducts = products;
        currentPage = 1;
        renderProducts();
        renderPagination();
    };
    categoryFilters.appendChild(allBtn);

    categories.forEach((cat) => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => {
            filteredProducts = products.filter((p) => p.category === cat);
            currentPage = 1;
            renderProducts();
            renderPagination();
        };
        categoryFilters.appendChild(btn);
    });
}

sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;

    if (value === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (value === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (value === "az") {
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    currentPage = 1;
    renderProducts();
    renderPagination();
});

searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const query = searchInput.value.toLowerCase();
        filteredProducts = products.filter((p) =>
            p.title.toLowerCase().includes(query)
        );
        currentPage = 1;
        renderProducts();
        renderPagination();
    }, 1000);
});

window.onload = fetchProducts;

loadProducts();
renderCart();
renderSearchHistory();

if (state.token) {
    document.getElementById("auth").style.display = "none";
}

function renderCart() {
    const container = document.getElementById("cart-items");

    if (state.cart.length === 0) {
        container.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
        document.getElementById("cart-total").innerText = "";
        return;
    }

    let total = 0;

    container.innerHTML = state.cart.map(item => {
        total += item.price * item.qty;

        return `
      <div class="cart-item">
        <div class="cart-info">
          <span class="cart-title">${item.title}</span>
          <span class="cart-price">$${item.price.toFixed(2)}</span>
        </div>

        <div class="cart-controls">
          <button onclick="updateQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)">+</button>
          <button class="remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
      </div>
    `;
    }).join("");

    document.getElementById("cart-total").innerText =
        `Total: $${total.toFixed(2)}`;

    localStorage.setItem("cart", JSON.stringify(state.cart));
}

function updateQty(id, delta) {
    const item = state.cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(id);
    } else {
        renderCart();
    }
}

function addToCart(product) {
    const existing = state.cart.find(i => i.id === product.id);
    if (existing) {
        existing.qty++;
    } else {
        state.cart.push({ ...product, qty: 1 });
    }
    renderCart();
}

function removeFromCart(id) {
    state.cart = state.cart.filter(i => i.id !== id);
    renderCart();
}

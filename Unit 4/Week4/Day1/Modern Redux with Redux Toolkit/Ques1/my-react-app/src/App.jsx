import React from 'react';
import './App.css'; // ✅ Add this line
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './redux/cartSlice';

const products = [
  { id: 1, name: 'Apple', price: 50 },
  { id: 2, name: 'Banana', price: 30 },
  { id: 3, name: 'Orange', price: 40 },
];

function App() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);

  return (
    <div className="app-container">
      <h1>🛒 Shopping Cart</h1>

      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div className="product-item" key={product.id}>
            <span>{product.name} - ₹{product.price}</span>
            <button onClick={() => dispatch(addItem(product))}>Add</button>
          </div>
        ))}
      </div>

      <h2>Cart Items</h2>
      <div className="cart-list">
        {items.length === 0 ? <p>No items in cart.</p> : (
          items.map(item => (
            <div className="cart-item" key={item.id}>
              <span>{item.name} - ₹{item.price}</span>
              <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
            </div>
          ))
        )}
      </div>

      <div className="total">Total: ₹{total}</div>
    </div>
  );
}

export default App;

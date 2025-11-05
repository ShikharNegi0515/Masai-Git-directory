import React, { useState } from "react";
import "./App.css";

export default function App() {
  const basePrice = 60000;

  const priceList = {
    processor: { i5: 0, i7: 15000, i9: 25000 },
    ram: { "8GB": 0, "16GB": 6000, "32GB": 12000 },
    storage: { "512GB SSD": 0, "1TB SSD": 8000, "2TB HDD": 5000 },
    color: { Silver: 0, Black: 0, Blue: 0 },
  };

  const [config, setConfig] = useState({
    processor: "",
    ram: "",
    storage: "",
    color: "",
    totalPrice: basePrice,
  });

  const [savedConfigs, setSavedConfigs] = useState([]);

  const updateConfig = (key, value) => {
    setConfig((prev) => {
      const newConfig = { ...prev, [key]: value };

      // calculate price
      const total =
        basePrice +
        (priceList.processor[newConfig.processor] || 0) +
        (priceList.ram[newConfig.ram] || 0) +
        (priceList.storage[newConfig.storage] || 0);
      newConfig.totalPrice = total;
      return newConfig;
    });
  };

  const handleSave = () => {
    if (!config.processor || !config.ram || !config.storage || !config.color) {
      alert("Please complete all selections before saving!");
      return;
    }
    setSavedConfigs((prev) => [...prev, config]);
    setConfig({
      processor: "",
      ram: "",
      storage: "",
      color: "",
      totalPrice: basePrice,
    });
  };

  const handleReset = () => {
    setConfig({
      processor: "",
      ram: "",
      storage: "",
      color: "",
      totalPrice: basePrice,
    });
  };

  const handleEdit = (saved) => {
    setConfig(saved);
  };

  const handleDelete = (index) => {
    setSavedConfigs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>Laptop Customizer</h1>

      <div className="customizer">
        {/* Processor */}
        <div className="field">
          <label>Processor:</label>
          <select
            value={config.processor}
            onChange={(e) => updateConfig("processor", e.target.value)}
          >
            <option value="">Select Processor</option>
            <option value="i5">Intel i5</option>
            <option value="i7">Intel i7</option>
            <option value="i9">Intel i9</option>
          </select>
        </div>

        {/* RAM */}
        <div className="field">
          <label>RAM:</label>
          <select
            value={config.ram}
            onChange={(e) => updateConfig("ram", e.target.value)}
          >
            <option value="">Select RAM</option>
            <option value="8GB">8GB</option>
            <option value="16GB">16GB</option>
            <option value="32GB">32GB</option>
          </select>
        </div>

        {/* Storage */}
        <div className="field">
          <label>Storage:</label>
          <select
            value={config.storage}
            onChange={(e) => updateConfig("storage", e.target.value)}
          >
            <option value="">Select Storage</option>
            <option value="512GB SSD">512GB SSD</option>
            <option value="1TB SSD">1TB SSD</option>
            <option value="2TB HDD">2TB HDD</option>
          </select>
        </div>

        {/* Color */}
        <div className="field">
          <label>Color:</label>
          <select
            value={config.color}
            onChange={(e) => updateConfig("color", e.target.value)}
          >
            <option value="">Select Color</option>
            <option value="Silver">Silver</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
      </div>

      {/* Preview */}
      <div
        className="preview"
        style={{
          borderColor:
            config.color === "Silver"
              ? "#aaa"
              : config.color === "Black"
                ? "#000"
                : config.color === "Blue"
                  ? "#007bff"
                  : "#ccc",
        }}
      >
        <h2>Preview</h2>
        <p>
          <strong>Processor:</strong> {config.processor || "—"}
        </p>
        <p>
          <strong>RAM:</strong> {config.ram || "—"}
        </p>
        <p>
          <strong>Storage:</strong> {config.storage || "—"}
        </p>
        <p>
          <strong>Color:</strong> {config.color || "—"}
        </p>
        <h3>Total Price: ₹{config.totalPrice}</h3>

        <div className="buttons">
          <button onClick={handleSave}>Save Configuration</button>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* Saved Configurations */}
      <div className="saved">
        <h2>Saved Configurations</h2>
        {savedConfigs.length === 0 ? (
          <p>No configurations saved yet.</p>
        ) : (
          savedConfigs.map((cfg, index) => (
            <div
              key={index}
              className="saved-item"
              style={{
                borderColor:
                  cfg.color === "Silver"
                    ? "#aaa"
                    : cfg.color === "Black"
                      ? "#000"
                      : "#007bff",
              }}
            >
              <p>
                <strong>Processor:</strong> {cfg.processor}
              </p>
              <p>
                <strong>RAM:</strong> {cfg.ram}
              </p>
              <p>
                <strong>Storage:</strong> {cfg.storage}
              </p>
              <p>
                <strong>Color:</strong> {cfg.color}
              </p>
              <p>
                <strong>Total:</strong> ₹{cfg.totalPrice}
              </p>
              <button onClick={() => handleEdit(cfg)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

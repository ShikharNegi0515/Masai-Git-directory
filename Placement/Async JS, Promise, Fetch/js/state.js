const state = {
    products: [],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    token: localStorage.getItem("token") || null,
    searchHistory: JSON.parse(localStorage.getItem("searchHistory")) || [],
    apiLogs: []
};

const BASE_URL = "https://fakestoreapi.com";

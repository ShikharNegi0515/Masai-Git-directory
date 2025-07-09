import React from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import FilterBar from "./components/FilterBar";

export default function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>📚 Book Store</h1>
      <BookForm />
      <FilterBar />
      <BookList />
    </div>
  );
}

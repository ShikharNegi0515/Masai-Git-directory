const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

const readData = () => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ books: [] }, null, 2));
    }
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};


app.post("/books", (req, res) => {
    try {
        const { title, author, year } = req.body;
        if (!title || !author || !year) {
            return res.status(400).json({ error: "All fields (title, author, year) are required" });
        }

        const data = readData();
        const newBook = {
            id: data.books.length ? data.books[data.books.length - 1].id + 1 : 1,
            title,
            author,
            year,
        };

        data.books.push(newBook);
        writeData(data);

        res.status(201).json(newBook);
    } catch {
        res.status(500).json({ error: "Failed to add book" });
    }
});

app.get("/books", (req, res) => {
    try {
        const data = readData();
        res.status(200).json(data.books);
    } catch {
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

app.get("/books/:id", (req, res) => {
    try {
        const data = readData();
        const book = data.books.find((b) => b.id === parseInt(req.params.id));
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.status(200).json(book);
    } catch {
        res.status(500).json({ error: "Failed to fetch book" });
    }
});

app.put("/books/:id", (req, res) => {
    try {
        const { title, author, year } = req.body;
        const data = readData();
        const bookIndex = data.books.findIndex((b) => b.id === parseInt(req.params.id));

        if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

        data.books[bookIndex] = {
            ...data.books[bookIndex],
            title: title || data.books[bookIndex].title,
            author: author || data.books[bookIndex].author,
            year: year || data.books[bookIndex].year,
        };

        writeData(data);
        res.status(200).json(data.books[bookIndex]);
    } catch {
        res.status(500).json({ error: "Failed to update book" });
    }
});

app.delete("/books/:id", (req, res) => {
    try {
        const data = readData();
        const newBooks = data.books.filter((b) => b.id !== parseInt(req.params.id));

        if (newBooks.length === data.books.length) {
            return res.status(404).json({ error: "Book not found" });
        }

        data.books = newBooks;
        writeData(data);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch {
        res.status(500).json({ error: "Failed to delete book" });
    }
});


app.get("/books/search", (req, res) => {
    try {
        const { author, title } = req.query;
        const data = readData();

        let results = data.books;

        if (author) {
            results = results.filter((b) =>
                b.author.toLowerCase().includes(author.toLowerCase())
            );
        }

        if (title) {
            results = results.filter((b) =>
                b.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        if (!results.length) {
            return res.status(404).json({ message: "No books found" });
        }

        res.status(200).json(results);
    } catch {
        res.status(500).json({ error: "Search failed" });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

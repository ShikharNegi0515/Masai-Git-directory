const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

const readData = () => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ dishes: [] }, null, 2));
    }
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.post("/dishes", (req, res) => {
    try {
        const { name, price, category } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const data = readData();
        const newDish = {
            id: data.dishes.length ? data.dishes[data.dishes.length - 1].id + 1 : 1,
            name,
            price,
            category,
        };

        data.dishes.push(newDish);
        writeData(data);

        res.status(201).json(newDish);
    } catch (err) {
        res.status(500).json({ error: "Failed to add dish" });
    }
});

app.get("/dishes", (req, res) => {
    try {
        const data = readData();
        res.status(200).json(data.dishes);
    } catch {
        res.status(500).json({ error: "Failed to fetch dishes" });
    }
});

app.get("/dishes/:id", (req, res) => {
    try {
        const data = readData();
        const dish = data.dishes.find((d) => d.id === parseInt(req.params.id));
        if (!dish) return res.status(404).json({ error: "Dish not found" });
        res.status(200).json(dish);
    } catch {
        res.status(500).json({ error: "Failed to fetch dish" });
    }
});

app.put("/dishes/:id", (req, res) => {
    try {
        const { name, price, category } = req.body;
        const data = readData();
        const dishIndex = data.dishes.findIndex(
            (d) => d.id === parseInt(req.params.id)
        );

        if (dishIndex === -1)
            return res.status(404).json({ error: "Dish not found" });

        data.dishes[dishIndex] = {
            ...data.dishes[dishIndex],
            name: name || data.dishes[dishIndex].name,
            price: price || data.dishes[dishIndex].price,
            category: category || data.dishes[dishIndex].category,
        };

        writeData(data);
        res.status(200).json(data.dishes[dishIndex]);
    } catch {
        res.status(500).json({ error: "Failed to update dish" });
    }
});

app.delete("/dishes/:id", (req, res) => {
    try {
        const data = readData();
        const newDishes = data.dishes.filter(
            (d) => d.id !== parseInt(req.params.id)
        );

        if (newDishes.length === data.dishes.length) {
            return res.status(404).json({ error: "Dish not found" });
        }

        data.dishes = newDishes;
        writeData(data);

        res.status(200).json({ message: "Dish deleted successfully" });
    } catch {
        res.status(500).json({ error: "Failed to delete dish" });
    }
});

app.get("/dishes/get", (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ error: "Name query required" });

        const data = readData();
        const results = data.dishes.filter((d) =>
            d.name.toLowerCase().includes(name.toLowerCase())
        );

        if (results.length === 0) {
            return res.status(404).json({ message: "No dishes found" });
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

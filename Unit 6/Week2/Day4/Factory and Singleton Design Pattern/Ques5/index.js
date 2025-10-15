class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getDescription() {
        throw new Error("Method 'getDescription()' must be implemented.");
    }
}

class Laptop extends Product {
    getDescription() {
        return `Laptop: ${this.name}, Price: $${this.price}`;
    }
}

class Mobile extends Product {
    getDescription() {
        return `Mobile: ${this.name}, Price: $${this.price}`;
    }
}

class Tablet extends Product {
    getDescription() {
        return `Tablet: ${this.name}, Price: $${this.price}`;
    }
}

const productMap = {
    Laptop: Laptop,
    Mobile: Mobile,
    Tablet: Tablet
};

class ProductFactory {
    static createProduct(type, name, price) {
        const ProductClass = productMap[type];
        if (!ProductClass) throw new Error("Unknown product type");
        return new ProductClass(name, price);
    }

    static registerProduct(type, ProductClass) {
        productMap[type] = ProductClass;
    }
}

const t = ProductFactory.createProduct("Tablet", "Galaxy Tab", 1100);
console.log(t.getDescription()); 

const l = ProductFactory.createProduct("Laptop", "MacBook Pro", 2500);
console.log(l.getDescription()); 

class Headphones extends Product {
    getDescription() {
        return `Headphones: ${this.name}, Price: $${this.price}`;
    }
}
ProductFactory.registerProduct("Headphones", Headphones);

const h = ProductFactory.createProduct("Headphones", "Sony WH-1000XM5", 350);
console.log(h.getDescription()); 

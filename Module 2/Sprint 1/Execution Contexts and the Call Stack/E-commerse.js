const checkout = {

    items: [],

    total: 0,

    addItem(item) {
        const price = Number(item.price);
        if (typeof price !== 'number' || isNaN(item.price)) {

            console.log("Invalid price.");

            return;

        }

        this.items.push(item);

        this.total += price;

    },

    getTotal() {

        return `Total: ${ parseFloat(this.total).toFixed(2) }`;
    }
};

checkout.addItem({ name: "Coffee Maker", price: "99.95" });

checkout.addItem({ name: "Milk", price: 3.50 });

console.log(checkout.getTotal()); // Expected issue !
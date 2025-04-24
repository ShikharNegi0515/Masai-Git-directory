function createInventoryItem(name, category, price) {
    return {
        name: name,
        category: category,
        price: price,
        describeItem: function () {
            console.log(`Item: ${name}, Category: ${category}, Price: ${price}`)
        }
    }
}

function addItemDiscount(obj, discountPercent) {
    let discountedPrice = obj.price - ((obj.price * discountPercent) / 100)
    return {
        ...obj,
        discountPrice: discountedPrice,
        applyDiscount : function() {
            console.log(`Discounted Price for ${this.name}: ${this.discountPrice}`)
        }
    }
}

const item = createInventoryItem("Laptop", "Electronics", 1500);
item.describeItem();

const discountedItem = addItemDiscount(item, 10);
discountedItem.applyDiscount();
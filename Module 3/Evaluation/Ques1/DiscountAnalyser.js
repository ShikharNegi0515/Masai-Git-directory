const cartItems = [
  { name: "Shoes", category: "Footwear", price: 4999, discount: 20 },
  { name: "T-shirt", category: "Apparel", price: 1999, discount: 35 },
  { name: "Bag", category: "Accessories", price: 2499, discount: 40 },
  { name: "Socks", category: "Apparel", price: 499, discount: 10 }
];

let discountedItems = cartItems.map((item) => {
    let discountedPrice = item.price - (item.price*item.discount)/100
    return {
        name : item.name,
        discountedPrice : parseFloat(discountedPrice.toFixed(2))
    }
})

let filteredItems = cartItems
.filter(item => item.discount >=30)
.map(item => {
    let discountedPrice = item.price - (item.price*item.discount)/100
    return {
        name : item.name,
        discountedPrice : parseFloat(discountedPrice.toFixed(2))
    }
})

let totalDiscountedValue = filteredItems.reduce((acc,item)=> acc + item.discountedPrice,0)

let result = {
    filteredItems,
    totalDiscountedValue: parseFloat(totalDiscountedValue.toFixed(2))
}

console.log(result)
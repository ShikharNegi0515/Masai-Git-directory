async function fetchProducts() {
    try{
        let response = await fetch("https://fakestoreapi.com/products")
        if(!response.ok){
            throw new Error("Failed to fetch products. Please try again later ")
        }
        let data = await response.json()
        data.forEach(element => {
            console.log(`Title: ${element.title}`);
            console.log(`Price: $${element.price}`);
            console.log(`Image: ${element.image}`);
            console.log(`View Details`);
            console.log('----------------------');
        });
        let totalPrice = data.reduce((sum,curr)=>sum + curr.price,0)
        console.log("Total Price of all products: $" + totalPrice.toFixed(2))
    }
    catch(error){
        console.log(error)
    }
    
}

fetchProducts()



// --------------------------- USING NORMAL ------------------------------

// fetch("https://fakestoreapi.com/products")
// .then(res => {
//     if(!res.ok) {
//         throw new Error ("Failed to fetch products. Please try again later ")
//     }
//     return res.json()
// })
// .then(data => {data.forEach(element => {
//     console.log(`Title: ${element.title}`);
//       console.log(`Price: $${element.price}`);
//       console.log(`Image: ${element.image}`);
//       console.log(`View Details`);
//       console.log('----------------------');
// })
//     let total = data.reduce((sum,curr)=> sum + curr.price,0)
//     console.log("Total Price of All Products: $" + total.toFixed(2));
// })
// .catch((err)=> {
//     console.log(`Error: ${err}`)
// })

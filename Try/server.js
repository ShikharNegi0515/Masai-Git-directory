async function fetchData(){
    let data = await fetch("https://fakestoreapi.com/products")
    let res = await data.json()
    console.log(res)
}

fetchData()
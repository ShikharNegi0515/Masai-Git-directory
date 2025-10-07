async function fetchdata() {
    let res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
    let data = await res.json()
    let result = []
    data = data.drinks
    // data.map((elem)=>{result.push(elem.drinks.strDrink)})
    // console.log(result)
    
    // result = data.drinks.filter((elem)=>{
    //     if(elem.strCategory =="Cocktail" && elem.strAlcoholic=="Alcoholic"){
    //         return elem
    //     }
    // })
    // console.log(result)

    result = data.sort((a,b)=>new Date(a.dateModified) - new Date(b.dateModified))
    console.log(result)
}

fetchdata()


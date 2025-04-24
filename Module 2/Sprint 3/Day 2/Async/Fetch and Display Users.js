fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => {
    let names = data.map((x) => x.name)
    console.log(names)
})

async function fetchdata() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json();
    let names = data.map(x=>x.name)
    console.log(names)
}

fetchdata()
let arr = [
    { title: "The Hobbit", author: "J.R.R. Tolkien" },
    { title: "1984", author: "George Orwell" },
    { title: "Pride and Prejudice", author: "Jane Austen" }
]

let titleArr = arr.map(elem => {
    return elem.title
})
console.log(titleArr)
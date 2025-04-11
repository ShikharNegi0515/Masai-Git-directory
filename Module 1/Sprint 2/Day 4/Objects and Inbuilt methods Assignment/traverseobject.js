let book = {
    title: "The Hobbit", 
    author: "J.R.R. Tolkien", 
    year: 1937 
}
str = ""
for (let key in book) {
    str +=`${key}: ${book[key]} `
}
console.log(str)
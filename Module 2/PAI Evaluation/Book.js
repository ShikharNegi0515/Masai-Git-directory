function Book(title, author, yearPublished) {
    this.title = title
    this.author = author
    this.yearPublished = yearPublished
}

Book.prototype.getSummary = function() {
    return (`${this.title} by ${this.author}, published in ${this.yearPublished}.`)
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 1937);
console.log(book1.getSummary());
function Book(title, author) {
    return {
        title,
        author,
        detail: function () {
            console.log("Title: " + this.title + ", Author: " + this.author);
        }
    }
}

function createLibrary() {
    let books = []
    return {
        addBook: function (book) {
            books.push(book)
        },
        removeBook: function (title) {
            const originalLength = books.length;
            books = books.filter(book => book.title !== title);
            if (books.length === originalLength) {
                console.log(`Book titled "${title}" not found.`);
            }
        },
        listBooks: function() {
            if (books.length === 0) {
                console.log("No books available in the library.");
              }
            else {
                books.forEach((book)=>book.detail())
            }
        }
    }
}

const library = createLibrary();

const book1 = Book("To Kill a Mockingbird", "Harper Lee");
const book2 = Book("1984", "George Orwell");

library.addBook(book1);
library.addBook(book2);

library.listBooks();

library.removeBook("1984");
library.listBooks();
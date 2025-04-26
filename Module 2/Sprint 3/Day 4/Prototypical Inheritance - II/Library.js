function Book(title, author, isAvailable = true) {
    this.title = title
    this.author = author
    this.isAvailable = isAvailable
}

function Member(name, borrowedBooks = []) {
    this.name = name
    this.borrowedBooks = borrowedBooks
}

Member.prototype.borrowBook = function (book) {
    if (this.borrowedBooks.length >= 3) {
        console.log(`${this.name} cannot borrow more than 3 books at a time.`);
        return;
    }

    if (book.isAvailable) {
        book.isAvailable = false
        this.borrowedBooks.push(book.title)
    }
    else {
        console.log(`Sorry, "${book.title}" is Already borrowed.`)
    }
}

function PremiumMember(name, borrowedBooks = [], specialCollectionAccess = true) {
    Member.call(this, name, borrowedBooks)
    this.specialCollectionAccess = specialCollectionAccess
}

// Inherit Member Prototype Methods
PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

PremiumMember.prototype.borrowBook = function(book) {
    if (this.borrowedBooks.length >= 5) {
      console.log(`${this.name} cannot borrow more than 5 books at a time.`);
      return;
    }
    if (book.isAvailable) {
      book.isAvailable = false;
      this.borrowedBooks.push(book.title);
      console.log(`${this.name} has borrowed "${book.title}".`);
    } else {
      console.log(`Sorry, "${book.title}" is already borrowed.`);
    }
  };

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
const book2 = new Book("1984", "George Orwell");
const book3 = new Book("Moby Dick", "Herman Melville");
const book4 = new Book("To Kill a Mockingbird", "Harper Lee");
const book5 = new Book("Pride and Prejudice", "Jane Austen");

// Create regular and premium members
const regularMember = new Member("John Doe");
const premiumMember = new PremiumMember("Jane Doe");

// Borrow books for regular member
regularMember.borrowBook(book1); // Should work
regularMember.borrowBook(book2); // Should work
regularMember.borrowBook(book3); // Should work
regularMember.borrowBook(book4); // Should show error: cannot borrow more than 3 books

// Borrow books for premium member
premiumMember.borrowBook(book4); // Should work (premium member can borrow up to 5 books)
premiumMember.borrowBook(book5); // Should work
premiumMember.borrowBook(book1); // Should show error: book is already borrowed

// Use bind to create a bound function for borrowing a book for regular member
const boundBorrow = regularMember.borrowBook.bind(regularMember);

// Borrow more books using the bound function
boundBorrow(book4); // Should show error: book is already borrowed
boundBorrow(book5); // Should work
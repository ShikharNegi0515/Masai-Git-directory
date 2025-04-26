// books.js
import { Book } from './index.mjs';


const book1 = new Book("Atomic Habits", "James Clear", 2018);
const book2 = new Book("The Alchemist", "Paulo Coelho", 1988);
const book3 = new Book("The Pragmatic Programmer", "Andrew Hunt", 1999);

const booksArray = [book1, book2, book3];

export { booksArray };

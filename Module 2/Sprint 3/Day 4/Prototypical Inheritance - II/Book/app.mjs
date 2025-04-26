import { booksArray } from './Book.mjs'; 

const summaries = booksArray.map(book => book.getSummary());

console.log(summaries);

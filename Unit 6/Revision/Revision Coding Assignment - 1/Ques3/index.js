const movies = [
    { title: "Inception", rating: 8.8, genre: "Sci-Fi", year: 2010 },
    { title: "Interstellar", rating: 8.6, genre: "Sci-Fi", year: 2014 },
    { title: "Dunkirk", rating: 7.9, genre: "War", year: 2017 },
    { title: "Tenet", rating: 7.4, genre: "Sci-Fi", year: 2020 },
    { title: "Memento", rating: 8.4, genre: "Thriller", year: 2000 },
    { title: "Avatar", rating: 7.9, genre: "Sci-Fi", year: 2009 },
    { title: "The Matrix", rating: 8.7, genre: "Sci-Fi", year: 1999 },
    { title: "The Matrix Reloaded", rating: 7.2, genre: "Sci-Fi", year: 2003 },
    { title: "The Matrix Revolutions", rating: 6.8, genre: "Sci-Fi", year: 2003 },
    { title: "The Martian", rating: 8.0, genre: "Sci-Fi", year: 2015 },
    { title: "Gravity", rating: 7.7, genre: "Sci-Fi", year: 2013 },
    { title: "Arrival", rating: 7.9, genre: "Sci-Fi", year: 2016 },
    { title: "Blade Runner 2049", rating: 8.0, genre: "Sci-Fi", year: 2017 },
    { title: "Oblivion", rating: 7.0, genre: "Sci-Fi", year: 2013 },
    { title: "Edge of Tomorrow", rating: 7.9, genre: "Sci-Fi", year: 2014 },
    { title: "Ex Machina", rating: 7.7, genre: "Sci-Fi", year: 2015 },
    { title: "Her", rating: 8.0, genre: "Sci-Fi", year: 2013 },
    { title: "I, Robot", rating: 7.1, genre: "Sci-Fi", year: 2004 },
    { title: "Looper", rating: 7.4, genre: "Sci-Fi", year: 2012 },
    { title: "Source Code", rating: 7.5, genre: "Sci-Fi", year: 2011 },
    { title: "The Prestige", rating: 8.5, genre: "Thriller", year: 2006 },
    { title: "A.I. Artificial Intelligence", rating: 7.2, genre: "Sci-Fi", year: 2001 },
    { title: "Star Wars: A New Hope", rating: 8.6, genre: "Sci-Fi", year: 1977 },
    { title: "Star Wars: Empire Strikes Back", rating: 8.7, genre: "Sci-Fi", year: 1980 },
    { title: "Star Wars: Return of the Jedi", rating: 8.3, genre: "Sci-Fi", year: 1983 },
    { title: "Star Wars: The Force Awakens", rating: 7.8, genre: "Sci-Fi", year: 2015 },
    { title: "Star Wars: The Last Jedi", rating: 6.9, genre: "Sci-Fi", year: 2017 },
    { title: "Star Wars: Rise of Skywalker", rating: 6.5, genre: "Sci-Fi", year: 2019 },
    { title: "Dune", rating: 8.3, genre: "Sci-Fi", year: 2021 },
    { title: "Dune: Part Two", rating: 8.9, genre: "Sci-Fi", year: 2024 },
    { title: "Elysium", rating: 6.6, genre: "Sci-Fi", year: 2013 },
    { title: "District 9", rating: 8.0, genre: "Sci-Fi", year: 2009 },
    { title: "Snowpiercer", rating: 7.1, genre: "Sci-Fi", year: 2013 },
    { title: "Passengers", rating: 7.0, genre: "Sci-Fi", year: 2016 },
    { title: "Moon", rating: 7.8, genre: "Sci-Fi", year: 2009 },
    { title: "Alien", rating: 8.5, genre: "Sci-Fi", year: 1979 },
    { title: "Aliens", rating: 8.4, genre: "Sci-Fi", year: 1986 },
    { title: "Prometheus", rating: 7.0, genre: "Sci-Fi", year: 2012 },
    { title: "The Fifth Element", rating: 7.6, genre: "Sci-Fi", year: 1997 },
    { title: "Minority Report", rating: 7.6, genre: "Sci-Fi", year: 2002 },
    { title: "Ready Player One", rating: 7.5, genre: "Sci-Fi", year: 2018 },
    { title: "Contact", rating: 7.4, genre: "Sci-Fi", year: 1997 },
    { title: "2001: A Space Odyssey", rating: 8.3, genre: "Sci-Fi", year: 1968 },
    { title: "The Terminator", rating: 8.1, genre: "Sci-Fi", year: 1984 },
    { title: "Terminator 2: Judgment Day", rating: 8.6, genre: "Sci-Fi", year: 1991 },
    { title: "Terminator 3: Rise of the Machines", rating: 6.3, genre: "Sci-Fi", year: 2003 },
    { title: "Avatar: The Way of Water", rating: 7.8, genre: "Sci-Fi", year: 2022 },
    { title: "Guardians of the Galaxy", rating: 8.0, genre: "Sci-Fi", year: 2014 },
    { title: "Guardians of the Galaxy Vol. 2", rating: 7.6, genre: "Sci-Fi", year: 2017 },
    { title: "Avengers: Endgame", rating: 8.4, genre: "Sci-Fi", year: 2019 },
    { title: "Avengers: Infinity War", rating: 8.4, genre: "Sci-Fi", year: 2018 },
    { title: "Iron Man", rating: 7.9, genre: "Sci-Fi", year: 2008 },
    { title: "Iron Man 2", rating: 7.0, genre: "Sci-Fi", year: 2010 },
    { title: "Iron Man 3", rating: 7.2, genre: "Sci-Fi", year: 2013 },
];

const sciFiMovies = movies.filter(movie => movie.genre === "Sci-Fi");

const highRated = sciFiMovies.filter(movie => movie.rating >= 8);

const sortedByYear = highRated.sort((a, b) => a.year - b.year);

const averageRating = (
  sortedByYear.reduce((sum, movie) => sum + movie.rating, 0) / sortedByYear.length
).toFixed(2);

const titles = sortedByYear.map(movie => movie.title);

console.log("Filtered Movies:", titles);
console.log("Average Rating:", averageRating);
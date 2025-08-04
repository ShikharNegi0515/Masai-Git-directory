import { useState } from 'react';
import MovieCard from '../components/MovieCard';

const API_KEY = '43393ee8'; 

export default function Home() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
            const data = await res.json();
            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setError(data.Error);
                setMovies([]);
            }
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>🎬 Movie Search</h2>
            <input
                type="text"
                placeholder="Search movies by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="movie-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    );
}

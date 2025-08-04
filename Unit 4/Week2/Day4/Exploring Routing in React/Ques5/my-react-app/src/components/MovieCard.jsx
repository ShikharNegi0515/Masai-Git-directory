import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <Link to={`/movie/${movie.imdbID}`}>View Details</Link>
        </div>
    );
}

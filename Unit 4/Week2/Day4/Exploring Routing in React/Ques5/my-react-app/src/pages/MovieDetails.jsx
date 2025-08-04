import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '43393ee8'; 

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === "True") {
                    setMovie(data);
                    setError('');
                } else {
                    setError(data.Error);
                }
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container">Loading movie...</div>;
    if (error) return <div className="container">❌ {error}</div>;

    return (
        <div className="container">
            <h2>{movie.Title} ({movie.Year})</h2>
            <img src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"} alt={movie.Title} style={{ maxWidth: "300px" }} />
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
    );
}

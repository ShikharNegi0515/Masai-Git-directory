import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (city.trim()) {
            navigate(`/weather/${city.trim()}`);
        }
    };

    return (
        <div className="container">
            <h2>🌤️ Weather Dashboard</h2>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="search-input"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

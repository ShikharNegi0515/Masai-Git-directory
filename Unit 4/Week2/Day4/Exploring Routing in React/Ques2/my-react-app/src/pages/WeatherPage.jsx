import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual key

export default function WeatherPage() {
    const { city } = useParams();
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        )
            .then(res => {
                if (!res.ok) throw new Error('City not found');
                return res.json();
            })
            .then(data => {
                setWeather(data);
                setError('');
            })
            .catch(err => {
                setError(err.message);
                setWeather(null);
            });
    }, [city]);

    if (error) return <div className="container">❌ {error}</div>;

    if (!weather) return <div className="container">Loading weather...</div>;

    return (
        <div className="container">
            <h2>Weather in {weather.name}</h2>
            <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
            <p><strong>Humidity:</strong> {weather.main.humidity} %</p>
            <p><strong>Condition:</strong> {weather.weather[0].description}</p>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Globe2, MapPin, Users, CloudSun, Newspaper } from 'lucide-react';

export default function CountryDetails({ country, onBack }) {
    const [weather, setWeather] = useState(null);
    const [news, setNews] = useState(null);

    useEffect(() => {
        async function fetchExtra() {
            const capital = country.capital?.[0];
            if (capital) {
                try {
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=0e7ee51da744dc646efe9efcdec19928`
                    );
                    setWeather(await res.json());
                } catch {
                    console.warn('Failed to load weather');
                }
            }

            const code = country.cca2?.toLowerCase();
            if (code) {
                try {
                    const res = await fetch(
                        `https://newsapi.org/v2/top-headlines?country=${code}&pageSize=3&apiKey=b51289368260411488e59fc947da50b5`
                    );
                    const data = await res.json();
                    setNews(data.articles);
                } catch {
                    console.warn('Failed to load news');
                }
            }
        }
        fetchExtra();
    }, [country]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-all">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
                <ArrowLeft size={18} /> Back
            </button>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                    src={country.flags?.svg}
                    alt="flag"
                    className="w-64 h-40 object-cover rounded-lg shadow"
                />

                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2">{country.name.official}</h2>
                    <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                        <MapPin className="mr-2 text-blue-500" size={18} />
                        <strong>Capital:</strong>&nbsp;{country.capital?.[0] || 'N/A'}
                    </p>
                    <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                        <Globe2 className="mr-2 text-green-500" size={18} />
                        <strong>Region:</strong>&nbsp;{country.region}
                    </p>
                    <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300">
                        <Users className="mr-2 text-yellow-500" size={18} />
                        <strong>Population:</strong>&nbsp;{country.population.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Weather Card */}
            {weather && (
                <div className="mt-8 bg-blue-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CloudSun className="text-blue-500" size={24} />
                        <div>
                            <h3 className="text-lg font-semibold">Current Weather</h3>
                            <p className="text-gray-700 dark:text-gray-300 capitalize">
                                {Math.round(weather.main.temp)}°C — {weather.weather?.[0]?.description}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Feels like {Math.round(weather.main.feels_like)}°C
                    </p>
                </div>
            )}

            {/* News Section */}
            {news && news.length > 0 && (
                <div className="mt-8">
                    <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
                        <Newspaper className="text-red-500" size={22} />
                        Latest Headlines
                    </h3>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                        {news.map((n, i) => (
                            <a
                                key={i}
                                href={n.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors p-4 rounded-lg shadow-sm"
                            >
                                {n.urlToImage && (
                                    <img
                                        src={n.urlToImage}
                                        alt={n.title}
                                        className="w-full h-40 object-cover rounded-md mb-3"
                                    />
                                )}
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{n.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {n.description ? n.description.slice(0, 100) + '...' : 'Read more →'}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

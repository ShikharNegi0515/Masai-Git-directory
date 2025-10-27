import React from 'react';
import { Star, StarOff } from 'lucide-react';

export default function CountryCard({ country, onClick, isFavorite, toggleFavorite }) {
    return (
        <div
            onClick={onClick}
            className="relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
        >
            <img
                src={country.flags?.svg}
                alt={`${country.name.common} flag`}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{country.name.common}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Region:</strong> {country.region}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Population:</strong> {country.population.toLocaleString()}
                </p>
            </div>

            {/* Favorite Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite();
                }}
                className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 ${isFavorite
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                    }`}
            >
                {isFavorite ? <Star fill="currentColor" size={18} /> : <StarOff size={18} />}
            </button>
        </div>
    );
}

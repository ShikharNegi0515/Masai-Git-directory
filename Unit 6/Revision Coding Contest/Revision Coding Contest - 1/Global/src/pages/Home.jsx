import React, { useEffect, useState, useMemo } from 'react';
import CountryCard from '../components/CountryCard.jsx';
import Pagination from '../components/Pagination.jsx';
import useLocalStorage from '../utils/useLocalStorage.js';
import Loading from '../components/Loading.jsx';
import Error from '../components/Error.jsx';

export default function Home({ onSelect, favoritesView }) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [regionFilter, setRegionFilter] = useState('All');
    const [sortBy, setSortBy] = useState('none');
    const [page, setPage] = useState(1);
    const pageSize = 12;

    const [favorites, setFavorites] = useLocalStorage('ce_favorites', []);
    const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,capital,flags,region,population,area');
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                const data = await res.json();
                setCountries(data);
            } catch (err) {
                setError('Failed to load countries');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const filtered = useMemo(() => {
        let arr = favoritesView ? countries.filter(c => favorites.includes(c.cca3)) : countries;
        if (regionFilter !== 'All') arr = arr.filter(c => c.region === regionFilter);
        if (query.trim()) arr = arr.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()));
        if (sortBy === 'population') arr.sort((a, b) => b.population - a.population);
        else if (sortBy === 'area') arr.sort((a, b) => (b.area || 0) - (a.area || 0));
        return arr;
    }, [countries, favoritesView, favorites, regionFilter, query, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

    const toggleFavorite = (code) => {
        setFavorites(prev => {
            const next = new Set(prev);
            next.has(code) ? next.delete(code) : next.add(code);
            return Array.from(next);
        });
    };

    if (loading) return <Loading />;
    if (error) return <Error message={error} />;

    return (
        <div className="space-y-6">
            {/* Filters */}
            {!favoritesView && (
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <input
                        className="w-full md:w-1/3 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
                        placeholder="🔍 Search for a country..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <select
                            value={regionFilter}
                            onChange={e => setRegionFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-900"
                        >
                            {['All', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania'].map(r => (
                                <option key={r}>{r}</option>
                            ))}
                        </select>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-900"
                        >
                            <option value="none">Sort</option>
                            <option value="population">Population</option>
                            <option value="area">Area</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pageItems.map(c => (
                    <CountryCard
                        key={c.cca3}
                        country={c}
                        onClick={() => onSelect(c)}
                        isFavorite={favoriteSet.has(c.cca3)}
                        toggleFavorite={() => toggleFavorite(c.cca3)}
                    />
                ))}
            </div>

            {/* Pagination */}
            {!favoritesView && (
                <div className="mt-6 flex justify-center">
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </div>
            )}
        </div>
    );
}

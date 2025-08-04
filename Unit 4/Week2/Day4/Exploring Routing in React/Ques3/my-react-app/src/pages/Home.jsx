import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setFiltered(data.products);
                const uniqueCats = ['all', ...new Set(data.products.map(p => p.category))];
                setCategories(uniqueCats);
            });
    }, []);

    useEffect(() => {
        let result = [...products];

        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (sortOrder === 'low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'high') {
            result.sort((a, b) => b.price - a.price);
        }

        setFiltered(result);
    }, [products, selectedCategory, sortOrder]);

    return (
        <div className="container">
            <h2>🛒 Product Store</h2>

            <div className="controls">
                <select onChange={e => setSelectedCategory(e.target.value)}>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                    ))}
                </select>

                <select onChange={e => setSortOrder(e.target.value)}>
                    <option value="">Sort by</option>
                    <option value="low">Price: Low → High</option>
                    <option value="high">Price: High → Low</option>
                </select>
            </div>

            <div className="product-grid">
                {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

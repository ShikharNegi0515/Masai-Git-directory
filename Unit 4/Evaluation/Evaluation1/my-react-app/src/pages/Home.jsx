import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/recipes')
            .then(res => setRecipes(res.data.recipes))
            .catch(err => console.error('Error fetching recipes:', err));
    }, []);

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    return (
        <div className="grid-container">
            {recipes.map(recipe => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favorites.includes(recipe.id)}
                    onToggleFavorite={toggleFavorite}
                />
            ))}
        </div>
    );
}

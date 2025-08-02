import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`https://dummyjson.com/recipes/${id}`)
            .then(res => setRecipe(res.data))
            .catch(err => console.error('Error fetching recipe:', err));
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="recipe-detail">
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} />
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
            <h3>Ingredients</h3>
            <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
            <h3>Instructions</h3>
            <ol>{recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
        </div>
    );
}

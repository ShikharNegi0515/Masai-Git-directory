import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.name} />
                <h3>{recipe.name}</h3>
                <p>Cuisine: {recipe.cuisine}</p>
            </Link>
            <button onClick={() => onToggleFavorite(recipe.id)} className="favorite-btn">
                {isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
    );
}

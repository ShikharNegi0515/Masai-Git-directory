import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [id]);

    if (!product) return <div className="container">Loading product...</div>;

    return (
        <div className="container">
            <h2>{product.title}</h2>
            <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '300px' }} />
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p>{product.description}</p>
        </div>
    );
}

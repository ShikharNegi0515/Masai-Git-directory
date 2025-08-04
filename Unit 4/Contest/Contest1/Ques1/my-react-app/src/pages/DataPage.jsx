import { useEffect, useState } from 'react';

export default function DataPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div className="container">
            <h2>Fetched Data</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

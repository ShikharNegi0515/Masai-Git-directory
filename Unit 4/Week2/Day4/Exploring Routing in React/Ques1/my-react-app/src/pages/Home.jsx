import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data.posts));
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h2>📝 Blog Posts</h2>
            <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
            <ul className="post-list">
                {filteredPosts.map(post => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>
                            <strong>{post.title}</strong>
                        </Link>
                        <p>{post.body.substring(0, 100)}...</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

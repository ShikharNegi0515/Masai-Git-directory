import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data));
    }, [id]);

    if (!post) return <p>Loading post...</p>;

    return (
        <div className="container">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="tags">
                <strong>Tags: </strong>
                {post.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                ))}
            </div>
        </div>
    );
}

import { useEffect, useState } from "react"
import { fetchUser, fetchComments } from "../api"
import Comments from "./comments"

const PostCard = ({ post }) => {
    const [user, setUser] = useState(null)
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [loadingComments, setLoadingComments] = useState(false)

    useEffect(() => {
        fetchUser(post.userId).then(setUser)
    }, [post.userId])

    const toggleComments = async () => {
        if (!showComments && comments.length === 0) {
            setLoadingComments(true);
            const data = await fetchComments(post.id);
            setComments(data);
            setLoadingComments(false);
        }
        setShowComments((prev) => !prev);
    }
    return (
        <div className="post-card">
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            <div className="post-footer">
                <span className="username">
                    {user ? `@${user.username}` : "Loading user..."}
                </span>

                <button className="comment-btn" onClick={toggleComments}>
                    💬 {comments.length > 0 && comments.length}
                </button>
            </div>

            {showComments && (
                <>
                    {loadingComments ? (
                        <p className="loading">Loading comments...</p>
                    ) : (
                        <Comments comments={comments} />
                    )}
                </>
            )}
        </div>
    );
};

export default PostCard;


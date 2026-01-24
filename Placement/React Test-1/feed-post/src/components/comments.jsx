const Comments = ({ comments }) => {
    return (
        <div className="comments">
            {comments.map((c) => (
                <div key={c.id} className="comment">
                    <strong>{c.email}</strong>
                    <p>{c.body}</p>
                </div>
            ))}
        </div>
    );
};

export default Comments;

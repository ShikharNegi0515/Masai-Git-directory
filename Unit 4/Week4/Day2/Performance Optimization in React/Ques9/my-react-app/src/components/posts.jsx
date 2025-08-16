import React, { useMemo } from "react";

const Post = React.memo(({ post, toggleVerify }) => {
    const backgroundColor = useMemo(() => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        return randomColor;
    }, [post.verifyPost]);

    return (
        <div
            style={{
                margin: "10px",
                padding: "10px",
                border: "1px solid black",
                backgroundColor,
            }}
        >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>Status: {post.verifyPost ? "Verified ✅" : "Not Verified ❌"}</p>
            <button onClick={() => toggleVerify(post.id)}>
                {post.verifyPost ? "Unverify" : "Verify"}
            </button>
        </div>
    );
});

export default Post;

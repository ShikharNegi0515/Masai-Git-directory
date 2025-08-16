import React, { useState, useEffect, useCallback } from "react";
import Post from "./components/posts";

function App() {
  const [timer, setTimer] = useState(0);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addPost = () => {
    if (!title || !body) return;
    const newPost = {
      id: Date.now(),
      title,
      body,
      verifyPost: false,
    };
    setPosts((prev) => [...prev, newPost]);
    setTitle("");
    setBody("");
  };

  const toggleVerify = useCallback((id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, verifyPost: !post.verifyPost } : post
      )
    );
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>React Performance Optimisation Demo</h2>
      <p>Timer: {timer}</p>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <br />
      <button onClick={addPost}>Add Post</button>

      <div style={{ marginTop: "20px" }}>
        {posts.map((post) => (
          <Post key={post.id} post={post} toggleVerify={toggleVerify} />
        ))}
      </div>
    </div>
  );
}

export default App;
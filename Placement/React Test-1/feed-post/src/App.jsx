import { useEffect, useState } from "react";
import { fetchPosts } from "./api";
import "./App.css";
import PostCard from "./components/postcard";

const App = () => {

  const [posts, setposts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts()
        setposts(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false);
      }
    }
    loadPosts()
  }, [])

  if (loading) return <p className="center">Loading posts...</p>;
  if (error) return <p className="center error">{error}</p>;



  return (
    <div className="container">
      <h1>Posts Feed</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default App;

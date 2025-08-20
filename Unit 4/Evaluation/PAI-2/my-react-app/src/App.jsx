import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import RepoCard from "./components/RepoCard";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const [repos, setRepos] = useState([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!query) return

    const fetchRepos = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await axios.get(`https://api.github.com/users/${query}/repos`)
        setRepos(res.data)
      } catch (err) {
        setError("User not found or API error.")
        setRepos([])
      } finally {
        setLoading(false)
      }
    };

    fetchRepos();
  }, [query]);

  return (
    <div className="app">
      <header>
        <h1>QuickRepo Viewer</h1>
        <button onClick={toggleTheme}>
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>

      <SearchBar onSearch={setQuery} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="repo-list">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            name={repo.name}
            description={repo.description}
            stars={repo.stargazers_count}
            forks={repo.forks_count}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

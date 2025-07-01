import { useState } from 'react'
import './App.css'
import Main from './Components/Main';

function App() {
  const [userName, setUserName] = useState("");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Props Drilling Example</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Main userName={userName} />
    </div>
  )
}

export default App

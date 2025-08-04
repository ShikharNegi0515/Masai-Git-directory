import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);


  return (
    <>
      <div className="container">
        <div className={`status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? '✅ You are online' : '🔴 No internet connection'}
        </div>

        <h2>User List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App

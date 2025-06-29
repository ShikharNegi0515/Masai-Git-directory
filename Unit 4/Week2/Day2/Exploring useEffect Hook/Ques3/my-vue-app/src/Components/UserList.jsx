import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch users');
                return res.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>User Profiles</h2>

            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={styles.input}
            />

            {loading && <p style={styles.text}>Loading users...</p>}
            {error && <p style={styles.error}>Error: {error}</p>}

            <div style={styles.grid}>
                {!loading && !error && filteredUsers.map(user => (
                    <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        city={user.address.city}
                    />
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#1e1e1e',
        minHeight: '100vh',
        color: '#f0f0f0'
    },
    heading: {
        marginBottom: '20px'
    },
    input: {
        padding: '10px',
        width: '100%',
        fontSize: '1rem',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #666',
        backgroundColor: '#2a2a2a',
        color: '#fff'
    },
    text: {
        color: '#ccc'
    },
    error: {
        color: 'red'
    },
    grid: {
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    }
};

export default UserList;

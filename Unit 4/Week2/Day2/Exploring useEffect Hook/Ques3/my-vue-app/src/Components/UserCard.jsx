import React from 'react';

const UserCard = ({ name, email, city }) => {
    return (
        <div style={styles.card}>
            <h3 style={styles.name}>{name}</h3>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>City:</strong> {city}</p>
        </div>
    );
};

const styles = {
    card: {
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#2c2c2c',
        color: '#e0e0e0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        border: '1px solid #444',
        transition: 'transform 0.2s ease',
    },
    name: {
        color: '#ffffff',
        marginBottom: '10px'
    }
};

export default UserCard;

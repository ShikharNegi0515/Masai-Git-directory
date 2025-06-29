import React from 'react';

const ProfileCard = ({
    name = 'Anonymous User',
    age,
    bio = 'This user prefers to keep an air of mystery about them.'
}) => {
    const truncatedBio = bio.length > 100 ? bio.slice(0, 100) + '… Read More' : bio;

    return (
        <div style={styles.card}>
            <h2 style={styles.name}>{name}</h2>
            <p style={styles.age}>Age: {age}</p>
            <p style={styles.bio}>{truncatedBio}</p>
        </div>
    );
};

const styles = {
    card: {
        width: '300px',
        padding: '20px',
        margin: '10px auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
    },
    name: {
        fontSize: '1.5rem',
        color: '#333',
    },
    age: {
        color: '#555',
        marginBottom: '10px',
    },
    bio: {
        fontSize: '0.95rem',
        color: '#444',
    }
};

export default ProfileCard;

import React from 'react';

const ThemedBox = ({ theme, text }) => {
    const isDark = theme === 'dark';

    const styles = {
        backgroundColor: isDark ? '#222' : '#eee',
        color: isDark ? '#f9f9f9' : '#111',
        padding: '40px',
        width: '120px',
        height: '120px',
        borderRadius: '10px',
        boxShadow: isDark
            ? '0 0 10px rgba(255, 255, 255, 0.1)'
            : '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    };

    return <div style={styles}>{text}</div>;
};

export default ThemedBox;

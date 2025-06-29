import React, { useState } from 'react';
import ThemedBox from './ThemedBox';

const ThemeApp = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div style={styles.app}>
            <h2>Theme Toggle App</h2>
            <button onClick={toggleTheme} style={styles.button}>
                Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>

            <div style={styles.boxContainer}>
                <ThemedBox theme={theme} text="Box 1" />
                <ThemedBox theme={theme} text="Box 2" />
                <ThemedBox theme={theme} text="Box 3" />
            </div>
        </div>
    );
};

const styles = {
    app: {
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    button: {
        padding: '10px 20px',
        margin: '20px 0',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
    }
};

export default ThemeApp;

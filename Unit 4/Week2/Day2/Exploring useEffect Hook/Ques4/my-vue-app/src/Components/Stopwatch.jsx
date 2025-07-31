import React, { useEffect, useState, useRef } from 'react';

const Stopwatch = () => {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    const [target, setTarget] = useState(10);
    const intervalRef = useRef(null);
    const beepRef = useRef(new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3"));

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [running]);

    useEffect(() => {
        if (seconds === target && running) {
            beepRef.current.play().catch(() => {
                console.log("🎯 Target reached!");
            });
            setRunning(false); 
        }
    }, [seconds, target, running]);

    const handleStart = () => setRunning(true);
    const handleStop = () => setRunning(false);
    const handleReset = () => {
        setRunning(false);
        setSeconds(0);
    };

    return (
        <div style={styles.container}>
            <h2>⏱ Stopwatch</h2>
            <p style={styles.time}>{seconds} second{seconds !== 1 ? 's' : ''}</p>

            <div style={styles.controls}>
                <button onClick={handleStart} disabled={running}>Start</button>
                <button onClick={handleStop}>Stop</button>
                <button onClick={handleReset}>Reset</button>
            </div>

            <div style={styles.inputGroup}>
                <label>Target Time (seconds): </label>
                <input
                    type="number"
                    value={target}
                    onChange={e => setTarget(Number(e.target.value))}
                    min="1"
                    style={styles.input}
                />
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    time: {
        fontSize: '2.5rem',
        margin: '20px 0'
    },
    controls: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    inputGroup: {
        marginTop: '10px'
    },
    input: {
        width: '60px',
        padding: '5px',
        fontSize: '1rem',
        textAlign: 'center',
        marginLeft: '10px'
    }
};

export default Stopwatch;

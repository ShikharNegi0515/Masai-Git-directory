import { useState, useEffect } from "react";

const useTimer = () => {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            const id = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
            setIntervalId(id);
        }
    };

    const stopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setIsRunning(false);
    };

    const resetTimer = () => {
        stopTimer();
        setTimer(0);
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    return { timer, isRunning, startTimer, stopTimer, resetTimer };
};

export default useTimer;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [confirming, setConfirming] = useState(false);
    const [timer, setTimer] = useState(10);
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (active && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }

        if (timer === 0) {
            setActive(false);
            setConfirming(false);
        }

        return () => clearInterval(interval);
    }, [active, timer]);

    const handleFetchClick = () => {
        setConfirming(true);
        setTimer(10);
        setActive(true);
    };

    const handleYes = () => {
        setActive(false);
        setConfirming(false);
        navigate('/data');
    };

    const handleNo = () => {
        setActive(false);
        setConfirming(false);
    };

    return (
        <div className="container">
            {!confirming && (
                <button onClick={handleFetchClick}>Fetch Data</button>
            )}

            {confirming && (
                <div className="confirmation">
                    <p>Are you sure you want to fetch the data?</p>
                    <div className={`timer ${timer <= 5 ? 'red' : 'green'}`}>{timer}</div>
                    <div className="buttons">
                        <button onClick={handleYes}>Yes</button>
                        <button onClick={handleNo}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

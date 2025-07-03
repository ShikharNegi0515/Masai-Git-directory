import { Link } from 'react-router-dom';
export default function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>Welcome to TaskTrack</h1>
            <Link to="/tasks">
                <button>Go to Tasks</button>
            </Link>
        </div>
    );
}
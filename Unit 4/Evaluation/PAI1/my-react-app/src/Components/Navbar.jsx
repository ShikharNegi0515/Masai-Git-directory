import React from 'react'
import { Link } from 'react-router-dom';
export const Navbar = () => {
    return (
        <nav style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/about">About</Link>
        </nav>
    )
}

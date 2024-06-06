import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/trading">Trading</Link></li>
                <li><Link to="/wallet">Wallet</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/support">Support</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;

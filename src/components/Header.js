import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

function Header() {
    return (
        <header>
            <div className="logo">
                <h1>ShowroomTalk</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
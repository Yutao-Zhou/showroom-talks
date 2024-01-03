import React from 'react';
import './NotFound.css';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className="error-container">
            <h1 className="error-code">404</h1>
            <p className="error-message">Oops! The page you're looking for doesn't exist.</p>
            <img src={require('../assets/gifs/404.gif')} alt="404 GIF" className="error-gif"/>
            <Link className="back-home" to="/">Back to Home</Link>
        </div>
    );
}

export default NotFound;
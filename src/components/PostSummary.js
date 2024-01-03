import React from 'react';
import './PostSummary.css';
import {Link} from "react-router-dom";

const PostSummary = ({ id, title, date, content }) => {
    return (
        <div className="post-summary">
            <h2 className="post-summary-title">{title}</h2>
            <p className="post-summary-date">Published on: {date}</p>
            <p className="post-summary-content">{content}<Link className="post-link" to={`/post/${id}`}>Learn more</Link></p>
        </div>
    );
};

export default PostSummary;
import React from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();
    const post = { id: 1, title: 'First Post', date: '2012-04-23T18:25:43.511Z', content: 'This is the content of the first post.' };

    return (
        <div className="blog-post">
            <h2 className="post-title">{post.title} {id}</h2>
            <p className="post-date">Published on: {post.date}</p>
            <div className="post-content">{post.content}</div>
        </div>
    );
};

export default Post;
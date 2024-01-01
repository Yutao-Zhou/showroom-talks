import React from 'react';
import PostSummary from '../components/PostSummary';
import './Home.css';

function Home() {
    const posts = [
        { id: 1, title: 'Post 1', date: 'January 1, 2023', content: 'Content of post 1' },
        { id: 2, title: 'Post 2', date: 'February 15, 2023', content: 'Content of post 2' },
        { id: 3, title: 'Post 3', date: 'March 30, 2023', content: 'Content of post 3' },
        { id: 4, title: 'Post 3', date: 'March 30, 2023', content: 'Content of post 3' },
        { id: 3, title: 'Post 3', date: 'March 30, 2023', content: 'Content of post 3' },
        { id: 3, title: 'Post 3', date: 'March 30, 2023', content: 'Content of post 3' },
        { id: 3, title: 'Post 3', date: 'March 30, 2023', content: 'Content of post 3' },
    ];

    return (
        <div className="post-grid">
            {posts.map(post => (
                <PostSummary
                    id={post.id}
                    title={post.title}
                    date={post.date}
                    content={post.content}
                />
            ))}
        </div>
    );
}

export default Home;
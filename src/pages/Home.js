import React from 'react';
import PostSummary from '../components/PostSummary';
import './Home.css';

function Home() {
    const posts = [
        { id: 1, title: 'Tesla Model 3', date: 'January 2, 2024', content: 'The Tesla Model 3 offered impressive acceleration and range but had issues with heavy steering, higher noise levels, and handling, making it a compelling choice for new electric car owners despite challenges for traditional car drivers.' },
        { id: 2, title: 'BMW 550i(F10)', date: 'January 3, 2024', content: 'BMW\'s F10 550i sedan offers a blend of practicality and exhilarating performance, showcasing a robust chassis, agile powertrain, and serene cabin, making it a top choice in its class despite concerns about the N63TU engine\'s reliability.' },
        { id: 3, title: 'Jeep Wrangler', date: 'January 1, 2024', content: '' },
        { id: 4, title: 'KIA Soul', date: 'January 1, 2024', content: '' },
        { id: 5, title: 'Toyota Camry', date: 'January 1, 2024', content: '' },
        { id: 6, title: 'Toyota Corolla', date: 'January 1, 2024', content: '' },
        { id: 7, title: 'Toyota Highlander', date: 'January 1, 2024', content: '' },
        { id: 8, title: 'Audi A6', date: 'January 1, 2024', content: '' },
        { id: 9, title: 'Mercedes-Benz E-Class', date: 'January 1, 2024', content: '' },
        { id: 10, title: 'Volkswagen Jetta', date: 'January 1, 2024', content: '' },
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
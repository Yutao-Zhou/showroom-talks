import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../components/NotFound';
import './Post.css';

const Post = () => {
    const { id } = useParams();
    const post = [{ id: 1, title: 'Tesla Model 3', date: '01-02-2024', images: 'tesla-model3.jpg', content: 'Driving the Model 3 in Miami marked my second experience with a Tesla. Renting it for a week unveiled its unique performance. Initially, the Model 3 defied my expectations of conventional cars. It\'s both responsive and weighty, offering a sporty vibe that\'s intentionally tuned.\n' +
            'One standout feature is the instant responsiveness of the acceleration pedal, a hallmark trait of electric motors. Unlike gasoline cars, which vary torque and power output across different RPMs, the Tesla\'s pedal delivers a consistently linear acceleration across all drive modes. This streamlined responsiveness eliminates the need for nuanced adjustments, simplifying the driving experience significantly. As someone who meticulously controls acceleration and braking, the Model 3\'s seamlessness spared me the effort of fine-tuning gas pedal inputs or countering engine delays found in traditional cars.\n' +
            'While the handling is difficult to encapsulate in a single term, the steering feels excessively heavy and overly responsive for most drivers. This characteristic, while tiresome for daily commuters aiming for a straightforward commute, is complemented by the auto-pilot feature that lessens the need for active driving. Nevertheless, despite Tesla\'s intent to infuse sportiness, the steering feels artificially weighted, lacking in providing real-time feedback from the road. Its hyper-responsiveness, devoid of an angle deadband, constantly reminds me of its weight, making the rear end seem less reactive. The suspension amplifies this, translating road imperfections into noticeable jolts and tossing the car when the road isn\'t perfectly smooth. It\'s clear the handling attempts to emulate a sporty feel but falls short, portraying a mechanically agile car striving too eagerly to achieve that agility.\n' +
            'The noise level, predominantly from the dual-pane windows, sits above average. While the car adeptly isolates outside noise, internal chassis noise, especially from the tires, creates a constant low-frequency rumble beneath the seat. Though mildly bothersome, this issue seems easily solvable by switching to quieter tires.\n' +
            'Impressively, the charging speed and range are commendable. Utilizing a supercharger in Miami allowed me to achieve a full charge in just 30-40 minutes, convenient for short errands or stops.\n' +
            'In conclusion, the Model 3 stands as a fantastic electric vehicle, especially for first-time owners. Its low maintenance and charging costs, coupled with a reasonably satisfying driving experience, make it an enticing choice. However, a comfort mode to smooth bumpy roads for a more relaxing ride would be a welcome addition. Nonetheless, no deal-breaking issues diminish its overall appeal.\n' +
            'Fun fact: I\'m not a fan of the single paddle mode. The strong energy regeneration, akin to an automatic braking sensation when releasing the acceleration pedal, disrupts muscle memory for gasoline car drivers accustomed to different driving nuances. This high responsiveness may lead to complaints for those used to less precise driving methods.\n' }];
    if (id > post.length) {
        return <NotFound />;
    } else if ( post[id - 1].id == id ) {
        console.log(typeof post[id - 1].images);
        console.log(typeof '../assets/images/tesla-model3.jpg');
        return (
            <div className="blog-post">
                <h1 className="post-title">{post[id - 1].title}</h1>
                <p className="post-date">Published on: {post[id - 1].date}</p>
                <img className="post-image" src={require(`../assets/images/${post[id - 1].images}`)} alt={post[id - 1].title}/>
                <div className="post-content">{post[id - 1].content}</div>
            </div>
        );
    } else {
        for (let i = 0; i < post.length; i++) {
        if ( post[i].id == id ) {
            return (
                <div className="blog-post">
                    <h1 className="post-title">{post[i].title}</h1>
                    <p className="post-date">Published on: {post[i].date}</p>
                    <img className="post-image" src={require(`../assets/images/${post[i].images}`)} alt={post[id - 1].title}/>
                    <div className="post-content">{post[i].content}</div>
                </div>
            );
        }
        }
        return <NotFound/>;
    }
};

export default Post;
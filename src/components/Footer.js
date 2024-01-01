import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Copyright &copy; {new Date().getFullYear()} ShowroomTalk</p>
                <div className="social-icons">
                    <a href="https://www.linkedin.com/in/yutao-zhou/"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/Yutao-Zhou"><i className="fa-brands fa-github"></i></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
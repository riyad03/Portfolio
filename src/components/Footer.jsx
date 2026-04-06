import React from 'react';

const Footer = ({ name }) => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} <span id="footer-name">{name}</span>. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

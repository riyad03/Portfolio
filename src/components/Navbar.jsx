import React from 'react';

const Navbar = ({ name, sectionsVisible, customSections }) => {
    return (
        <header className="header" id="header">
            <div className="container">
                <div className="logo gradient-text" id="logo-text">{name}</div>
                <nav className="nav" id="main-nav">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#projects">Projects</a>

                    {customSections && customSections.map(section => (
                        <a key={section.id} href={`#custom-${section.id}`}>{section.title.split(' ')[0]}</a>
                    ))}

                    <a href="#skills">Skills</a>

                    {sectionsVisible?.certifications && <a href="#certifications">Certifications</a>}
                    {sectionsVisible?.experience && <a href="#experience">Experience</a>}
                    {sectionsVisible?.videos && <a href="#videos">Videos</a>}

                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;


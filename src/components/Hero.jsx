import React from 'react';

const Hero = ({ hero }) => {
    return (
        <section className="hero section" id="home">
            <div className="container">
                <div className="hero-content">
                    <img src={hero.image} alt="Profile" className="hero-image" id="hero-image" />
                    <h1 id="hero-name">{hero.name}</h1>
                    <p className="title gradient-text" id="hero-title">{hero.title}</p>
                    <p className="bio" id="hero-bio">{hero.bio}</p>
                    <div className="hero-actions">
                        <button className="btn btn-primary" onClick={() => window.location.hash = '#contact'}>Get in Touch</button>
                        <button className="btn btn-secondary" onClick={() => window.location.hash = '#projects'}>View Work</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

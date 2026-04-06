import React from 'react';

const About = ({ about }) => {
    return (
        <section className="section" id="about">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
                    <p className="section-subtitle">Get to know who I am</p>
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <p>{about.text}</p>
                        <p>My journey in tech has been driven by curiosity and a commitment to continuous learning. I believe in writing clean, maintainable code and creating experiences that delight users.</p>
                    </div>
                    <div className="about-image-wrapper">
                        <img src={about.image} alt="About" className="about-image" id="about-image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

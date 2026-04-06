import React from 'react';

const Experience = ({ experience }) => {
    if (!experience || experience.length === 0) return null;

    return (
        <section className="section" id="experience">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
                    <p className="section-subtitle">My professional journey</p>
                </div>
                <div className="experience-timeline">
                    {experience.map((exp, index) => (
                        <div key={index} className="experience-item glass">
                            <div className="experience-header">
                                <h3 className="experience-title">{exp.title}</h3>
                                <div className="experience-company">{exp.company}</div>
                                <div className="experience-period">{exp.period}</div>
                            </div>
                            <div className="experience-description">
                                {exp.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

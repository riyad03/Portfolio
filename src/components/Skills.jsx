import React from 'react';

const Skills = ({ skills }) => {
    return (
        <section className="section" id="skills">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Skills & <span className="gradient-text">Expertise</span></h2>
                    <p className="section-subtitle">Technologies I work with</p>
                </div>
                <div className="skills-grid" id="skills-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-card glass">
                            <div className="skill-name">{skill.name}</div>
                            <div className="skill-level">
                                <div className="skill-level-fill" style={{ width: `${skill.level}%` }}></div>
                            </div>
                            <div className="skill-category">{skill.category}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

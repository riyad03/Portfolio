import React from 'react';
import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
    return (
        <section className="section" id="projects">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
                    <p className="section-subtitle">Some of my recent work</p>
                </div>
                <div className="projects-grid" id="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card glass">
                            <img src={project.image} alt={project.title} className="project-image" />
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.shortDescription || project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, tIndex) => (
                                        <span key={tIndex} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <Link to={`/project/${index}`} className="project-link">View Project →</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

import React from 'react';
import { Link } from 'react-router-dom';

const HighlightedProject = ({ project, index }) => {
    if (!project) return null;

    return (
        <section className="showcase-hero">
            <div className="showcase-container">
                <div className="showcase-card">
                    {/* Background Image */}
                    <div className="showcase-image-bg">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="showcase-bg-img"
                        />
                        <div className="showcase-overlay"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="showcase-content">
                        <div className="showcase-content-inner">
                            {/* Featured Label - On Top */}
                            <div className="showcase-featured-label">
                                <span className="featured-badge">
                                    <span className="badge-icon">✨</span>
                                    <span className="featured-text">Featured for</span>
                                    <span className="gitex-text">GITEX</span>
                                </span>
                            </div>

                            <h1 className="showcase-title">{project.title}</h1>

                            <p className="showcase-description">{project.description}</p>

                            {/* Tech Stack */}
                            <div className="showcase-tech">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="showcase-tag">{tag}</span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="showcase-actions">
                                <Link to={`/project/${index}`} className="showcase-btn-primary">
                                    View Project
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </Link>

                                {project.link && project.link !== '#' && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="showcase-btn-secondary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                                        </svg>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Transition Gradient */}
                    <div className="showcase-bottom-fade"></div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="showcase-bg-decoration">
                <div className="showcase-orb showcase-orb-1"></div>
                <div className="showcase-orb showcase-orb-2"></div>
            </div>
        </section>
    );
};

export default HighlightedProject;

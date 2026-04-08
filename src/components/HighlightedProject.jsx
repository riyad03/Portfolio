import React from 'react';
import { Link } from 'react-router-dom';

const HighlightedProject = ({ project, index, settings }) => {
    if (!project) return null;

    const highlightedTitle = settings?.highlightedTitle || { enabled: true, prefix: 'Featured for', highlight: 'GITEX' };

    // Parse text with formatting: [blue]text[/blue] for blue text, [section]title[/section] for section headers
    const parseFormattedText = (text) => {
        if (!text) return null;

        // Check if text contains formatting tags
        if (!text.toLowerCase().includes('[blue]') && !text.toLowerCase().includes('[section]')) {
            return text;
        }

        const parts = [];
        let keyCounter = 0;
        let currentIndex = 0;

        // Process sections and blue tags together
        const combinedRegex = /\[section\](.*?)\[[\\/]section\]|\[blue\](.*?)\[[\\/]blue\]/gis;
        let match;

        while ((match = combinedRegex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > currentIndex) {
                const beforeText = text.substring(currentIndex, match.index);
                if (beforeText.trim()) {
                    parts.push(
                        <span key={`text-${keyCounter++}`}>
                            {beforeText}
                        </span>
                    );
                }
            }

            // Check if it's a section or blue tag
            if (match[1] !== undefined) {
                // It's a [section]...[/section]
                parts.push(
                    <React.Fragment key={`section-${keyCounter++}`}>
                        <br />
                        <strong style={{ fontSize: '1.1em', color: 'rgba(255,255,255,0.95)', display: 'block', marginBottom: '0.5rem', fontWeight: '700' }}>
                            <span style={{ color: '#00b4d8', marginRight: '0.5rem' }}>•</span>
                            {match[1].trim()}
                        </strong>
                    </React.Fragment>
                );
            } else if (match[2] !== undefined) {
                // It's a [blue]...[/blue]
                parts.push(
                    <span key={`blue-${keyCounter++}`} style={{ color: '#00b4d8', fontWeight: '500' }}>
                        {match[2].trim()}
                    </span>
                );
            }

            currentIndex = combinedRegex.lastIndex;
        }

        // Add remaining text
        if (currentIndex < text.length) {
            const remainingText = text.substring(currentIndex);
            if (remainingText.trim()) {
                parts.push(
                    <span key={`text-end`}>
                        {remainingText}
                    </span>
                );
            }
        }

        return parts.length > 0 ? <>{parts}</> : text;
    };

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
                            {highlightedTitle.enabled && (
                                <div className="showcase-featured-label">
                                    <span className="featured-badge">
                                        <span className="badge-icon">✨</span>
                                        <span className="featured-text">{highlightedTitle.prefix}</span>
                                        <span className="gitex-text">{highlightedTitle.highlight}</span>
                                    </span>
                                </div>
                            )}

                            <h1 className="showcase-title">{project.showcaseTitle || project.title}</h1>

                            <p className="showcase-description">{parseFormattedText(project.showcaseDescription || project.shortDescription || project.description)}</p>


                            {/* Actions */}
                            <div className="showcase-actions">
                                <Link to={`/project/${index}`} className="showcase-btn-primary">
                                    View Project
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>

                                {project.link && project.link !== '#' && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="showcase-btn-secondary">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                        </svg>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Transition Layer */}
                    <div className="showcase-bottom-fade"></div>
                    <div className="showcase-transition-layer"></div>
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

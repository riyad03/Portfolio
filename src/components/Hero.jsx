import React from 'react';

const Hero = ({ hero, onChatToggle }) => {
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
        <section className="hero section" id="home">
            <div className="hero-top-fade"></div>
            <div className="container">
                <div className="hero-content">
                    <img src={hero.image} alt="Profile" className="hero-image" id="hero-image" />
                    <h1 id="hero-name">{hero.name}</h1>
                    <p className="title gradient-text" id="hero-title">{hero.title}</p>
                    <p className="bio" id="hero-bio">{parseFormattedText(hero.bio)}</p>
                    <div className="hero-actions">
                        <button className="btn btn-primary" onClick={() => window.location.hash = '#contact'}>Get in Touch</button>
                        <button className="btn btn-secondary" onClick={() => window.location.hash = '#projects'}>View Work</button>
                        <button className="btn btn-ai" onClick={onChatToggle}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" /></svg>
                            AI Assistant
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

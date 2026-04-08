import React from 'react';

const About = ({ about }) => {
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
        <section className="section" id="about">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
                    <p className="section-subtitle">Get to know who I am</p>
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <p>{parseFormattedText(about.text)}</p>
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

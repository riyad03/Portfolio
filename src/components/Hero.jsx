import React from 'react';

const Hero = ({ hero, onChatToggle }) => {
    // Parse text with formatting: [blue]text[/blue] for blue text
    const parseFormattedText = (text) => {
        if (!text) return null;

        console.log('Hero bio text:', text);
        console.log('Contains [blue]:', text.includes('[blue]'));

        // Check if text contains [blue] tags
        if (!text.includes('[blue]')) return text;

        const parts = [];
        const regex = /\[blue\](.*?)\[\/blue\]/gs;
        let lastIndex = 0;
        let matchIndex = 0;

        text.replace(regex, (match, content, offset) => {
            // Add text before the match
            if (offset > lastIndex) {
                parts.push(
                    <span key={`text-${matchIndex}`}>
                        {text.substring(lastIndex, offset)}
                    </span>
                );
            }

            // Add the blue text with line break
            parts.push(
                <React.Fragment key={`blue-${matchIndex}`}>
                    <br />
                    <span style={{ color: '#00b4d8', fontWeight: '500' }}>
                        {content.trim()}
                    </span>
                </React.Fragment>
            );

            lastIndex = offset + match.length;
            matchIndex++;
            return match;
        });

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(
                <span key={`text-end`}>
                    {text.substring(lastIndex)}
                </span>
            );
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

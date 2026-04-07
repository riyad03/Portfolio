import React from 'react';

const About = ({ about }) => {
    // Parse text with formatting: [blue]text[/blue] for blue text
    const parseFormattedText = (text) => {
        if (!text) return null;

        console.log('About text:', text);
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

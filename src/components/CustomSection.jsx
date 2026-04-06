import React from 'react';

const ContentBlock = ({ block }) => {
    switch (block.type) {
        case 'text':
            return <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1rem' }}>{block.content}</p>;

        case 'heading':
            return <h3 style={{ color: 'var(--color-text-primary)', margin: '2rem 0 1rem' }}>{block.content}</h3>;

        case 'image':
            return (
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <img src={block.url} alt={block.caption || ''} style={{ maxWidth: '100%', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} />
                    {block.caption && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>{block.caption}</p>}
                </div>
            );

        case 'gallery':
            return (
                <div className="projects-grid" style={{ marginTop: '2rem' }}>
                    {(block.images || []).map((img, i) => (
                        <div key={i}>
                            <img src={img} alt="gallery" style={{ width: '100%', borderRadius: '1rem' }} className="glass" />
                        </div>
                    ))}
                </div>
            );

        case 'video':
            return (
                <div className="video-embed" style={{ margin: '2rem 0', position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                    <iframe
                        src={block.url}
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '1rem' }}
                    ></iframe>
                </div>
            );

        case 'button':
            return (
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <a href={block.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">{block.text}</a>
                </div>
            );

        case 'code':
            return (
                <pre style={{ background: 'var(--color-bg-tertiary)', padding: '1.5rem', borderRadius: '1rem', overflowX: 'auto', margin: '1.5rem 0' }}>
                    <code style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>{block.content}</code>
                </pre>
            );

        default:
            return null;
    }
};

const CustomSection = ({ section }) => {
    const titleParts = section.title.split(' ');
    const firstWord = titleParts[0];
    const restOfTitle = titleParts.slice(1).join(' ');

    return (
        <section className="section custom-section" id={`custom-${section.id}`}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">{firstWord} <span className="gradient-text">{restOfTitle}</span></h2>
                    {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
                </div>
                <div className="custom-section-content">
                    {(section.blocks || []).map((block, i) => (
                        <ContentBlock key={i} block={block} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomSection;

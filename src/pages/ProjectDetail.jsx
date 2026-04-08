import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = ({ portfolioData, onEdit }) => {
    const { index } = useParams();
    const projectIndex = parseInt(index, 10);
    const project = portfolioData.projects[projectIndex];
    const [isPlaying, setIsPlaying] = useState(false);

    // Parse text with formatting: [blue]text[/blue] for blue text, [section]title[/section] for section headers
    const parseFormattedText = (text) => {
        if (!text) return null;

        console.log('ProjectDetail - Parsing text:', text);

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

    if (!project) {
        return (
            <div className="not-found" style={{ paddingTop: '5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem' }}>🔍</div>
                <h2 style={{ fontSize: '2rem' }}>Project not found</h2>
                <p>This project doesn't exist or was removed.</p>
                <Link to="/" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>← Back to Portfolio</Link>
            </div>
        );
    }


    // Helper functions (ported from project.html)
    const getYouTubeId = (url) => {
        if (!url) return null;
        let m = url.match(/youtu\.be\/([^?&]+)/);
        if (m) return m[1];
        m = url.match(/[?&]v=([^&]+)/);
        if (m) return m[1];
        m = url.match(/youtube\.com\/embed\/([^?&]+)/);
        if (m) return m[1];
        m = url.match(/youtube\.com\/shorts\/([^?&]+)/);
        if (m) return m[1];
        return null;
    };

    const getStats = (p) => {
        const t = (p.tags || []).join(' ').toLowerCase() + ' ' + p.title.toLowerCase();
        if (t.includes('iot') || t.includes('agri') || t.includes('farm'))
            return [{ value: '40%', label: 'Yield Increase' }, { value: '60%', label: 'Water Saved' }, { value: '24/7', label: 'Monitoring' }];
        if (t.includes('crypto') || t.includes('web3') || t.includes('finance') || t.includes('trading'))
            return [{ value: '500+', label: 'Coins Tracked' }, { value: '< 1s', label: 'Data Latency' }, { value: '99.9%', label: 'Uptime' }];
        if (t.includes('analytics') || t.includes('dashboard') || t.includes('d3'))
            return [{ value: '50+', label: 'Chart Types' }, { value: 'Real-time', label: 'Updates' }, { value: '10x', label: 'Faster Insights' }];
        if (t.includes('task') || t.includes('management') || t.includes('firebase'))
            return [{ value: '100+', label: 'Users Supported' }, { value: 'Real-time', label: 'Sync' }, { value: '∞', label: 'Tasks' }];
        return [{ value: '99.9%', label: 'Uptime' }, { value: 'Fast', label: 'Performance' }, { value: 'Secure', label: 'Payments' }];
    };

    const stats = getStats(project);
    const ytId = getYouTubeId(project.videoUrl);
    const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '';
    const heroImg = project.image.includes('?')
        ? project.image.replace(/w=\d+/, 'w=1400').replace(/h=\d+/, 'h=800')
        : project.image + '?w=1400&h=800&fit=crop';

    return (
        <div className="project-detail-page">
            {/* Header handled by App.jsx or individually if style differs */}

            {/* Hero Section */}
            <div className="project-hero-container" style={{ position: 'relative', padding: '1rem' }}>
                <div className="project-hero" style={{ height: '50vh', minHeight: '400px', position: 'relative', overflow: 'hidden', borderRadius: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                    <img
                        src={heroImg}
                        alt={project.title}
                        className="project-hero-img"
                        onError={(e) => e.target.src = project.image}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="project-hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,7,10,0.8) 0%, rgba(5,7,10,0) 25%, rgba(5,7,10,0) 70%, rgba(5,7,10,1) 100%)' }}></div>

                    {/* Integrated Title into Hero for stability */}
                    <div className="hero-content-wrap" style={{ position: 'absolute', bottom: '2rem', left: '3rem', right: '3rem', zIndex: 11 }}>
                        <h1 className="project-title gradient-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '0.8rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{project.title}</h1>
                        <div className="tags-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                            {project.tags.map((t, i) => (
                                <span key={i} className="tech-tag" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '3rem', fontSize: '0.8rem', fontWeight: 600, backdropFilter: 'blur(10px)', color: '#fff' }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Content Flow (Adaptive) */}
            <div className="page-content" style={{ position: 'relative', zIndex: 10, padding: '1rem 3rem' }}>
                <div className="section" style={{ padding: '1.5rem 0' }}>
                    <p className="section-label" style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', color: 'var(--color-accent-primary)', marginBottom: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ width: '40px', height: '2px', background: 'var(--color-accent-gradient)' }}></span>
                        The Challenge
                    </p>
                    <p className="project-description" style={{ fontSize: '1.2rem', lineHeight: 1.7, maxWidth: '900px', opacity: 0.9, fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>{parseFormattedText(project.description)}</p>
                </div>

                {project.showStats !== false && (
                    <div className="section" style={{ padding: '1rem 0' }}>
                        <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {(project.stats || stats).map((s, i) => (
                                <div key={i} className="stat-card" style={{ padding: '1.2rem', textAlign: 'center', borderRight: i < (project.stats || stats).length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                    <div className="stat-value" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.1rem', color: 'var(--color-accent-primary)' }}>{s.value}</div>
                                    <div className="stat-label" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {project.videoUrl && (
                    <div className="section" style={{ padding: '2rem 0' }}>
                        <p className="section-label" style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', color: 'var(--color-accent-primary)', marginBottom: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <span style={{ width: '40px', height: '2px', background: 'var(--color-accent-gradient)' }}></span>
                            Video Demo
                        </p>
                        {!ytId ? (
                            <video
                                src={project.videoUrl}
                                controls
                                style={{ width: '100%', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.08)', display: 'block', background: '#000', maxHeight: '520px' }}
                            >
                                Your browser doesn't support HTML5 video.
                            </video>
                        ) : (
                            <div
                                className="video-thumb"
                                onClick={() => setIsPlaying(true)}
                                style={{ display: isPlaying ? 'none' : 'block' }}
                            >
                                <img src={thumbUrl || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1280&h=720&fit=crop'} alt="demo" />
                                <div className="video-thumb-overlay">
                                    <div className="play-btn">
                                        <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                    </div>
                                </div>
                                <span className="video-label">▶ Click to play</span>
                            </div>
                        )}
                        {ytId && isPlaying && (
                            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
                                    allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                                ></iframe>
                            </div>
                        )}
                    </div>
                )}

                <div className="section" style={{ padding: '2rem 0' }}>
                    <p className="section-label" style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', color: 'var(--color-accent-primary)', marginBottom: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ width: '40px', height: '2px', background: 'var(--color-accent-gradient)' }}></span>
                        Tech Stack
                    </p>
                    <div className="tech-grid">
                        {project.tags.map((t, i) => <span key={i} className="tech-pill">{t}</span>)}
                    </div>
                </div>

                <div className="section" style={{ padding: '3rem 0 5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="cta-row" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        {project.liveProjectEnabled !== false && (
                            project.link && project.link !== '#' ? (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Visit Live Project
                                </a>
                            ) : (
                                <button className="btn btn-primary" onClick={() => alert('Live link coming soon!')}>
                                    Visit Live Project
                                </button>
                            )
                        )}
                        <Link to="/" className="btn btn-secondary">All Projects</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;

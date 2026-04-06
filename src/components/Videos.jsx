import React from 'react';

const Videos = ({ videos }) => {
    if (!videos || videos.length === 0) return null;

    return (
        <section className="section" id="videos">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured <span className="gradient-text">Videos</span></h2>
                    <p className="section-subtitle">Demos, tutorials, and presentations</p>
                </div>
                <div className="videos-grid">
                    {videos.map((video, index) => (
                        <div key={index} className="video-card glass">
                            <div className="video-embed">
                                <iframe
                                    src={video.url}
                                    title={video.title}
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="video-content">
                                <h3 className="video-title">{video.title}</h3>
                                <p className="video-description">{video.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Videos;

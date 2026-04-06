import React from 'react';

const Certifications = ({ certifications }) => {
    if (!certifications || certifications.length === 0) return null;

    return (
        <section className="section" id="certifications">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Professional <span className="gradient-text">Certifications</span></h2>
                    <p className="section-subtitle">Verified credentials and achievements</p>
                </div>
                <div className="certifications-grid">
                    {certifications.map((cert, index) => (
                        <div key={index} className="certification-card glass">
                            <h3 className="certification-name">{cert.name}</h3>
                            <p className="certification-issuer">{cert.issuer}</p>
                            <p className="certification-date">{cert.date}</p>
                            {cert.link && cert.link !== '#' && (
                                <a href={cert.link} className="certification-link" target="_blank" rel="noopener noreferrer">
                                    View Certificate <span>→</span>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;

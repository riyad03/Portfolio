import React from 'react';

const Contact = ({ contact }) => {
    return (
        <section className="section" id="contact">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
                    <p className="section-subtitle">Let's work together</p>
                </div>
                <div className="contact-content">
                    <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
                    <div className="contact-methods">
                        <a href={`mailto:${contact.email}`} className="contact-item glass">
                            <div className="contact-icon">📧</div>
                            <div className="contact-info">
                                <div className="contact-label">Email</div>
                                <div className="contact-value">{contact.email}</div>
                            </div>
                        </a>
                        <a href={`tel:${contact.phone}`} className="contact-item glass">
                            <div className="contact-icon">📱</div>
                            <div className="contact-info">
                                <div className="contact-label">Phone</div>
                                <div className="contact-value">{contact.phone}</div>
                            </div>
                        </a>
                        <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-item glass">
                            <div className="contact-icon">💼</div>
                            <div className="contact-info">
                                <div className="contact-label">LinkedIn</div>
                                <div className="contact-value">{contact.linkedin}</div>
                            </div>
                        </a>
                        <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="contact-item glass">
                            <div className="contact-icon">💻</div>
                            <div className="contact-info">
                                <div className="contact-label">GitHub</div>
                                <div className="contact-value">{contact.github}</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

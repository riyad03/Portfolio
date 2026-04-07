import React, { useState, useEffect } from 'react';
import CustomSectionBuilder from './CustomSectionBuilder';

const AdminPanel = ({ portfolioData, updateData, onClose }) => {
    const MAX_VIDEO_SIZE_MB = 100; // Cloudinary free tier limit
    const [formData, setFormData] = useState(JSON.parse(JSON.stringify(portfolioData)));
    const [uploadingIndex, setUploadingIndex] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [cloudinaryConfig, setCloudinaryConfig] = useState(null);
    const scrollContainerRef = React.useRef(null);

    // Cloudinary config - hardcoded because Vercel isn't passing env vars to Vite build
    useEffect(() => {
        console.log('✅ Cloudinary config loaded (hardcoded)');
        setCloudinaryConfig({
            cloudName: 'dl8d3sjqx',
            uploadPreset: 'ml_default'
        });
    }, []);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const editIndex = params.get('editProject');
        if (editIndex !== null && scrollContainerRef.current) {
            const el = document.getElementById(`project-editor-${editIndex}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Clean up URL
                const newUrl = window.location.pathname + window.location.hash;
                window.history.replaceState({}, '', newUrl);
            }
        }
    }, [portfolioData]);

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleProjectChange = (index, field, value) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[index] = { ...updatedProjects[index], [field]: value };
        setFormData(prev => ({ ...prev, projects: updatedProjects }));
    };

    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...formData.skills];
        updatedSkills[index] = { ...updatedSkills[index], [field]: value };
        setFormData(prev => ({ ...prev, skills: updatedSkills }));
    };

    // New Handlers
    const handleArrayChange = (arrayName, index, field, value) => {
        const updatedArray = [...formData[arrayName]];
        updatedArray[index] = { ...updatedArray[index], [field]: value };
        setFormData(prev => ({ ...prev, [arrayName]: updatedArray }));
    };

    const addArrayItem = (arrayName, defaultItem) => {
        setFormData(prev => ({ ...prev, [arrayName]: [...(prev[arrayName] || []), defaultItem] }));
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData(prev => ({ ...prev, [arrayName]: prev[arrayName].filter((_, i) => i !== index) }));
    };

    const toggleSection = (sectionName) => {
        const updated = {
            ...formData.settings,
            sectionsVisible: {
                ...formData.settings.sectionsVisible,
                [sectionName]: !formData.settings.sectionsVisible[sectionName]
            }
        };
        setFormData(prev => ({ ...prev, settings: updated }));
    };

    const handleSave = () => {
        console.log('🟡 [AdminPanel] Save button clicked!');
        console.log('🟡 [AdminPanel] Form data to save:', formData);
        console.log('🟡 [AdminPanel] Calling updateData...');

        updateData(formData);

        console.log('🟡 [AdminPanel] updateData called (async - will complete in background)');
        alert('Portfolio updated successfully!');
        onClose();
    };

    const handleReset = async () => {
        if (window.confirm('Are you sure you want to reset all data to defaults?')) {
            const { defaultData } = await import('../../data/portfolioData');
            setFormData(defaultData);

            // Save the default data to Firebase immediately
            console.log('🔄 Resetting to default data and saving to Firebase...');
            updateData(defaultData);
            alert('Portfolio reset to defaults and saved!');
            onClose();
        }
    };

    const handleVideoUpload = async (file, index) => {
        if (!file) return;

        console.log('Video upload initiated for project:', index, 'File:', file.name, 'Size:', (file.size / 1024 / 1024).toFixed(2), 'MB');

        if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
            console.warn(`File size exceeds ${MAX_VIDEO_SIZE_MB}MB limit.`);
            setUploadError(`File is too large! (Limit is ${MAX_VIDEO_SIZE_MB}MB for Cloudinary free tier). Please compress your video.`);
            return;
        }

        if (!cloudinaryConfig || !cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
            console.warn('Cloudinary config missing: cloudName or uploadPreset not set.');
            setUploadError('Cloudinary config missing! Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in Vercel environment variables.');
            return;
        }

        const { cloudName, uploadPreset } = cloudinaryConfig;

        setUploadingIndex(index);
        setUploadError(null);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);

        try {
            console.log('Fetching Cloudinary upload URL...');
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
                method: 'POST',
                body: data
            });
            const result = await response.json();

            if (response.ok) {
                console.log('Upload SUCCESS! Secure URL:', result.secure_url);
                handleProjectChange(index, 'videoUrl', result.secure_url);
                alert('Video uploaded successfully!');
            } else if (response.status === 413) {
                console.error('Upload FAILED: File too large (413).');
                setUploadError('File is too large for your Cloudinary plan (Max 100MB for free tier). Try a compressed video.');
            } else {
                console.error('Upload FAILED:', result.error);
                setUploadError('Upload FAILED: ' + (result.error?.message || 'Check Cloudinary settings.') + ' Make sure your "Upload Preset" is set to "Unsigned".');
            }
        } catch (err) {
            console.error('Network Error during upload:', err);
            setUploadError('Network error. Check your connection or Cloudinary URL.');
        } finally {
            setUploadingIndex(null);
        }
    };

    return (
        <div className="admin-panel active">
            <div className="admin-header">
                <h2>Edit Portfolio</h2>
                <button className="admin-close" onClick={onClose}>&times;</button>
            </div>

            <div className="admin-sections-container" ref={scrollContainerRef} style={{ paddingBottom: '6rem' }}>
                {/* Hero Section */}
                <div className="admin-section">
                    <h3>Hero Section</h3>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-input" value={formData.hero.name} onChange={(e) => handleChange('hero', 'name', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-input" value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Bio</label>
                        <textarea className="form-textarea" value={formData.hero.bio} onChange={(e) => handleChange('hero', 'bio', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Hero Image URL</label>
                        <input type="text" className="form-input" value={formData.hero.image} onChange={(e) => handleChange('hero', 'image', e.target.value)} />
                    </div>
                </div>

                {/* About Section */}
                <div className="admin-section">
                    <h3>About Section</h3>
                    <div className="form-group">
                        <label className="form-label">About Text</label>
                        <textarea className="form-textarea" value={formData.about.text} onChange={(e) => handleChange('about', 'text', e.target.value)} />
                    </div>
                </div>

                {/* Section Visibility */}
                <div className="admin-section">
                    <h3>Section Management</h3>

                    {/* Highlighted Project Selector */}
                    <div className="form-group" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,195,255,0.05)', borderRadius: '1rem', border: '1px solid rgba(0,195,255,0.2)' }}>
                        <label className="form-label" style={{ color: 'var(--color-accent-primary)', marginBottom: '0.5rem', display: 'block' }}>
                            ⭐ Featured/Highlighted Project
                        </label>
                        <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.8rem' }}>
                            Select which project to showcase prominently on the home page
                        </p>
                        <select
                            className="form-input"
                            value={formData.settings.highlightedProjectIndex ?? 0}
                            onChange={(e) => {
                                const updated = { ...formData.settings, highlightedProjectIndex: parseInt(e.target.value, 10) };
                                setFormData(prev => ({ ...prev, settings: updated }));
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            {formData.projects.map((project, index) => (
                                <option key={index} value={index}>
                                    {project.title || `Project ${index + 1}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {['certifications', 'experience', 'videos'].map(s => (
                            <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                                <input type="checkbox" checked={formData.settings.sectionsVisible[s]} onChange={() => toggleSection(s)} />
                                <span style={{ textTransform: 'capitalize' }}>Show {s} Section</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="admin-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>Skills & Expertise</h3>
                        <button className="btn-add" onClick={() => addArrayItem('skills', { name: 'New Skill', level: 80, category: 'Frontend' })}>+ Add</button>
                    </div>
                    {formData.skills.map((skill, index) => (
                        <div key={index} className="project-editor glass" style={{ marginBottom: '1rem', padding: '1rem' }}>
                            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                <label className="form-label">Skill Name</label>
                                <input type="text" className="form-input" value={skill.name} placeholder="Skill Name (e.g., JavaScript)" onChange={(e) => handleSkillChange(index, 'name', e.target.value)} />
                            </div>
                            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                <label className="form-label">Category</label>
                                <select className="form-input" value={skill.category} onChange={(e) => handleSkillChange(index, 'category', e.target.value)}>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="Deep Learning">Deep Learning</option>
                                    <option value="NLP">NLP</option>
                                    <option value="Computer Vision">Computer Vision</option>
                                    <option value="AI Frameworks">AI Frameworks</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="AI Tools">AI Tools</option>
                                    <option value="Automation">Automation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                <label className="form-label">Level: {skill.level}%</label>
                                <input type="range" min="0" max="100" value={skill.level} onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
                            </div>
                            <button className="btn-remove" onClick={() => removeArrayItem('skills', index)}>Remove</button>
                        </div>
                    ))}
                </div>

                {/* Projects Section */}
                <div className="admin-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>Projects</h3>
                        <button className="btn-add" onClick={() => addArrayItem('projects', { title: 'New Project', description: '', image: '', tags: [], link: '#', videoUrl: '' })}>+ Add</button>
                    </div>
                    {formData.projects.map((project, index) => (
                        <div key={index} id={`project-editor-${index}`} className="project-editor glass" style={{ marginBottom: '1rem', padding: '1rem' }}>
                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                <label className="form-label">Project Title</label>
                                <input type="text" className="form-input" value={project.title} placeholder="Title" onChange={(e) => handleProjectChange(index, 'title', e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    <input type="checkbox" checked={project.showStats !== false} onChange={(e) => handleProjectChange(index, 'showStats', e.target.checked)} />
                                    Show Stats Section (Uptime/Performance)
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    <input type="checkbox" checked={project.liveProjectEnabled !== false} onChange={(e) => handleProjectChange(index, 'liveProjectEnabled', e.target.checked)} />
                                    Enable "Visit Live Project" Button
                                </label>
                            </div>
                            <div className="form-group" style={{ marginTop: '0.8rem' }}>
                                <label className="form-label" style={{ fontSize: '0.8rem', color: '#888' }}>Upload Demo Video (Requires Cloudinary)</label>
                                <input type="file" accept="video/*" className="form-input" style={{ marginBottom: '0.5rem' }} onChange={(e) => handleVideoUpload(e.target.files[0], index)} />
                                {uploadingIndex === index && <div style={{ color: '#00c3ff', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Uploading... please wait...</div>}
                                {uploadError && uploadingIndex === index && <div style={{ color: '#ff4b2b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{uploadError}</div>}

                                {project.videoUrl && (
                                    <div className="video-preview-admin" style={{ marginBottom: '0.5rem', borderRadius: '0.8rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
                                        <video src={project.videoUrl} controls style={{ width: '100%', display: 'block', maxHeight: '150px' }} />
                                        <div style={{ padding: '0.4rem', fontSize: '0.7rem', color: '#00c3ff', textAlign: 'center' }}>✓ Video Ready - Click "Save Changes" below to publish</div>
                                    </div>
                                )}

                                <input type="text" className="form-input" value={project.videoUrl} placeholder="Or Paste Video URL (Cloudinary/YouTube/MP4)" onChange={(e) => handleProjectChange(index, 'videoUrl', e.target.value)} />
                            </div>
                            <button className="btn-remove" onClick={() => removeArrayItem('projects', index)}>Remove</button>
                        </div>
                    ))}
                </div>

                {/* Certifications Section */}
                {formData.settings.sectionsVisible.certifications && (
                    <div className="admin-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>Certifications</h3>
                            <button className="btn-add" onClick={() => addArrayItem('certifications', { name: 'New Cert', issuer: '', date: '', link: '' })}>+ Add</button>
                        </div>
                        {formData.certifications.map((cert, index) => (
                            <div key={index} className="project-editor glass" style={{ marginBottom: '1rem', padding: '1rem' }}>
                                <input type="text" className="form-input" value={cert.name} placeholder="Cert Name" onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)} />
                                <button className="btn-remove" onClick={() => removeArrayItem('certifications', index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Experience Section */}
                {formData.settings.sectionsVisible.experience && (
                    <div className="admin-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>Experience</h3>
                            <button className="btn-add" onClick={() => addArrayItem('experience', { title: 'New Role', company: '', period: '', description: '' })}>+ Add</button>
                        </div>
                        {formData.experience.map((exp, index) => (
                            <div key={index} className="project-editor glass" style={{ marginBottom: '1rem', padding: '1rem' }}>
                                <input type="text" className="form-input" style={{ marginBottom: '0.5rem' }} value={exp.title} placeholder="Title" onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} />
                                <input type="text" className="form-input" style={{ marginBottom: '0.5rem' }} value={exp.company} placeholder="Company" onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
                                <textarea className="form-textarea" value={exp.description} placeholder="Description" onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} />
                                <button className="btn-remove" onClick={() => removeArrayItem('experience', index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Videos Section */}
                {formData.settings.sectionsVisible.videos && (
                    <div className="admin-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3>Featured Videos</h3>
                            <button className="btn-add" onClick={() => addArrayItem('videos', { title: 'New Video', description: '', url: 'https://www.youtube.com/embed/' })}>+ Add</button>
                        </div>
                        {formData.videos.map((vid, index) => (
                            <div key={index} className="project-editor glass" style={{ marginBottom: '1rem', padding: '1rem' }}>
                                <input type="text" className="form-input" style={{ marginBottom: '0.5rem' }} value={vid.title} placeholder="Title" onChange={(e) => handleArrayChange('videos', index, 'title', e.target.value)} />
                                <input type="text" className="form-input" value={vid.url} placeholder="Embed URL" onChange={(e) => handleArrayChange('videos', index, 'url', e.target.value)} />
                                <button className="btn-remove" onClick={() => removeArrayItem('videos', index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Custom Sections Builder */}
                <div className="admin-section">
                    <CustomSectionBuilder
                        customSections={formData.customSections || []}
                        onUpdate={(updated) => setFormData(prev => ({ ...prev, customSections: updated }))}
                    />
                </div>

                {/* Contact Section */}
                <div className="admin-section">
                    <h3>Contact Information</h3>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" value={formData.contact.email} onChange={(e) => handleChange('contact', 'email', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-input" value={formData.contact.phone} onChange={(e) => handleChange('contact', 'phone', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">LinkedIn</label>
                        <input type="text" className="form-input" value={formData.contact.linkedin} onChange={(e) => handleChange('contact', 'linkedin', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">GitHub</label>
                        <input type="text" className="form-input" value={formData.contact.github} onChange={(e) => handleChange('contact', 'github', e.target.value)} />
                    </div>
                </div>

                {/* AI Chatbot Context */}
                <div className="admin-section">
                    <h3>🤖 AI Chatbot Context</h3>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1rem' }}>
                        Customize the AI assistant's behavior and knowledge. This context helps the chatbot understand how to represent you and respond to visitor questions.
                    </p>
                    <div className="form-group">
                        <label className="form-label">System Context / Instructions</label>
                        <textarea
                            className="form-textarea"
                            value={formData.chatbotContext || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, chatbotContext: e.target.value }))}
                            placeholder="Describe who you are, your expertise, tone, and how the AI should represent you..."
                            style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '0.9rem' }}
                        />
                    </div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.5rem' }}>
                        💡 Tip: Include your background, specializations, work style, and any specific instructions for how the AI should answer questions about you.
                    </p>
                </div>

                {/* Cloud Settings */}
                <div className="admin-section">
                    <h3>Cloud Storage</h3>
                    <input type="text" className="form-input" value={formData.settings.cloudSettings.cloudName} placeholder="Cloud Name" onChange={(e) => {
                        const updated = { ...formData.settings, cloudSettings: { ...formData.settings.cloudSettings, cloudName: e.target.value } };
                        setFormData(prev => ({ ...prev, settings: updated }));
                    }} />
                    <input type="text" className="form-input" style={{ marginTop: '0.5rem' }} value={formData.settings.cloudSettings.uploadPreset} placeholder="Upload Preset" onChange={(e) => {
                        const updated = { ...formData.settings, cloudSettings: { ...formData.settings.cloudSettings, uploadPreset: e.target.value } };
                        setFormData(prev => ({ ...prev, settings: updated }));
                    }} />
                </div>
            </div>

            <div className="admin-actions">
                <button className="btn-save" onClick={handleSave}>Save Changes</button>
                <button className="btn-reset" onClick={handleReset}>Reset to Default</button>
            </div>
        </div>
    );
};


export default AdminPanel;


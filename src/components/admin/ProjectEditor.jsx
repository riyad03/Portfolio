import React, { useState } from 'react';

const ProjectEditor = ({ portfolioData, projectIndex, updateData, onClose }) => {
    const project = portfolioData.projects[projectIndex];
    const [formData, setFormData] = useState(JSON.parse(JSON.stringify(project)));
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const MAX_VIDEO_SIZE_MB = 100;

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleTagsChange = (value) => {
        const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        handleChange('tags', tags);
    };

    const handleSave = () => {
        const newProjects = [...portfolioData.projects];
        newProjects[projectIndex] = formData;
        updateData({ ...portfolioData, projects: newProjects });
        onClose();
        alert('Project updated successfully!');
    };

    const handleImageUpload = async (file) => {
        if (!file) return;

        const { cloudName, uploadPreset } = portfolioData.settings.cloudSettings;
        if (!cloudName || !uploadPreset) {
            setUploadError('Cloudinary config missing in Global Settings!');
            return;
        }

        setUploading(true);
        setUploadError(null);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (response.ok) {
                handleChange('image', result.secure_url);
            } else {
                setUploadError('Upload failed: ' + (result.error?.message || 'Check your Cloudinary settings.'));
            }
        } catch (err) {
            setUploadError('Network error. Check your connection or Cloudinary URL.');
        } finally {
            setUploading(false);
        }
    };

    const handleVideoUpload = async (file) => {
        if (!file) return;

        if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
            setUploadError(`File is too large! (Limit is ${MAX_VIDEO_SIZE_MB}MB for Cloudinary free tier).`);
            return;
        }

        const { cloudName, uploadPreset } = portfolioData.settings.cloudSettings;
        if (!cloudName || !uploadPreset) {
            setUploadError('Cloudinary config missing in Global Settings!');
            return;
        }

        setUploading(true);
        setUploadError(null);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (response.ok) {
                handleChange('videoUrl', result.secure_url);
            } else {
                setUploadError('Upload failed: ' + (result.error?.message || 'Check your Cloudinary settings.'));
            }
        } catch (err) {
            setUploadError('Network error. Check your connection or Cloudinary URL.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="admin-panel active" style={{ width: '450px' }}>
            <div className="admin-header">
                <h2>Edit Project: {project.title}</h2>
                <button className="admin-close" onClick={onClose}>&times;</button>
            </div>

            <div className="admin-sections-container" style={{ padding: '1rem' }}>
                <div className="form-group">
                    <label className="form-label">Project Title</label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <label className="form-label" style={{ color: 'var(--color-accent-primary)' }}>Main Project Image</label>
                    <input type="file" accept="image/*" className="form-input" style={{ marginBottom: '0.5rem' }} onChange={(e) => handleImageUpload(e.target.files[0])} />

                    {formData.image && (
                        <div className="image-preview-admin" style={{ marginBottom: '0.5rem', borderRadius: '0.8rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
                            <img src={formData.image} alt="Preview" style={{ width: '100%', display: 'block', maxHeight: '150px', objectFit: 'cover' }} />
                        </div>
                    )}
                    <input type="text" className="form-input" value={formData.image} placeholder="Or Paste Image URL" onChange={(e) => handleChange('image', e.target.value)} />
                </div>

                <div className="form-group">
                    <label className="form-label">Short Description (for Cards)</label>
                    <textarea
                        className="form-textarea"
                        value={formData.shortDescription || ''}
                        onChange={(e) => handleChange('shortDescription', e.target.value)}
                        placeholder="A brief teaser for the project card..."
                        style={{ height: '80px' }}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Detailed Description (Detail Page)</label>
                    <textarea
                        className="form-textarea"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        style={{ height: '150px' }}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Tech Stack (comma separated)</label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.tags.join(', ')}
                        onChange={(e) => handleTagsChange(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Project Link (Live)</label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.link}
                        onChange={(e) => handleChange('link', e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <label className="form-label" style={{ color: 'var(--color-accent-primary)' }}>Video Demo</label>
                    <input type="file" accept="video/*" className="form-input" style={{ marginBottom: '0.5rem' }} onChange={(e) => handleVideoUpload(e.target.files[0])} />
                    {uploading && <div style={{ color: '#00c3ff', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Uploading...</div>}
                    {uploadError && <div style={{ color: '#ff4b2b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{uploadError}</div>}

                    {formData.videoUrl && (
                        <div className="video-preview-admin" style={{ marginBottom: '0.5rem', borderRadius: '0.8rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
                            <video src={formData.videoUrl} controls style={{ width: '100%', display: 'block', maxHeight: '120px' }} />
                        </div>
                    )}
                    <input type="text" className="form-input" value={formData.videoUrl} placeholder="Or Paste URL" onChange={(e) => handleChange('videoUrl', e.target.value)} />
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                        <input type="checkbox" checked={formData.showStats !== false} onChange={(e) => handleChange('showStats', e.target.checked)} />
                        Show Performance Stats Section
                    </label>
                </div>

                {formData.showStats !== false && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <label className="form-label" style={{ color: 'var(--color-accent-primary)', marginBottom: '1rem', display: 'block' }}>Customize Stats Cards</label>
                        {(formData.stats || [{}, {}, {}]).map((stat, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Value (e.g. 99.9%)"
                                        value={stat.value || ''}
                                        onChange={(e) => {
                                            const newStats = [...(formData.stats || [{ value: '', label: '' }, { value: '', label: '' }, { value: '', label: '' }])];
                                            newStats[i] = { ...newStats[i], value: e.target.value };
                                            handleChange('stats', newStats);
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Label (e.g. Uptime)"
                                        value={stat.label || ''}
                                        onChange={(e) => {
                                            const newStats = [...(formData.stats || [{ value: '', label: '' }, { value: '', label: '' }, { value: '', label: '' }])];
                                            newStats[i] = { ...newStats[i], label: e.target.value };
                                            handleChange('stats', newStats);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="admin-actions">
                    <button className="btn-save" onClick={handleSave}>Save Project Details</button>
                    <button className="btn-reset" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectEditor;

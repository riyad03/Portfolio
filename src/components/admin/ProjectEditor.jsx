import React, { useState, useEffect } from 'react';

const ProjectEditor = ({ portfolioData, projectIndex, updateData, onClose }) => {
    const project = portfolioData.projects[projectIndex];
    const [formData, setFormData] = useState(JSON.parse(JSON.stringify(project)));
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [cloudinaryConfig, setCloudinaryConfig] = useState(null);

    const MAX_VIDEO_SIZE_MB = 100;

    // Fetch Cloudinary config from environment variables or API
    useEffect(() => {
        const fetchCloudinaryConfig = async () => {
            // First priority: Environment variables (for both local and production)
            const envCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
            const envUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

            if (envCloudName && envUploadPreset) {
                console.log('✅ Cloudinary config loaded from environment variables!');
                setCloudinaryConfig({
                    cloudName: envCloudName,
                    uploadPreset: envUploadPreset
                });
                return;
            }

            // Second priority: Try Vercel API route (production)
            try {
                const response = await fetch('/api/cloudinary-config');
                const data = await response.json();
                if (response.ok && data.cloudName && data.uploadPreset) {
                    console.log('✅ Cloudinary config loaded from API!');
                    setCloudinaryConfig(data);
                    return;
                }
            } catch (err) {
                console.warn('Cloudinary API not available');
            }

            // Third priority: Portfolio settings (fallback)
            const localSettings = portfolioData.settings.cloudSettings;
            if (localSettings && localSettings.cloudName && localSettings.uploadPreset) {
                console.log('✅ Cloudinary config loaded from portfolio settings');
                setCloudinaryConfig(localSettings);
            } else {
                console.error('❌ Cloudinary config not found in environment variables, API, or portfolio settings');
            }
        };
        fetchCloudinaryConfig();
    }, [portfolioData.settings.cloudSettings]);

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

    const handleThumbnailUpload = async (file) => {
        if (!file) return;

        if (!cloudinaryConfig || !cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
            setUploadError('Cloudinary config missing! Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in Vercel environment variables.');
            setUploadSuccess(null);
            return;
        }

        const { cloudName, uploadPreset } = cloudinaryConfig;

        setUploading(true);
        setUploadError(null);
        setUploadSuccess(null);
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
                handleChange('thumbnail', result.secure_url);
                setUploadSuccess('Thumbnail uploaded successfully!');
            } else {
                setUploadError('Upload failed: ' + (result.error?.message || 'Check your Cloudinary settings.'));
            }
        } catch (err) {
            setUploadError('Network error. Check your connection or Cloudinary URL.');
        } finally {
            setUploading(false);
        }
    };

    const handleImageUpload = async (file) => {
        if (!file) return;

        if (!cloudinaryConfig || !cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
            setUploadError('Cloudinary config missing! Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in Vercel environment variables.');
            setUploadSuccess(null);
            return;
        }

        const { cloudName, uploadPreset } = cloudinaryConfig;

        setUploading(true);
        setUploadError(null);
        setUploadSuccess(null);
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
                setUploadSuccess('Image uploaded successfully!');
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

        if (!cloudinaryConfig || !cloudinaryConfig.cloudName || !cloudinaryConfig.uploadPreset) {
            setUploadError('Cloudinary config missing! Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in Vercel environment variables.');
            return;
        }

        const { cloudName, uploadPreset } = cloudinaryConfig;

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
                    <label className="form-label" style={{ color: 'var(--color-accent-primary)' }}>Thumbnail Image (Project Card)</label>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.5rem' }}>This image appears in the project grid on the main page</p>
                    <input type="file" accept="image/*" className="form-input" style={{ marginBottom: '0.5rem' }} onChange={(e) => handleThumbnailUpload(e.target.files[0])} />
                    {uploading && <div style={{ color: '#00c3ff', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Uploading...</div>}
                    {uploadSuccess && <div style={{ color: '#00ff88', fontSize: '0.8rem', marginBottom: '0.5rem' }}>✓ {uploadSuccess}</div>}
                    {uploadError && <div style={{ color: '#ff4b2b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{uploadError}</div>}

                    {formData.thumbnail && (
                        <div className="image-preview-admin" style={{ marginBottom: '0.5rem', borderRadius: '0.8rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
                            <img src={formData.thumbnail} alt="Thumbnail Preview" style={{ width: '100%', display: 'block', maxHeight: '150px', objectFit: 'cover' }} />
                        </div>
                    )}
                    <input type="text" className="form-input" value={formData.thumbnail || ''} placeholder="Or Paste Thumbnail URL" onChange={(e) => handleChange('thumbnail', e.target.value)} />
                </div>

                <div className="form-group" style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <label className="form-label" style={{ color: 'var(--color-accent-primary)' }}>Detail Page Hero Image</label>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.5rem' }}>This image appears as the large hero on the project detail page</p>
                    <input type="file" accept="image/*" className="form-input" style={{ marginBottom: '0.5rem' }} onChange={(e) => handleImageUpload(e.target.files[0])} />
                    {uploading && <div style={{ color: '#00c3ff', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Uploading...</div>}
                    {uploadSuccess && <div style={{ color: '#00ff88', fontSize: '0.8rem', marginBottom: '0.5rem' }}>✓ {uploadSuccess}</div>}
                    {uploadError && <div style={{ color: '#ff4b2b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{uploadError}</div>}

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

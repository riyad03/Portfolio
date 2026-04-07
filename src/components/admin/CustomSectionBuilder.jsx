import React from 'react';

const BlockEditor = ({ block, onUpdate, onRemove }) => {
    const handleChange = (field, value) => {
        onUpdate({ ...block, [field]: value });
    };

    return (
        <div className="content-block-editor" style={{ background: 'var(--color-bg-primary)', padding: '1rem', borderRadius: '1rem', marginBottom: '1rem', border: '1px solid var(--glass-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--color-accent-primary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📝 {block.type}</strong>
                <button className="btn-remove" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }} onClick={onRemove}>×</button>
            </div>

            {block.type === 'text' || block.type === 'code' ? (
                <textarea
                    className="form-textarea"
                    value={block.content || ''}
                    onChange={(e) => handleChange('content', e.target.value)}
                    placeholder={`Enter ${block.type} content...`}
                />
            ) : block.type === 'heading' ? (
                <input
                    type="text"
                    className="form-input"
                    value={block.content || ''}
                    onChange={(e) => handleChange('content', e.target.value)}
                    placeholder="Heading text"
                />
            ) : block.type === 'image' ? (
                <>
                    <input type="text" className="form-input" value={block.url || ''} onChange={(e) => handleChange('url', e.target.value)} placeholder="Image URL" />
                    <input type="text" className="form-input" style={{ marginTop: '0.5rem' }} value={block.caption || ''} onChange={(e) => handleChange('caption', e.target.value)} placeholder="Caption (optional)" />
                </>
            ) : block.type === 'video' ? (
                <>
                    <input type="text" className="form-input" value={block.url || ''} onChange={(e) => handleChange('url', e.target.value)} placeholder="YouTube/Vimeo embed URL" />
                    <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>Use embed URLs like: https://www.youtube.com/embed/VIDEO_ID</p>
                </>
            ) : block.type === 'button' ? (
                <>
                    <input type="text" className="form-input" value={block.text || ''} onChange={(e) => handleChange('text', e.target.value)} placeholder="Button text" />
                    <input type="text" className="form-input" style={{ marginTop: '0.5rem' }} value={block.url || ''} onChange={(e) => handleChange('url', e.target.value)} placeholder="Button URL" />
                </>
            ) : null}
        </div>
    );
};

const CustomSectionBuilder = ({ customSections, onUpdate }) => {
    const handleSectionUpdate = (index, updatedSection) => {
        const updated = [...customSections];
        updated[index] = updatedSection;
        onUpdate(updated);
    };

    const addSection = () => {
        const newSection = {
            id: 'section_' + Date.now(),
            title: 'New Section',
            subtitle: '',
            blocks: [{ type: 'text', content: 'Add your content here...' }]
        };
        onUpdate([...customSections, newSection]);
    };

    const removeSection = (index) => {
        if (window.confirm('Delete this custom section permanently?')) {
            onUpdate(customSections.filter((_, i) => i !== index));
        }
    };

    const moveSection = (index, direction) => {
        const updated = [...customSections];
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < updated.length) {
            [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
            onUpdate(updated);
        }
    };

    const addBlock = (sectionIndex, type) => {
        const updated = [...customSections];
        const newBlock = { type };
        if (type === 'button') { newBlock.text = 'Click Me'; newBlock.url = '#'; }
        else if (type === 'image' || type === 'video') { newBlock.url = ''; }
        else { newBlock.content = ''; }

        updated[sectionIndex].blocks.push(newBlock);
        onUpdate(updated);
    };

    return (
        <div className="custom-section-builder">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3>Custom Sections</h3>
                <button className="btn-add" onClick={addSection}>+ Add Section</button>
            </div>

            {customSections.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--color-bg-secondary)', borderRadius: '1rem', border: '2px dashed var(--glass-border)' }}>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>🎨 No custom sections yet</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Dynamic sections allow for page expansion</p>
                </div>
            ) : (
                customSections.map((section, sIndex) => (
                    <div key={section.id} className="custom-section-editor" style={{ background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08), rgba(0, 130, 255, 0.06))', border: '2px solid var(--color-accent-primary)', borderRadius: '1.5rem', padding: '1.5rem', marginBottom: '2rem', position: 'relative', boxShadow: '0 4px 20px rgba(0, 229, 255, 0.15)' }}>
                        <div style={{ background: 'var(--color-accent-gradient)', padding: '0.8rem 1rem', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ color: 'white', margin: 0, fontSize: '1rem' }}>📄 Section {sIndex + 1}: {section.title || 'Untitled'}</h4>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {sIndex > 0 && <button className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.15)', color: 'white' }} onClick={() => moveSection(sIndex, -1)}>↑</button>}
                                {sIndex < customSections.length - 1 && <button className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.15)', color: 'white' }} onClick={() => moveSection(sIndex, 1)}>↓</button>}
                                <button className="btn-remove" style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.9)', color: 'white' }} onClick={() => removeSection(sIndex)}>🗑️</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Section Title</label>
                            <input type="text" className="form-input" value={section.title} onChange={(e) => handleSectionUpdate(sIndex, { ...section, title: e.target.value })} placeholder="Title" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Subtitle (opt)</label>
                            <input type="text" className="form-input" value={section.subtitle || ''} onChange={(e) => handleSectionUpdate(sIndex, { ...section, subtitle: e.target.value })} placeholder="Subtitle" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Blocks</label>
                            {section.blocks.map((block, bIndex) => (
                                <BlockEditor
                                    key={bIndex}
                                    block={block}
                                    onUpdate={(updatedBlock) => {
                                        const newBlocks = [...section.blocks];
                                        newBlocks[bIndex] = updatedBlock;
                                        handleSectionUpdate(sIndex, { ...section, blocks: newBlocks });
                                    }}
                                    onRemove={() => {
                                        const newBlocks = section.blocks.filter((_, i) => i !== bIndex);
                                        handleSectionUpdate(sIndex, { ...section, blocks: newBlocks });
                                    }}
                                />
                            ))}
                        </div>

                        <div style={{ background: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: '1rem', marginTop: '1rem' }}>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '0.8rem', fontWeight: 600 }}>➕ Add Block:</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.8rem' }}>
                                <button className="btn-add" style={{ padding: '0.5rem', fontSize: '0.85rem' }} onClick={() => addBlock(sIndex, 'text')}>📝 Text</button>
                                <button className="btn-add" style={{ padding: '0.5rem', fontSize: '0.85rem' }} onClick={() => addBlock(sIndex, 'heading')}>📌 Heading</button>
                                <button className="btn-add" style={{ padding: '0.5rem', fontSize: '0.85rem' }} onClick={() => addBlock(sIndex, 'image')}>🖼️ Image</button>
                                <button className="btn-add" style={{ padding: '0.5rem', fontSize: '0.85rem' }} onClick={() => addBlock(sIndex, 'video')}>🎥 Video</button>
                                <button className="btn-add" style={{ padding: '0.5rem', fontSize: '0.85rem' }} onClick={() => addBlock(sIndex, 'button')}>🔘 Button</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CustomSectionBuilder;

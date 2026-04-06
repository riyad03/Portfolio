// ==================== CUSTOM SECTION BUILDER ====================

// Render all custom sections dynamically
function renderCustomSections() {
    // Remove existing custom sections from DOM
    document.querySelectorAll('.custom-section').forEach(el => el.remove());

    if (!portfolioData.customSections || portfolioData.customSections.length === 0) {
        return;
    }

    const contactSection = document.getElementById('contact');

    portfolioData.customSections.forEach((section, index) => {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'section custom-section';
        sectionEl.id = `custom-${section.id}`;

        const container = document.createElement('div');
        container.className = 'container';

        // Section header
        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
      <h2 class="section-title">${section.title.split(' ')[0]} <span class="gradient-text">${section.title.split(' ').slice(1).join(' ') || ''}</span></h2>
      ${section.subtitle ? `<p class="section-subtitle">${section.subtitle}</p>` : ''}
    `;
        container.appendChild(header);

        // Content blocks
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'custom-section-content';

        section.blocks.forEach(block => {
            const blockEl = renderContentBlock(block);
            if (blockEl) {
                contentWrapper.appendChild(blockEl);
            }
        });

        container.appendChild(contentWrapper);
        sectionEl.appendChild(container);

        // Insert before contact section
        contactSection.parentNode.insertBefore(sectionEl, contactSection);
    });

    // Update navigation
    updateCustomNavigation();
}

// Render individual content blocks
function renderContentBlock(block) {
    const blockEl = document.createElement('div');
    blockEl.className = `content-block block-${block.type}`;

    switch (block.type) {
        case 'text':
            blockEl.innerHTML = `<p style="color: var(--color-text-secondary); font-size: 1.05rem; line-height: 1.8;">${block.content}</p>`;
            break;

        case 'heading':
            blockEl.innerHTML = `<h3 style="color: var(--color-text-primary); margin: var(--spacing-lg) 0 var(--spacing-md);">${block.content}</h3>`;
            break;

        case 'image':
            blockEl.innerHTML = `
        <div style="text-align: center; margin: var(--spacing-lg) 0;">
          <img src="${block.url}" alt="${block.caption || ''}" style="max-width: 100%; border-radius: var(--radius-lg); box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          ${block.caption ? `<p style="color: var(--color-text-muted); font-size: 0.9rem; margin-top: var(--spacing-sm);">${block.caption}</p>` : ''}
        </div>
      `;
            break;

        case 'gallery':
            const gallery = document.createElement('div');
            gallery.className = 'projects-grid';
            gallery.style.marginTop = 'var(--spacing-lg)';
            block.images.forEach(img => {
                const imgDiv = document.createElement('div');
                imgDiv.innerHTML = `<img src="${img}" style="width: 100%; border-radius: var(--radius-md);" class="glass">`;
                gallery.appendChild(imgDiv);
            });
            blockEl.appendChild(gallery);
            break;

        case 'video':
            blockEl.innerHTML = `
        <div class="video-embed" style="margin: var(--spacing-lg) 0;">
          <iframe src="${block.url}" allowfullscreen></iframe>
        </div>
      `;
            break;

        case 'button':
            blockEl.innerHTML = `
        <div style="text-align: center; margin: var(--spacing-lg) 0;">
          <a href="${block.url}" class="btn btn-primary" target="_blank">${block.text}</a>
        </div>
      `;
            break;

        case 'code':
            blockEl.innerHTML = `
        <pre style="background: var(--color-bg-tertiary); padding: var(--spacing-md); border-radius: var(--radius-md); overflow-x: auto; margin: var(--spacing-md) 0;"><code>${escapeHtml(block.content)}</code></pre>
      `;
            break;

        default:
            return null;
    }

    return blockEl;
}

// Update navigation to include custom sections
function updateCustomNavigation() {
    const nav = document.getElementById('main-nav');

    // Remove existing custom section links
    nav.querySelectorAll('.custom-nav-link').forEach(link => link.remove());

    if (!portfolioData.customSections) return;

    const contactLink = nav.querySelector('a[href="#contact"]');

    portfolioData.customSections.forEach(section => {
        const link = document.createElement('a');
        link.href = `#custom-${section.id}`;
        link.textContent = section.title.split(' ')[0];
        link.className = 'custom-nav-link';
        nav.insertBefore(link, contactLink);
    });
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Generate unique ID for sections
function generateSectionId() {
    return 'section_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ==================== CUSTOM SECTION ADMIN ====================

// Render custom section builder in admin panel
function renderCustomSectionBuilder() {
    const builder = document.getElementById('custom-section-builder');
    if (!builder) return;

    builder.innerHTML = '';

    if (!portfolioData.customSections) {
        portfolioData.customSections = [];
    }

    if (portfolioData.customSections.length === 0) {
        builder.innerHTML = `
      <div style="text-align: center; padding: var(--spacing-xl); background: var(--color-bg-secondary); border-radius: var(--radius-md); border: 2px dashed var(--glass-border);">
        <p style="color: var(--color-text-muted); margin-bottom: var(--spacing-md); font-size: 1.1rem;">🎨 No custom sections yet</p>
        <p style="color: var(--color-text-secondary); font-size: 0.9rem;">Click "+ Add Custom Section" below to create your first section!</p>
      </div>
    `;
        return;
    }

    portfolioData.customSections.forEach((section, sectionIndex) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'custom-section-block';
        sectionDiv.style.cssText = `
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.05));
      border: 2px solid var(--color-accent-primary);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
      position: relative;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
    `;

        let blocksHTML = '';
        if (section.blocks && section.blocks.length > 0) {
            section.blocks.forEach((block, blockIndex) => {
                blocksHTML += `
        <div class="content-block-editor" style="background: var(--color-bg-primary); padding: var(--spacing-md); border-radius: var(--radius-md); margin-bottom: var(--spacing-sm); border: 1px solid var(--glass-border); box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
            <strong style="color: var(--color-accent-primary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">📝 ${block.type}</strong>
            <button class="btn-remove" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;" onclick="removeContentBlock(${sectionIndex}, ${blockIndex})">× Remove</button>
          </div>
          ${renderBlockEditor(block, sectionIndex, blockIndex)}
        </div>
      `;
            });
        }

        sectionDiv.innerHTML = `
      <div style="background: var(--color-accent-gradient); padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-md); margin-bottom: var(--spacing-md); display: flex; justify-content: space-between; align-items: center;">
        <h4 style="color: white; margin: 0; font-size: 1.1rem;">📄 Section ${sectionIndex + 1}: ${section.title || 'Untitled'}</h4>
        <div style="display: flex; gap: 0.5rem;">
          ${sectionIndex > 0 ? `<button class="btn btn-secondary" style="padding: 0.5rem 0.75rem; font-size: 0.85rem; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="moveSectionUp(${sectionIndex})">↑ Up</button>` : ''}
          ${sectionIndex < portfolioData.customSections.length - 1 ? `<button class="btn btn-secondary" style="padding: 0.5rem 0.75rem; font-size: 0.85rem; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white;" onclick="moveSectionDown(${sectionIndex})">↓ Down</button>` : ''}
          <button class="btn-remove" style="padding: 0.5rem 0.75rem; font-size: 0.85rem; background: rgba(239, 68, 68, 0.9); color: white;" onclick="removeCustomSection(${sectionIndex})">🗑️ Delete</button>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label" style="font-weight: 600;">Section Title</label>
        <input type="text" class="form-input custom-section-title" data-section-index="${sectionIndex}" value="${section.title}" placeholder="e.g., Testimonials, Awards, Gallery">
      </div>
      
      <div class="form-group">
        <label class="form-label" style="font-weight: 600;">Subtitle <span style="color: var(--color-text-muted); font-weight: 400;">(optional)</span></label>
        <input type="text" class="form-input custom-section-subtitle" data-section-index="${sectionIndex}" value="${section.subtitle || ''}" placeholder="e.g., What people say about me">
      </div>
      
      <div class="form-group">
        <label class="form-label" style="font-weight: 600; margin-bottom: var(--spacing-md);">Content Blocks</label>
        <div class="content-blocks-list">
          ${blocksHTML || '<p style="color: var(--color-text-muted); text-align: center; padding: var(--spacing-md); font-style: italic;">No content blocks yet. Add one below!</p>'}
        </div>
      </div>
      
      <div style="background: var(--color-bg-secondary); padding: var(--spacing-md); border-radius: var(--radius-md); margin-top: var(--spacing-md);">
        <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: var(--spacing-sm); font-weight: 500;">➕ Add Content Block:</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--spacing-sm);">
          <button class="btn-add" onclick="addContentBlock(${sectionIndex}, 'text')">📝 Text</button>
          <button class="btn-add" onclick="addContentBlock(${sectionIndex}, 'heading')">📌 Heading</button>
          <button class="btn-add" onclick="addContentBlock(${sectionIndex}, 'image')">🖼️ Image</button>
          <button class="btn-add" onclick="addContentBlock(${sectionIndex}, 'video')">🎥 Video</button>
          <button class="btn-add" onclick="addContentBlock(${sectionIndex}, 'button')">🔘 Button</button>
        </div>
      </div>
    `;

        builder.appendChild(sectionDiv);
    });

    // Add a visual separator and emphasis on the "+ Add Custom Section" button
    const addMoreHint = document.createElement('div');
    addMoreHint.style.cssText = `
    text-align: center;
    padding: var(--spacing-md);
    margin-top: var(--spacing-md);
    color: var(--color-text-muted);
    font-size: 0.9rem;
  `;
    addMoreHint.innerHTML = '👇 Click below to add another section';
    builder.appendChild(addMoreHint);
}

// Render block editor based on block type
function renderBlockEditor(block, sectionIndex, blockIndex) {
    const dataAttr = `data-section="${sectionIndex}" data-block="${blockIndex}"`;

    switch (block.type) {
        case 'text':
        case 'code':
            return `<textarea class="form-textarea block-content" ${dataAttr} placeholder="Enter ${block.type} content...">${block.content || ''}</textarea>`;

        case 'heading':
            return `<input type="text" class="form-input block-content" ${dataAttr} value="${block.content || ''}" placeholder="Heading text">`;

        case 'image':
            return `
        <input type="text" class="form-input block-url" ${dataAttr} value="${block.url || ''}" placeholder="Image URL">
        <input type="text" class="form-input block-caption" ${dataAttr} value="${block.caption || ''}" placeholder="Caption (optional)" style="margin-top: 0.5rem;">
      `;

        case 'video':
            return `
        <input type="text" class="form-input block-url" ${dataAttr} value="${block.url || ''}" placeholder="YouTube/Vimeo embed URL">
        <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.25rem;">Use embed URLs like: https://www.youtube.com/embed/VIDEO_ID</p>
      `;

        case 'button':
            return `
        <input type="text" class="form-input block-text" ${dataAttr} value="${block.text || ''}" placeholder="Button text">
        <input type="text" class="form-input block-url" ${dataAttr} value="${block.url || ''}" placeholder="Button URL" style="margin-top: 0.5rem;">
      `;

        default:
            return '';
    }
}

// Add a new custom section
function addCustomSection() {
    if (!portfolioData.customSections) {
        portfolioData.customSections = [];
    }

    const newSection = {
        id: generateSectionId(),
        title: 'New Section',
        subtitle: '',
        blocks: [
            { type: 'text', content: 'Add your content here...' }
        ]
    };

    portfolioData.customSections.push(newSection);
    renderCustomSectionBuilder();
}

// Remove a custom section
function removeCustomSection(index) {
    if (confirm('Are you sure you want to remove this section?')) {
        portfolioData.customSections.splice(index, 1);
        renderCustomSectionBuilder();
    }
}

// Move section up
function moveSectionUp(index) {
    if (index > 0) {
        const temp = portfolioData.customSections[index];
        portfolioData.customSections[index] = portfolioData.customSections[index - 1];
        portfolioData.customSections[index - 1] = temp;
        renderCustomSectionBuilder();
    }
}

// Move section down
function moveSectionDown(index) {
    if (index < portfolioData.customSections.length - 1) {
        const temp = portfolioData.customSections[index];
        portfolioData.customSections[index] = portfolioData.customSections[index + 1];
        portfolioData.customSections[index + 1] = temp;
        renderCustomSectionBuilder();
    }
}

// Add a content block to a section
function addContentBlock(sectionIndex, type) {
    const block = { type };

    switch (type) {
        case 'text':
        case 'code':
        case 'heading':
            block.content = '';
            break;
        case 'image':
        case 'video':
            block.url = '';
            if (type === 'image') block.caption = '';
            break;
        case 'button':
            block.text = 'Click Me';
            block.url = '#';
            break;
    }

    portfolioData.customSections[sectionIndex].blocks.push(block);
    renderCustomSectionBuilder();
}

// Remove a content block
function removeContentBlock(sectionIndex, blockIndex) {
    portfolioData.customSections[sectionIndex].blocks.splice(blockIndex, 1);
    renderCustomSectionBuilder();
}

// Collect custom section data from form
function collectCustomSectionData() {
    if (!portfolioData.customSections) return;

    // Update section titles and subtitles
    portfolioData.customSections.forEach((section, sectionIndex) => {
        const titleInput = document.querySelector(`.custom-section-title[data-section-index="${sectionIndex}"]`);
        const subtitleInput = document.querySelector(`.custom-section-subtitle[data-section-index="${sectionIndex}"]`);

        if (titleInput) section.title = titleInput.value;
        if (subtitleInput) section.subtitle = subtitleInput.value;

        // Update block content
        section.blocks.forEach((block, blockIndex) => {
            const contentEl = document.querySelector(`.block-content[data-section="${sectionIndex}"][data-block="${blockIndex}"]`);
            const urlEl = document.querySelector(`.block-url[data-section="${sectionIndex}"][data-block="${blockIndex}"]`);
            const textEl = document.querySelector(`.block-text[data-section="${sectionIndex}"][data-block="${blockIndex}"]`);
            const captionEl = document.querySelector(`.block-caption[data-section="${sectionIndex}"][data-block="${blockIndex}"]`);

            if (contentEl) block.content = contentEl.value;
            if (urlEl) block.url = urlEl.value;
            if (textEl) block.text = textEl.value;
            if (captionEl) block.caption = captionEl.value;
        });
    });
}

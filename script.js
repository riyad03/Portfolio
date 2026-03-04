// ==================== DATA MODEL ====================
const defaultData = {
  hero: {
    name: 'Your Name',
    title: 'Full Stack Developer',
    bio: 'Passionate about creating beautiful and functional web experiences. Specializing in modern web technologies and user-centric design.',
    image: 'https://ui-avatars.com/api/?name=Portfolio&size=180&background=6366f1&color=fff&bold=true'
  },
  about: {
    text: "I'm a passionate developer with a love for creating innovative solutions. With years of experience in web development, I specialize in building responsive, user-friendly applications that solve real-world problems.",
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'
  },
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce solution with real-time inventory management and secure payment processing.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team synchronization.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      tags: ['Vue.js', 'Firebase', 'Tailwind'],
      link: '#'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Data visualization dashboard with interactive charts and real-time metrics tracking.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      tags: ['React', 'D3.js', 'Express'],
      link: '#'
    }
  ],
  skills: [
    { name: 'JavaScript', level: 95, category: 'Frontend' },
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Python', level: 80, category: 'Backend' },
    { name: 'CSS/SASS', level: 90, category: 'Frontend' },
    { name: 'MongoDB', level: 75, category: 'Database' }
  ],
  certifications: [],
  experience: [],
  videos: [],
  customSections: [], // User-created custom sections
  contact: {
    email: 'your.email@example.com',
    phone: '+1 234 567 8900',
    linkedin: 'linkedin.com/in/yourprofile',
    github: 'github.com/yourusername'
  },
  settings: {
    password: 'admin',
    sectionsVisible: {
      certifications: false,
      experience: false,
      videos: false
    },
    sectionOrder: ['hero', 'about', 'projects', 'skills', 'contact'] // Default order
  }
};

// ==================== STATE MANAGEMENT ====================
let portfolioData = { ...defaultData };
let isAuthenticated = false;

// Load data from localStorage
function loadData() {
  const saved = localStorage.getItem('portfolioData');
  if (saved) {
    try {
      portfolioData = JSON.parse(saved);
    } catch (e) {
      console.error('Error loading data:', e);
      portfolioData = { ...defaultData };
    }
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// ==================== RENDER FUNCTIONS ====================
function renderHero() {
  document.getElementById('hero-name').textContent = portfolioData.hero.name;
  document.getElementById('hero-title').textContent = portfolioData.hero.title;
  document.getElementById('hero-bio').textContent = portfolioData.hero.bio;
  document.getElementById('hero-image').src = portfolioData.hero.image;
  document.getElementById('logo-text').textContent = portfolioData.hero.name;
  document.getElementById('footer-name').textContent = portfolioData.hero.name;
}

function renderAbout() {
  document.getElementById('about-text').textContent = portfolioData.about.text;
  document.getElementById('about-image').src = portfolioData.about.image;
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';

  portfolioData.projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card glass';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-image">
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <a href="${project.link}" class="project-link">View Project →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = '';

  portfolioData.skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card glass';
    card.innerHTML = `
      <div class="skill-name">${skill.name}</div>
      <div class="skill-level">
        <div class="skill-level-fill" style="width: ${skill.level}%"></div>
      </div>
      <div class="skill-category">${skill.category}</div>
    `;
    grid.appendChild(card);
  });
}

function renderContact() {
  document.getElementById('contact-email').textContent = portfolioData.contact.email;
  document.getElementById('contact-phone').textContent = portfolioData.contact.phone;
  document.getElementById('contact-linkedin').textContent = portfolioData.contact.linkedin;
  document.getElementById('contact-github').textContent = portfolioData.contact.github;

  // Update links
  document.getElementById('contact-email-link').href = `mailto:${portfolioData.contact.email}`;
  document.getElementById('contact-phone-link').href = `tel:${portfolioData.contact.phone}`;
  document.getElementById('contact-linkedin-link').href = `https://${portfolioData.contact.linkedin}`;
  document.getElementById('contact-github-link').href = `https://${portfolioData.contact.github}`;
}

function renderCertifications() {
  const grid = document.getElementById('certifications-grid');
  grid.innerHTML = '';

  if (portfolioData.certifications && portfolioData.certifications.length > 0) {
    portfolioData.certifications.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'certification-card glass';
      card.innerHTML = `
        <div class="certification-name">${cert.name}</div>
        <div class="certification-issuer">${cert.issuer}</div>
        <div class="certification-date">${cert.date}</div>
        ${cert.link ? `<a href="${cert.link}" target="_blank" class="certification-link">View Certificate →</a>` : ''}
      `;
      grid.appendChild(card);
    });
  }
}

function renderExperience() {
  const timeline = document.getElementById('experience-timeline');
  timeline.innerHTML = '';

  if (portfolioData.experience && portfolioData.experience.length > 0) {
    portfolioData.experience.forEach(exp => {
      const item = document.createElement('div');
      item.className = 'experience-item glass';
      item.innerHTML = `
        <div class="experience-header">
          <div class="experience-title">${exp.title}</div>
          <div class="experience-company">${exp.company}</div>
          <div class="experience-period">${exp.period}</div>
        </div>
        <div class="experience-description">${exp.description}</div>
      `;
      timeline.appendChild(item);
    });
  }
}

function renderVideos() {
  const grid = document.getElementById('videos-grid');
  grid.innerHTML = '';

  if (portfolioData.videos && portfolioData.videos.length > 0) {
    portfolioData.videos.forEach(video => {
      const card = document.createElement('div');
      card.className = 'video-card glass';
      card.innerHTML = `
        <div class="video-embed">
          <iframe src="${video.url}" allowfullscreen></iframe>
        </div>
        <div class="video-content">
          <div class="video-title">${video.title}</div>
          <div class="video-description">${video.description}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
}

function updateSectionVisibility() {
  const sections = portfolioData.settings?.sectionsVisible || {};

  // Update section visibility
  const certSection = document.getElementById('certifications');
  const expSection = document.getElementById('experience');
  const vidSection = document.getElementById('videos');

  if (sections.certifications) {
    certSection.classList.remove('hidden');
    updateNavigation('certifications', true);
  } else {
    certSection.classList.add('hidden');
    updateNavigation('certifications', false);
  }

  if (sections.experience) {
    expSection.classList.remove('hidden');
    updateNavigation('experience', true);
  } else {
    expSection.classList.add('hidden');
    updateNavigation('experience', false);
  }

  if (sections.videos) {
    vidSection.classList.remove('hidden');
    updateNavigation('videos', true);
  } else {
    vidSection.classList.add('hidden');
    updateNavigation('videos', false);
  }
}

function updateNavigation(sectionId, visible) {
  const nav = document.getElementById('main-nav');
  const existingLink = nav.querySelector(`a[href="#${sectionId}"]`);

  if (visible && !existingLink) {
    // Add link before contact
    const contactLink = nav.querySelector('a[href="#contact"]');
    const newLink = document.createElement('a');
    newLink.href = `#${sectionId}`;
    newLink.textContent = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    nav.insertBefore(newLink, contactLink);
  } else if (!visible && existingLink) {
    existingLink.remove();
  }
}

function renderAll() {
  renderHero();
  renderAbout();
  renderProjects();
  renderSkills();
  renderCertifications();
  renderExperience();
  renderVideos();
  renderCustomSections(); // Render custom sections
  renderContact();
  updateSectionVisibility();
}

// ==================== ADMIN PANEL ====================
function populateAdminForm() {
  // Hero
  document.getElementById('edit-name').value = portfolioData.hero.name;
  document.getElementById('edit-title').value = portfolioData.hero.title;
  document.getElementById('edit-bio').value = portfolioData.hero.bio;
  document.getElementById('edit-hero-image').value = portfolioData.hero.image;

  // About
  document.getElementById('edit-about-text').value = portfolioData.about.text;
  document.getElementById('edit-about-image').value = portfolioData.about.image;

  // Contact
  document.getElementById('edit-email').value = portfolioData.contact.email;
  document.getElementById('edit-phone').value = portfolioData.contact.phone;
  document.getElementById('edit-linkedin').value = portfolioData.contact.linkedin;
  document.getElementById('edit-github').value = portfolioData.contact.github;

  // Section visibility toggles
  const sections = portfolioData.settings?.sectionsVisible || {};
  document.getElementById('toggle-certifications').checked = sections.certifications || false;
  document.getElementById('toggle-experience').checked = sections.experience || false;
  document.getElementById('toggle-videos').checked = sections.videos || false;

  // Show/hide admin sections based on visibility
  updateAdminSectionVisibility();

  // Projects
  renderProjectsEditor();

  // Skills
  renderSkillsEditor();

  // Certifications
  renderCertificationsEditor();

  // Experience
  renderExperienceEditor();

  // Videos
  renderVideosEditor();

  // Custom Sections
  renderCustomSectionBuilder();
}

function updateAdminSectionVisibility() {
  const certToggle = document.getElementById('toggle-certifications').checked;
  const expToggle = document.getElementById('toggle-experience').checked;
  const vidToggle = document.getElementById('toggle-videos').checked;

  document.getElementById('certifications-section').classList.toggle('hidden', !certToggle);
  document.getElementById('experience-section').classList.toggle('hidden', !expToggle);
  document.getElementById('videos-section').classList.toggle('hidden', !vidToggle);
}


function renderProjectsEditor() {
  const editor = document.getElementById('projects-editor');
  editor.innerHTML = '';

  portfolioData.projects.forEach((project, index) => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-editor';
    projectDiv.innerHTML = `
      <div class="form-group">
        <label class="form-label">Project Title</label>
        <input type="text" class="form-input project-title-input" data-index="${index}" value="${project.title}">
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea project-desc-input" data-index="${index}">${project.description}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Image URL</label>
        <input type="text" class="form-input project-image-input" data-index="${index}" value="${project.image}">
      </div>
      <div class="form-group">
        <label class="form-label">Tags (comma-separated)</label>
        <input type="text" class="form-input project-tags-input" data-index="${index}" value="${project.tags.join(', ')}">
      </div>
      <div class="form-group">
        <label class="form-label">Link</label>
        <input type="text" class="form-input project-link-input" data-index="${index}" value="${project.link}">
      </div>
      <button class="btn-remove" onclick="removeProject(${index})">Remove Project</button>
    `;
    editor.appendChild(projectDiv);
  });
}

function renderSkillsEditor() {
  const editor = document.getElementById('skills-editor');
  editor.innerHTML = '';

  portfolioData.skills.forEach((skill, index) => {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-editor';
    skillDiv.innerHTML = `
      <div class="form-group">
        <label class="form-label">Skill Name</label>
        <input type="text" class="form-input skill-name-input" data-index="${index}" value="${skill.name}">
      </div>
      <div class="form-group">
        <label class="form-label">Level (0-100)</label>
        <input type="number" class="form-input skill-level-input" data-index="${index}" value="${skill.level}" min="0" max="100">
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <input type="text" class="form-input skill-category-input" data-index="${index}" value="${skill.category}">
      </div>
      <button class="btn-remove" onclick="removeSkill(${index})">Remove Skill</button>
    `;
    editor.appendChild(skillDiv);
  });
}

function addProject() {
  portfolioData.projects.push({
    title: 'New Project',
    description: 'Project description',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    tags: ['Tag1', 'Tag2'],
    link: '#'
  });
  renderProjectsEditor();
}

function removeProject(index) {
  portfolioData.projects.splice(index, 1);
  renderProjectsEditor();
}

function addSkill() {
  portfolioData.skills.push({
    name: 'New Skill',
    level: 50,
    category: 'Category'
  });
  renderSkillsEditor();
}

function removeSkill(index) {
  portfolioData.skills.splice(index, 1);
  renderSkillsEditor();
}

function renderCertificationsEditor() {
  const editor = document.getElementById('certifications-editor');
  editor.innerHTML = '';

  if (!portfolioData.certifications) {
    portfolioData.certifications = [];
  }

  portfolioData.certifications.forEach((cert, index) => {
    const certDiv = document.createElement('div');
    certDiv.className = 'project-editor';
    certDiv.innerHTML = `
      <div class="form-group">
        <label class="form-label">Certification Name</label>
        <input type="text" class="form-input cert-name-input" data-index="${index}" value="${cert.name}">
      </div>
      <div class="form-group">
        <label class="form-label">Issuer</label>
        <input type="text" class="form-input cert-issuer-input" data-index="${index}" value="${cert.issuer}">
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input type="text" class="form-input cert-date-input" data-index="${index}" value="${cert.date}">
      </div>
      <div class="form-group">
        <label class="form-label">Link (optional)</label>
        <input type="text" class="form-input cert-link-input" data-index="${index}" value="${cert.link || ''}">
      </div>
      <button class="btn-remove" onclick="removeCertification(${index})">Remove Certification</button>
    `;
    editor.appendChild(certDiv);
  });
}

function renderExperienceEditor() {
  const editor = document.getElementById('experience-editor');
  editor.innerHTML = '';

  if (!portfolioData.experience) {
    portfolioData.experience = [];
  }

  portfolioData.experience.forEach((exp, index) => {
    const expDiv = document.createElement('div');
    expDiv.className = 'project-editor';
    expDiv.innerHTML = `
      <div class="form-group">
        <label class="form-label">Job Title</label>
        <input type="text" class="form-input exp-title-input" data-index="${index}" value="${exp.title}">
      </div>
      <div class="form-group">
        <label class="form-label">Company</label>
        <input type="text" class="form-input exp-company-input" data-index="${index}" value="${exp.company}">
      </div>
      <div class="form-group">
        <label class="form-label">Period</label>
        <input type="text" class="form-input exp-period-input" data-index="${index}" value="${exp.period}">
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea exp-desc-input" data-index="${index}">${exp.description}</textarea>
      </div>
      <button class="btn-remove" onclick="removeExperience(${index})">Remove Experience</button>
    `;
    editor.appendChild(expDiv);
  });
}

function renderVideosEditor() {
  const editor = document.getElementById('videos-editor');
  editor.innerHTML = '';

  if (!portfolioData.videos) {
    portfolioData.videos = [];
  }

  portfolioData.videos.forEach((video, index) => {
    const videoDiv = document.createElement('div');
    videoDiv.className = 'project-editor';
    videoDiv.innerHTML = `
      <div class="form-group">
        <label class="form-label">Video Title</label>
        <input type="text" class="form-input video-title-input" data-index="${index}" value="${video.title}">
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea video-desc-input" data-index="${index}">${video.description}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Embed URL (YouTube/Vimeo)</label>
        <input type="text" class="form-input video-url-input" data-index="${index}" value="${video.url}">
        <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem;">Use embed URLs like: https://www.youtube.com/embed/VIDEO_ID</p>
      </div>
      <button class="btn-remove" onclick="removeVideo(${index})">Remove Video</button>
    `;
    editor.appendChild(videoDiv);
  });
}

function addCertification() {
  if (!portfolioData.certifications) {
    portfolioData.certifications = [];
  }
  portfolioData.certifications.push({
    name: 'New Certification',
    issuer: 'Issuer',
    date: '2026',
    link: ''
  });
  renderCertificationsEditor();
}

function removeCertification(index) {
  portfolioData.certifications.splice(index, 1);
  renderCertificationsEditor();
}

function addExperience() {
  if (!portfolioData.experience) {
    portfolioData.experience = [];
  }
  portfolioData.experience.push({
    title: 'Job Title',
    company: 'Company Name',
    period: '2024 - Present',
    description: 'Description of responsibilities and achievements.'
  });
  renderExperienceEditor();
}

function removeExperience(index) {
  portfolioData.experience.splice(index, 1);
  renderExperienceEditor();
}

function addVideo() {
  if (!portfolioData.videos) {
    portfolioData.videos = [];
  }
  portfolioData.videos.push({
    title: 'Video Title',
    description: 'Video description',
    url: 'https://www.youtube.com/embed/'
  });
  renderVideosEditor();
}

function removeVideo(index) {
  portfolioData.videos.splice(index, 1);
  renderVideosEditor();
}


function collectFormData() {
  // Hero
  portfolioData.hero.name = document.getElementById('edit-name').value;
  portfolioData.hero.title = document.getElementById('edit-title').value;
  portfolioData.hero.bio = document.getElementById('edit-bio').value;
  portfolioData.hero.image = document.getElementById('edit-hero-image').value;

  // About
  portfolioData.about.text = document.getElementById('edit-about-text').value;
  portfolioData.about.image = document.getElementById('edit-about-image').value;

  // Contact
  portfolioData.contact.email = document.getElementById('edit-email').value;
  portfolioData.contact.phone = document.getElementById('edit-phone').value;
  portfolioData.contact.linkedin = document.getElementById('edit-linkedin').value;
  portfolioData.contact.github = document.getElementById('edit-github').value;

  // Projects
  portfolioData.projects.forEach((project, index) => {
    project.title = document.querySelector(`.project-title-input[data-index="${index}"]`).value;
    project.description = document.querySelector(`.project-desc-input[data-index="${index}"]`).value;
    project.image = document.querySelector(`.project-image-input[data-index="${index}"]`).value;
    project.tags = document.querySelector(`.project-tags-input[data-index="${index}"]`).value.split(',').map(t => t.trim());
    project.link = document.querySelector(`.project-link-input[data-index="${index}"]`).value;
  });

  // Skills
  portfolioData.skills.forEach((skill, index) => {
    skill.name = document.querySelector(`.skill-name-input[data-index="${index}"]`).value;
    skill.level = parseInt(document.querySelector(`.skill-level-input[data-index="${index}"]`).value);
    skill.category = document.querySelector(`.skill-category-input[data-index="${index}"]`).value;
  });

  // Certifications
  if (portfolioData.certifications) {
    portfolioData.certifications.forEach((cert, index) => {
      cert.name = document.querySelector(`.cert-name-input[data-index="${index}"]`)?.value || cert.name;
      cert.issuer = document.querySelector(`.cert-issuer-input[data-index="${index}"]`)?.value || cert.issuer;
      cert.date = document.querySelector(`.cert-date-input[data-index="${index}"]`)?.value || cert.date;
      cert.link = document.querySelector(`.cert-link-input[data-index="${index}"]`)?.value || cert.link;
    });
  }

  // Experience
  if (portfolioData.experience) {
    portfolioData.experience.forEach((exp, index) => {
      exp.title = document.querySelector(`.exp-title-input[data-index="${index}"]`)?.value || exp.title;
      exp.company = document.querySelector(`.exp-company-input[data-index="${index}"]`)?.value || exp.company;
      exp.period = document.querySelector(`.exp-period-input[data-index="${index}"]`)?.value || exp.period;
      exp.description = document.querySelector(`.exp-desc-input[data-index="${index}"]`)?.value || exp.description;
    });
  }

  // Videos
  if (portfolioData.videos) {
    portfolioData.videos.forEach((video, index) => {
      video.title = document.querySelector(`.video-title-input[data-index="${index}"]`)?.value || video.title;
      video.description = document.querySelector(`.video-desc-input[data-index="${index}"]`)?.value || video.description;
      video.url = document.querySelector(`.video-url-input[data-index="${index}"]`)?.value || video.url;
    });
  }

  // Section visibility
  if (!portfolioData.settings) portfolioData.settings = {};
  if (!portfolioData.settings.sectionsVisible) portfolioData.settings.sectionsVisible = {};

  portfolioData.settings.sectionsVisible.certifications = document.getElementById('toggle-certifications').checked;
  portfolioData.settings.sectionsVisible.experience = document.getElementById('toggle-experience').checked;
  portfolioData.settings.sectionsVisible.videos = document.getElementById('toggle-videos').checked;

  // Custom sections
  if (typeof collectCustomSectionData === 'function') {
    collectCustomSectionData();
  }

  // Password
  const newPassword = document.getElementById('edit-password').value;
  if (newPassword) {
    portfolioData.settings.password = newPassword;
    document.getElementById('edit-password').value = '';
  }
}

function saveChanges() {
  collectFormData();
  saveData();
  renderAll();

  // Show success feedback
  const saveBtn = document.getElementById('save-changes');
  const originalText = saveBtn.textContent;
  saveBtn.textContent = '✓ Saved!';
  saveBtn.style.background = '#059669';

  setTimeout(() => {
    saveBtn.textContent = originalText;
    saveBtn.style.background = '';
  }, 2000);
}

function resetData() {
  if (confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
    portfolioData = JSON.parse(JSON.stringify(defaultData));
    saveData();
    renderAll();
    populateAdminForm();
    alert('Portfolio reset to default successfully!');
  }
}

// ==================== AUTH ====================
function checkPassword() {
  const input = document.getElementById('password-input').value;
  if (input === portfolioData.settings.password) {
    isAuthenticated = true;
    closeModal();
    openAdminPanel();
  } else {
    alert('Incorrect password!');
  }
}

function openModal() {
  document.getElementById('passwordModal').classList.remove('hidden');
  document.getElementById('password-input').value = '';
  document.getElementById('password-input').focus();
}

function closeModal() {
  document.getElementById('passwordModal').classList.add('hidden');
}

function openAdminPanel() {
  populateAdminForm();
  document.getElementById('adminPanel').classList.add('active');
}

function closeAdminPanel() {
  document.getElementById('adminPanel').classList.remove('active');
  isAuthenticated = false;
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderAll();

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Keyboard shortcut for admin (Ctrl+Shift+E)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
      e.preventDefault();
      if (isAuthenticated) {
        openAdminPanel();
      } else {
        openModal();
      }
    }
  });

  // Admin close
  document.getElementById('adminClose').addEventListener('click', closeAdminPanel);

  // Password modal
  document.getElementById('cancel-password').addEventListener('click', closeModal);
  document.getElementById('submit-password').addEventListener('click', checkPassword);
  document.getElementById('password-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkPassword();
    }
  });

  // Save changes
  document.getElementById('save-changes').addEventListener('click', saveChanges);

  // Reset data
  document.getElementById('reset-data').addEventListener('click', resetData);

  // Add project/skill/cert/exp/video
  document.getElementById('add-project').addEventListener('click', addProject);
  document.getElementById('add-skill').addEventListener('click', addSkill);
  document.getElementById('add-certification').addEventListener('click', addCertification);
  document.getElementById('add-experience').addEventListener('click', addExperience);
  document.getElementById('add-video').addEventListener('click', addVideo);

  // Section visibility toggles
  document.getElementById('toggle-certifications').addEventListener('change', updateAdminSectionVisibility);
  document.getElementById('toggle-experience').addEventListener('change', updateAdminSectionVisibility);
  document.getElementById('toggle-videos').addEventListener('change', updateAdminSectionVisibility);

  // Close modal on outside click
  document.getElementById('passwordModal').addEventListener('click', (e) => {
    if (e.target.id === 'passwordModal') {
      closeModal();
    }
  });

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// Make functions globally available
window.removeProject = removeProject;
window.removeSkill = removeSkill;
window.removeCertification = removeCertification;
window.removeExperience = removeExperience;
window.removeVideo = removeVideo;

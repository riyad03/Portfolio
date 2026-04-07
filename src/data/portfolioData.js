export const defaultData = {
    hero: {
        name: 'Riyad Rachidi',
        title: 'Full Stack Developer',
        bio: 'Passionate about creating beautiful and functional web experiences. Specializing in modern web technologies and user-centric design.',
        image: '/profile.png'
    },
    about: {
        text: "I'm a passionate developer with a love for creating innovative solutions. With years of experience in web development, I specialize in building responsive, user-friendly applications that solve real-world problems.",
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'
    },
    projects: [
        {
            title: 'E-Commerce Platform',
            shortDescription: 'Modern e-commerce solution with real-time inventory.',
            description: 'A modern e-commerce solution with real-time inventory management and secure payment processing.',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
            tags: ['React', 'Node.js', 'MongoDB'],
            link: '#',
            videoUrl: '',
            showStats: true,
            liveProjectEnabled: true,
            stats: [
                { value: '99.9%', label: 'Uptime' },
                { value: 'Fast', label: 'Performance' },
                { value: 'Secure', label: 'Payments' }
            ]
        },
        {
            title: 'Task Management App',
            shortDescription: 'Collaborative task tool with real-time team sync.',
            description: 'Collaborative task management tool with real-time updates and team synchronization.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
            tags: ['Vue.js', 'Firebase', 'Tailwind'],
            link: '#',
            videoUrl: '',
            showStats: true,
            liveProjectEnabled: true,
            stats: [
                { value: '100+', label: 'Users Supported' },
                { value: 'Real-time', label: 'Sync' },
                { value: '∞', label: 'Tasks' }
            ]
        },
        {
            title: 'Analytics Dashboard',
            shortDescription: 'Data visualization with interactive D3.js charts.',
            description: 'Data visualization dashboard with interactive charts and real-time metrics tracking.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            tags: ['React', 'D3.js', 'Express'],
            link: '#',
            videoUrl: '',
            showStats: true,
            liveProjectEnabled: true,
            stats: [
                { value: '50+', label: 'Chart Types' },
                { value: 'Real-time', label: 'Updates' },
                { value: '10x', label: 'Faster Insights' }
            ]
        },
        {
            title: 'AgriTech Smart Farming',
            shortDescription: 'IoT-powered intelligent agriculture platform.',
            description: 'An intelligent agriculture platform leveraging IoT sensors and AI to optimize crop yields, monitor soil health, and automate irrigation systems.',
            image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop',
            tags: ['IoT', 'Python', 'Machine Learning'],
            link: '#',
            videoUrl: '',
            showStats: true,
            liveProjectEnabled: true,
            stats: [
                { value: '40%', label: 'Yield Increase' },
                { value: '60%', label: 'Water Saved' },
                { value: '24/7', label: 'Monitoring' }
            ]
        },
        {
            title: 'Crypto Finance Dashboard',
            shortDescription: 'Real-time financial analytics and portfolio tracking.',
            description: 'A real-time cryptocurrency and financial analytics platform with portfolio tracking, live market data, and AI-powered trading insights.',
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
            tags: ['React', 'Web3.js', 'Node.js'],
            link: '#',
            videoUrl: '',
            showStats: true,
            liveProjectEnabled: true,
            stats: [
                { value: '500+', label: 'Coins Tracked' },
                { value: '< 1s', label: 'Data Latency' },
                { value: '99.9%', label: 'Uptime' }
            ]
        }
    ],
    skills: [
        { name: 'Python', level: 95, category: 'AI Frameworks' },
        { name: 'LangChain', level: 90, category: 'AI Frameworks' },
        { name: 'LangGraph', level: 90, category: 'AI Frameworks' },
        { name: 'LangSmith', level: 85, category: 'AI Tools' },
        { name: 'LangFuse', level: 85, category: 'AI Tools' },
        { name: 'OpenAI API', level: 95, category: 'AI Tools' },
        { name: 'MCP (Model Context Protocol)', level: 88, category: 'AI Tools' },
        { name: 'RAG Systems', level: 92, category: 'AI Frameworks' },
        { name: 'TensorFlow', level: 85, category: 'Deep Learning' },
        { name: 'PyTorch', level: 85, category: 'Deep Learning' },
        { name: 'Machine Learning', level: 90, category: 'Machine Learning' },
        { name: 'NLP', level: 88, category: 'NLP' }
    ],
    certifications: [],
    experience: [],
    videos: [],
    customSections: [],
    contact: {
        email: 'riyad@rachidi.dev',
        phone: '+212 644450396',
        linkedin: 'linkedin.com/in/riyad-rachidi/',
        github: 'github.com/riyad03'
    },
    chatbotContext: `You are an AI assistant representing Riyad Rachidi, a 23-year-old AI developer and consultant based in Morocco.

Key background:
- Specializes in building custom AI systems for startups and businesses
- Works across industries: e-commerce, agriculture, finance, recruitment, and sales
- Currently working at Syntax while taking on freelance projects
- Focus on helping startups move faster with AI automation

Your role:
- Answer questions about Riyad's skills, experience, and projects professionally
- Highlight relevant project experience when asked about specific domains
- Be concise, helpful, and show expertise in AI/ML technologies
- If asked about availability, mention he takes on freelance projects for the right fit

Tone: Professional yet approachable, technical but accessible`,
    settings: {
        password: 'admin',
        highlightedProjectIndex: 0,
        sectionsVisible: {
            certifications: false,
            experience: false,
            videos: false
        },
        sectionOrder: ['hero', 'about', 'projects', 'skills', 'contact'],
        cloudSettings: {
            cloudName: 'dl8d3sjqx',
            uploadPreset: 'ml_default'
        }
    }
};

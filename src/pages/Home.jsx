import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import HighlightedProject from '../components/HighlightedProject';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import CustomSection from '../components/CustomSection';
import Certifications from '../components/Certifications';
import Experience from '../components/Experience';
import Videos from '../components/Videos';

const Home = ({ portfolioData, onChatToggle }) => {
    const { hero, about, projects, skills, contact, certifications, experience, videos, customSections, settings } = portfolioData;
    const { sectionsVisible } = settings;

    // Get highlighted project
    const highlightedProjectIndex = settings.highlightedProjectIndex ?? 0;
    const highlightedProject = projects[highlightedProjectIndex];

    return (
        <main>
            {/* Highlighted Project Section - Featured at the top */}
            {highlightedProject && (
                <HighlightedProject project={highlightedProject} index={highlightedProjectIndex} />
            )}

            <Hero hero={hero} onChatToggle={onChatToggle} />
            <About about={about} />
            <Projects projects={projects} />

            {/* Custom Sections */}
            {(customSections || []).map((section) => (
                <CustomSection key={section.id} section={section} />
            ))}

            <Skills skills={skills} />

            {sectionsVisible.certifications && (
                <Certifications certifications={certifications} />
            )}

            {sectionsVisible.experience && (
                <Experience experience={experience} />
            )}

            {sectionsVisible.videos && (
                <Videos videos={videos} />
            )}

            <Contact contact={contact} />
        </main>
    );
};

export default Home;


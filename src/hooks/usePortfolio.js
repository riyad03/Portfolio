import { useState, useEffect } from 'react';
import { defaultData } from '../data/portfolioData';

export const usePortfolio = () => {
    const [portfolioData, setPortfolioData] = useState(() => {
        const saved = localStorage.getItem('portfolioData');
        const savedVersion = localStorage.getItem('portfolioDataVersion');
        const currentVersion = 'v5';

        if (saved && savedVersion === currentVersion) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with defaultData to ensure new fields are present
                return { ...defaultData, ...parsed, settings: { ...defaultData.settings, ...parsed.settings, sectionsVisible: { ...defaultData.settings.sectionsVisible, ...parsed.settings?.sectionsVisible } } };
            } catch (e) {
                console.error('Error loading data:', e);
                return defaultData;
            }
        }
        localStorage.setItem('portfolioDataVersion', currentVersion);
        return defaultData;
    });

    useEffect(() => {
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    }, [portfolioData]);

    const updateData = (newData) => {
        setPortfolioData(newData);
    };

    return { portfolioData, updateData };
};

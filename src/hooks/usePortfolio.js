import { useState, useEffect } from 'react';
import { defaultData } from '../data/portfolioData';
import { getPortfolioData, setPortfolioData } from '../utils/firebaseUtils';

export const usePortfolio = () => {
    const [portfolioData, setPortfolioDataState] = useState(defaultData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load data from Firebase on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await getPortfolioData();

                // Merge with defaultData to ensure new fields are present
                const mergedData = {
                    ...defaultData,
                    ...data,
                    settings: {
                        ...defaultData.settings,
                        ...data.settings,
                        sectionsVisible: {
                            ...defaultData.settings.sectionsVisible,
                            ...data.settings?.sectionsVisible
                        }
                    }
                };

                setPortfolioDataState(mergedData);
                setError(null);
            } catch (err) {
                console.error('Error loading portfolio data:', err);
                setError(err.message);

                // Fallback to localStorage
                const saved = localStorage.getItem('portfolioData');
                if (saved) {
                    try {
                        const parsed = JSON.parse(saved);
                        setPortfolioDataState({ ...defaultData, ...parsed });
                    } catch (e) {
                        console.error('Error parsing localStorage data:', e);
                        setPortfolioDataState(defaultData);
                    }
                } else {
                    setPortfolioDataState(defaultData);
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Update data both in Firebase and local state
    const updateData = async (newData) => {
        console.log('🔵 [usePortfolio] Starting updateData...');
        console.log('🔵 [usePortfolio] Data to save:', newData);

        try {
            console.log('🔵 [usePortfolio] Calling setPortfolioData...');
            await setPortfolioData(newData);
            console.log('✅ [usePortfolio] setPortfolioData completed successfully!');

            setPortfolioDataState(newData);
            setError(null);
            console.log('✅ [usePortfolio] Local state updated');
        } catch (err) {
            console.error('❌ [usePortfolio] Error updating portfolio data:', err);
            console.error('❌ [usePortfolio] Error details:', err.message, err.code);
            setError(err.message);

            // Still update local state even if Firebase fails
            setPortfolioDataState(newData);
            console.warn('⚠️ [usePortfolio] Updated local state despite Firebase error');
            // localStorage is handled in setPortfolioData as fallback
        }
    };

    return { portfolioData, updateData, loading, error };
};

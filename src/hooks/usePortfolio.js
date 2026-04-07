import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { defaultData } from '../data/portfolioData';
import { setPortfolioData } from '../utils/firebaseUtils';

export const usePortfolio = () => {
    const [portfolioData, setPortfolioDataState] = useState(defaultData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real-time listener for Firebase updates
    useEffect(() => {
        console.log('🔵 [usePortfolio] Setting up real-time Firebase listener...');
        const docRef = doc(db, 'portfolio', 'main');

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(
            docRef,
            (docSnap) => {
                setLoading(false);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log('✅ [usePortfolio] Real-time update received from Firebase!');
                    console.log('✅ [usePortfolio] Last updated:', data.lastUpdated);

                    // Merge with defaultData to ensure new fields are present
                    const mergedData = {
                        ...defaultData,
                        ...data,
                        chatbotContext: data.chatbotContext || defaultData.chatbotContext,
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

                    // Also update localStorage for offline access
                    localStorage.setItem('portfolioData', JSON.stringify(data));
                } else {
                    console.warn('⚠️ [usePortfolio] No portfolio data found in Firebase');

                    // Fallback to localStorage
                    const saved = localStorage.getItem('portfolioData');
                    if (saved) {
                        try {
                            const parsed = JSON.parse(saved);
                            setPortfolioDataState({ ...defaultData, ...parsed });
                            console.log('✅ [usePortfolio] Loaded from localStorage');
                        } catch (e) {
                            console.error('Error parsing localStorage data:', e);
                            setPortfolioDataState(defaultData);
                        }
                    } else {
                        setPortfolioDataState(defaultData);
                    }
                }
            },
            (err) => {
                console.error('❌ [usePortfolio] Firebase listener error:', err);
                setError(err.message);
                setLoading(false);

                // Fallback to localStorage on error
                const saved = localStorage.getItem('portfolioData');
                if (saved) {
                    try {
                        const parsed = JSON.parse(saved);
                        setPortfolioDataState({ ...defaultData, ...parsed });
                        console.log('✅ [usePortfolio] Loaded from localStorage (after error)');
                    } catch (e) {
                        console.error('Error parsing localStorage data:', e);
                        setPortfolioDataState(defaultData);
                    }
                } else {
                    setPortfolioDataState(defaultData);
                }
            }
        );

        // Cleanup listener on unmount
        return () => {
            console.log('🔵 [usePortfolio] Cleaning up Firebase listener...');
            unsubscribe();
        };
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

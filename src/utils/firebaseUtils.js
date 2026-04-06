import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { defaultData } from '../data/portfolioData';

// Collection name in Firestore
const PORTFOLIO_COLLECTION = 'portfolio';
const PORTFOLIO_DOC_ID = 'main'; // Single document for portfolio data

/**
 * Fetch portfolio data from Firestore
 * @returns {Promise<Object>} Portfolio data
 */
export const getPortfolioData = async () => {
    try {
        const docRef = doc(db, PORTFOLIO_COLLECTION, PORTFOLIO_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log('No portfolio data found in Firestore, using default data');
            // Initialize with default data if none exists
            await setPortfolioData(defaultData);
            return defaultData;
        }
    } catch (error) {
        console.error('Error fetching portfolio data from Firestore:', error);
        // Fallback to localStorage if Firebase fails
        const localData = localStorage.getItem('portfolioData');
        if (localData) {
            return JSON.parse(localData);
        }
        return defaultData;
    }
};

/**
 * Save portfolio data to Firestore
 * @param {Object} data - Portfolio data to save
 * @returns {Promise<void>}
 */
export const setPortfolioData = async (data) => {
    try {
        const docRef = doc(db, PORTFOLIO_COLLECTION, PORTFOLIO_DOC_ID);
        await setDoc(docRef, {
            ...data,
            lastUpdated: new Date().toISOString()
        });
        console.log('Portfolio data saved to Firestore successfully');

        // Also save to localStorage as backup
        localStorage.setItem('portfolioData', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving portfolio data to Firestore:', error);
        // Fallback to localStorage if Firebase fails
        localStorage.setItem('portfolioData', JSON.stringify(data));
        throw error;
    }
};

/**
 * Migrate data from localStorage to Firestore
 * @returns {Promise<boolean>} Success status
 */
export const migrateLocalStorageToFirestore = async () => {
    try {
        const localData = localStorage.getItem('portfolioData');
        if (localData) {
            const data = JSON.parse(localData);
            await setPortfolioData(data);
            console.log('Successfully migrated localStorage data to Firestore');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error migrating data to Firestore:', error);
        return false;
    }
};

/**
 * Reset portfolio data to defaults
 * @returns {Promise<void>}
 */
export const resetPortfolioData = async () => {
    try {
        await setPortfolioData(defaultData);
        console.log('Portfolio data reset to defaults');
    } catch (error) {
        console.error('Error resetting portfolio data:', error);
        throw error;
    }
};

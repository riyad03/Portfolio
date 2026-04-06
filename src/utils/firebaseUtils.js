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
    console.log('🔵 [Firebase] Starting getPortfolioData...');
    console.log('🔵 [Firebase] Firebase db object:', db ? 'initialized' : 'NOT INITIALIZED');

    try {
        console.log('🔵 [Firebase] Creating document reference...');
        const docRef = doc(db, PORTFOLIO_COLLECTION, PORTFOLIO_DOC_ID);
        console.log('🔵 [Firebase] Fetching document from:', docRef.path);

        const docSnap = await getDoc(docRef);
        console.log('🔵 [Firebase] Document fetch complete. Exists?', docSnap.exists());

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log('✅ [Firebase] Portfolio data loaded from Firestore!');
            console.log('✅ [Firebase] Last updated:', data.lastUpdated);
            console.log('✅ [Firebase] Data keys:', Object.keys(data));
            return data;
        } else {
            console.warn('⚠️ [Firebase] No portfolio data found in Firestore');
            console.log('🔵 [Firebase] Initializing with default data...');
            // Initialize with default data if none exists
            await setPortfolioData(defaultData);
            return defaultData;
        }
    } catch (error) {
        console.error('❌ [Firebase] Error fetching portfolio data from Firestore!');
        console.error('❌ [Firebase] Error type:', error.constructor.name);
        console.error('❌ [Firebase] Error code:', error.code);
        console.error('❌ [Firebase] Error message:', error.message);
        console.error('❌ [Firebase] Full error:', error);

        // Fallback to localStorage if Firebase fails
        console.warn('⚠️ [Firebase] Falling back to localStorage...');
        const localData = localStorage.getItem('portfolioData');
        if (localData) {
            console.log('✅ [Firebase] Loaded from localStorage');
            return JSON.parse(localData);
        }
        console.warn('⚠️ [Firebase] Using default data');
        return defaultData;
    }
};

/**
 * Save portfolio data to Firestore
 * @param {Object} data - Portfolio data to save
 * @returns {Promise<void>}
 */
export const setPortfolioData = async (data) => {
    console.log('🟢 [Firebase] Starting setPortfolioData...');
    console.log('🟢 [Firebase] Collection:', PORTFOLIO_COLLECTION, 'Document:', PORTFOLIO_DOC_ID);
    console.log('🟢 [Firebase] Firebase db object:', db ? 'initialized' : 'NOT INITIALIZED');

    try {
        console.log('🟢 [Firebase] Creating document reference...');
        const docRef = doc(db, PORTFOLIO_COLLECTION, PORTFOLIO_DOC_ID);
        console.log('🟢 [Firebase] Document reference created:', docRef.path);

        const dataToSave = {
            ...data,
            lastUpdated: new Date().toISOString()
        };

        console.log('🟢 [Firebase] Calling setDoc with data...');
        console.log('🟢 [Firebase] Data size:', JSON.stringify(dataToSave).length, 'characters');

        // Add timeout to detect hanging requests
        const savePromise = setDoc(docRef, dataToSave);
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Firebase save timeout after 10 seconds')), 10000)
        );

        await Promise.race([savePromise, timeoutPromise]);

        console.log('✅✅✅ [Firebase] Portfolio data saved to Firestore successfully! ✅✅✅');

        // Also save to localStorage as backup
        localStorage.setItem('portfolioData', JSON.stringify(data));
        console.log('✅ [Firebase] Also saved to localStorage as backup');
    } catch (error) {
        console.error('❌❌❌ [Firebase] Error saving portfolio data to Firestore! ❌❌❌');
        console.error('❌ [Firebase] Error type:', error.constructor.name);
        console.error('❌ [Firebase] Error code:', error.code);
        console.error('❌ [Firebase] Error message:', error.message);
        console.error('❌ [Firebase] Full error:', error);

        // Fallback to localStorage if Firebase fails
        localStorage.setItem('portfolioData', JSON.stringify(data));
        console.warn('⚠️ [Firebase] Saved to localStorage as fallback');

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

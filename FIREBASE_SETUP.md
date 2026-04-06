# Firebase Setup Guide

This guide will help you connect your portfolio to Firebase for data storage and authentication.

## Prerequisites

- A Google account
- Node.js installed on your machine

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter your project name (e.g., "my-portfolio")
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Register your app with a nickname (e.g., "Portfolio Website")
3. **Copy the Firebase configuration object** - you'll need this later
4. Click **"Continue to console"**

## Step 3: Enable Firestore Database

1. In the Firebase Console, go to **"Build" > "Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll configure rules next)
4. Select a Cloud Firestore location (choose closest to your users)
5. Click **"Enable"**

### Configure Firestore Security Rules

1. Go to **"Firestore Database" > "Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Portfolio data - read by everyone, write by authenticated users only
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## Step 4: Enable Firebase Authentication

1. In the Firebase Console, go to **"Build" > "Authentication"**
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Enable **"Email/Password"** provider:
   - Click on "Email/Password"
   - Toggle **"Enable"** to ON
   - Click **"Save"**

### Create Your Admin Account

1. Go to the **"Users"** tab in Authentication
2. Click **"Add user"**
3. Enter your email and a secure password
4. Click **"Add user"**

## Step 5: Configure Environment Variables

1. Create a `.env` file in your project root (if it doesn't exist):

```bash
cp .env.example .env
```

2. Open `.env` and add your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

3. Get these values from:
   - Firebase Console > Project Settings (gear icon) > General tab
   - Scroll down to "Your apps" section
   - Copy values from the Firebase configuration object

## Step 6: Deploy and Test

### Local Testing

1. Start your development server:

```bash
npm run dev
```

2. Open your browser and navigate to your local URL
3. Try to access the admin panel (usually via clicking "Edit" button while holding Shift)
4. Sign in with your Firebase email and password
5. Make changes and save - data should be stored in Firestore

### Production Deployment (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings > Environment Variables**
3. Add all Firebase environment variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. Redeploy your application

## Step 7: Migrate Existing Data (Optional)

If you have existing portfolio data in localStorage:

1. Open your browser's Developer Console (F12)
2. Run this command:

```javascript
// This will migrate your localStorage data to Firestore
import { migrateLocalStorageToFirestore } from './src/utils/firebaseUtils';
migrateLocalStorageToFirestore();
```

Or use the browser console:

```javascript
const localData = JSON.parse(localStorage.getItem('portfolioData'));
console.log('Copy this data:', JSON.stringify(localData, null, 2));
```

3. Copy the output and manually add it to Firestore:
   - Go to Firebase Console > Firestore Database
   - Create a collection named `portfolio`
   - Create a document with ID `main`
   - Paste your data

## Features

### ✅ What's Working Now:

- **Data Storage**: All portfolio data (projects, skills, about, etc.) stored in Firestore
- **Real-time Sync**: Changes sync across devices
- **Authentication**: Secure admin access via Firebase Auth
- **Offline Support**: Falls back to localStorage if Firebase is unavailable
- **Auto-backup**: Data saved to both Firebase and localStorage

### Authentication Options:

Your admin panel now supports two authentication methods:

1. **Firebase Auth** (Recommended): Uses your Firebase account
2. **Simple Password**: Fallback to the old password system (default: "admin")

## Troubleshooting

### "Firebase config missing" error

- Make sure all environment variables are set in your `.env` file
- Restart your dev server after adding environment variables
- Check that variable names start with `VITE_` (required for Vite)

### "Permission denied" error

- Check your Firestore security rules
- Make sure you're signed in with Firebase Authentication
- Verify your authenticated email has proper permissions

### Data not loading

- Check browser console for errors
- Verify Firebase is initialized (check Network tab)
- Ensure Firestore database is created and rules are published

### Can't sign in

- Verify Email/Password authentication is enabled
- Check that you created a user in Firebase Authentication
- Try the "Simple Password" option as a fallback

## Security Best Practices

1. **Never commit `.env` file** - it's already in `.gitignore`
2. **Use strong passwords** for Firebase Authentication
3. **Review Firestore security rules** regularly
4. **Enable App Check** (optional, for production apps with high traffic)
5. **Monitor usage** in Firebase Console to detect unusual activity

## Next Steps

- Set up Firebase Storage for media files
- Enable Firebase Analytics to track portfolio views
- Add Firebase Cloud Functions for server-side logic
- Configure custom domain in Firebase Hosting

## Support

If you encounter issues:

1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the browser console for error messages
3. Check Firebase Console > Usage & Billing for quota limits

---

**Last Updated**: April 2026

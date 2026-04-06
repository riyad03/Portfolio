# Firebase Quick Start Guide - Step by Step

## Step 1: Create Firebase Project

### 1.1 Go to Firebase Console
- Open: https://console.firebase.google.com/
- Sign in with your Google account
- Click **"Create a project"** or **"Add project"**

### 1.2 Project Setup (3 screens)

**Screen 1 - Project Name:**
- Enter project name: `my-portfolio` (or any name you want)
- Click **Continue**

**Screen 2 - Google Analytics (Optional):**
- Toggle OFF "Enable Google Analytics" (you don't need it)
- Click **Create project**

**Screen 3 - Wait:**
- Firebase creates your project (takes 30 seconds)
- Click **Continue** when ready

✅ **You now have a Firebase project!**

---

## Step 2: Register Your Web App

### 2.1 Add Web App
- You're now in your project dashboard
- Click the **Web icon** (`</>`) - it's a code bracket symbol
- OR: Click gear icon ⚙️ → Project settings → Scroll to "Your apps" → Click Web icon

### 2.2 Register App
- **App nickname**: `Portfolio Website`
- **Firebase Hosting**: Leave unchecked (we use Vercel)
- Click **Register app**

### 2.3 Copy Configuration
You'll see code like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "my-portfolio-xxxxx.firebaseapp.com",
  projectId: "my-portfolio-xxxxx",
  storageBucket: "my-portfolio-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

**IMPORTANT: Copy these 6 values somewhere safe!** You'll need them later.

- Click **Continue to console**

---

## Step 3: Create Firestore Database

### 3.1 Navigate to Firestore
- In left sidebar, click **"Build"**
- Click **"Firestore Database"**
- Click **"Create database"** button

### 3.2 Choose Security Mode
- Select **"Start in production mode"**
- Click **Next**

### 3.3 Choose Location
- Select a location close to your users:
  - **US**: `us-east1` (South Carolina) or `us-central1` (Iowa)
  - **Europe**: `europe-west1` (Belgium)
  - **Asia**: `asia-southeast1` (Singapore)
- Click **Enable**
- Wait 1-2 minutes for database creation

### 3.4 Configure Security Rules
Once database is created:
- Click **"Rules"** tab at the top
- You'll see default rules - **DELETE EVERYTHING**
- Paste this instead:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read, write: if true;
    }
  }
}
```

- Click **"Publish"** button
- You'll see "Last updated: a few seconds ago"

✅ **Firestore Database is ready!**

---

## Step 4: Get Your Firebase Configuration Values

If you didn't copy them earlier:

1. Click **gear icon** ⚙️ (top left) → **Project settings**
2. Scroll down to **"Your apps"** section
3. You'll see your web app with the config values
4. Copy each value:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## Step 5: Add to Your Local Project

Open your `.env` file and add:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=my-portfolio-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=my-portfolio-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=my-portfolio-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx
```

Replace the values with YOUR actual values!

---

## Step 6: Add to Vercel (Production)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your portfolio project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

| Key | Value |
|-----|-------|
| `VITE_FIREBASE_API_KEY` | Your `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Your `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | Your `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Your `storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | Your `appId` |

5. For each variable, select **All** environments (Production, Preview, Development)
6. Click **Save** after each one

---

## Step 7: Test It!

### Local Testing:
```bash
npm run dev
```
- Press `Ctrl + Shift + E` (admin panel)
- Enter password: `admin`
- Make a change and save
- Check Firebase Console → Firestore Database
- You should see `portfolio` collection with your data!

### Production Testing:
- Wait for Vercel to redeploy
- Visit your live site
- Do the same test

---

## Troubleshooting

### ❌ "Firebase config missing"
- Check your `.env` file has all 6 variables
- Make sure they start with `VITE_`
- Restart your dev server: `npm run dev`

### ❌ "Permission denied"
- Go to Firebase Console → Firestore Database → Rules
- Make sure you published the rules with `allow read, write: if true;`

### ❌ Data not saving
- Open browser console (F12)
- Look for Firebase errors
- Check that all environment variables are set correctly

---

## 🎉 You're Done!

Your portfolio now:
- ✅ Saves all data to Firebase Firestore
- ✅ Syncs across all devices
- ✅ Has cloud backup of your portfolio content
- ✅ Works on both local and production

---

## Firebase Console Quick Links

- **Project Dashboard**: https://console.firebase.google.com/
- **Firestore Database**: Click your project → Build → Firestore Database
- **Project Settings**: Click gear icon ⚙️ → Project settings
- **View Data**: Firestore Database → Data tab → `portfolio` collection

---

## What Gets Saved to Firebase?

Everything you edit in the admin panel:
- Hero section (name, title, bio, image)
- About section
- All projects (title, description, images, tags, videos, stats)
- Skills
- Certifications
- Experience
- Videos
- Custom sections
- Contact information
- Admin password
- Section visibility settings

Your entire portfolio is now cloud-backed! ☁️

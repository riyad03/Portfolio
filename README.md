# Portfolio Website

A modern, interactive portfolio website built with React and Vite.

## Features

- 🎨 Modern, responsive design
- 📝 Editable content via admin panel
- 🖼️ Image and video upload support via Cloudinary
- 🤖 AI-powered chatbot assistant
- 📱 Mobile-friendly interface
- 🔒 Secure admin authentication
- 🔥 Firebase integration for data storage and authentication
- ☁️ Real-time data sync across devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for data storage and authentication) - **NEW!**
- Cloudinary account (for image/video uploads)
- OpenAI API key (for chatbot feature)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd Portfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables (for production/Vercel)
   - Copy `.env.example` to `.env.local` for local development
   - Set up environment variables in Vercel dashboard for production

### Running Locally

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Environment Variables

The following environment variables need to be configured:

### Firebase Configuration (REQUIRED)

Required for data storage and authentication:

- `VITE_FIREBASE_API_KEY` - Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Your Firebase app ID

**How to set up Firebase:**
See the detailed guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### Cloudinary Configuration

Required for uploading images and videos:

- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_UPLOAD_PRESET` - Your Cloudinary upload preset (must be unsigned)

**How to get these:**
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to your Dashboard
3. Find your **Cloud Name** 
4. Go to Settings → Upload → Add upload preset
5. Create an **unsigned** upload preset

### OpenAI API Key

Required for the chatbot feature:

- `OPENAI_API_KEY` - Your OpenAI API key

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

## Deploying to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository

### Step 3: Configure Environment Variables

In your Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```
# Firebase (REQUIRED)
VITE_FIREBASE_API_KEY = your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN = your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = your-project-id
VITE_FIREBASE_STORAGE_BUCKET = your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = your_sender_id
VITE_FIREBASE_APP_ID = your_app_id

# Cloudinary
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_UPLOAD_PRESET = your_preset_name

# OpenAI
OPENAI_API_KEY = your_openai_key
```

3. Click **Save**
4. Redeploy your project

### Step 4: Verify Setup

After deployment:
1. Open your portfolio admin panel (Ctrl+Shift+E)
2. Try uploading an image to a project
3. If uploads work, your Cloudinary configuration is correct!

## Admin Panel

Access the admin panel by pressing `Ctrl + Shift + E` on any page.

Default password: `admin` (change this in the admin panel settings)

### Admin Features

- Edit hero section (name, title, bio)
- Manage projects with thumbnails and detail images
- Upload videos and images
- Configure skills and experience
- Customize contact information
- Create custom sections

## Project Structure

```
Portfolio/
├── api/                    # Vercel serverless functions
│   ├── chat.js            # Chatbot API endpoint
│   └── cloudinary-config.js # Cloudinary credentials endpoint
├── src/
│   ├── components/        # React components
│   │   ├── admin/        # Admin panel components
│   │   └── ...           # Other components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   └── data/             # Default portfolio data
├── public/               # Static assets
└── .env.example         # Environment variables template
```

## Tech Stack

- **Frontend**: React, React Router
- **Build Tool**: Vite
- **Styling**: CSS with custom properties
- **Backend**: Vercel Serverless Functions
- **Database**: Firebase Firestore
- **Authentication**: Simple password-based (no Firebase Auth needed)
- **Storage**: Cloudinary (images/videos)
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel

## Troubleshooting

### Firebase Connection Issues

If data isn't loading or saving:
1. Verify all Firebase environment variables are set correctly
2. Check Firebase Console > Firestore Database is created
3. Verify Firestore security rules allow read/write access
4. Create an admin user in Firebase Authentication
5. Check browser console for Firebase errors

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup instructions.

### Upload Issues

If uploads fail:
1. Check that environment variables are set correctly in Vercel
2. Ensure your Cloudinary upload preset is **unsigned**
3. Check browser console for detailed error messages
4. Verify your Cloudinary account is active

### Chatbot Not Working

If the chatbot doesn't respond:
1. Verify `OPENAI_API_KEY` is set in Vercel
2. Check that you have credits in your OpenAI account
3. View Vercel function logs for errors

## License

MIT

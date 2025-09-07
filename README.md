moosa-seller

## 🚀 **Setup Instructions:**

### 1. **Firebase Setup (IMPORTANT):**

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: "moosa-seller"
4. Enable Google Analytics (optional)

#### Step 2: Enable Phone Authentication
1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Phone** provider
3. Click **Enable** toggle
4. Add your phone number for testing (optional)
5. Click **Save**

#### Step 3: Configure Web App
1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click **Web** icon (</>) to add web app
4. Enter app nickname: "moosa-seller-web"
5. Check "Also set up Firebase Hosting" (optional)
6. Click **Register app**
7. Copy the Firebase config object

#### Step 4: Update Firebase Config
Replace the config in `src/config/firebase.ts` with your config:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

#### Step 5: Add Authorized Domains
1. In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
2. Add your domain (e.g., `localhost`, `your-domain.com`)
3. For development, `localhost` should already be there

#### Step 6: Enable reCAPTCHA (Important!)
- Phone authentication requires reCAPTCHA verification
- The app uses invisible reCAPTCHA for better UX
- Make sure your domain is authorized in Firebase

### 2. **Key Features:**
- **Real SMS verification** with Firebase Auth
- **Invisible reCAPTCHA** for security
- **Mobile-first design** with proper navigation
- **Responsive layouts** for all screen sizes
- **Firebase security** and user management

### 3. **Mobile Navigation:**
- **Hamburger menu** appears on mobile
- **Smooth slide-in** sidebar animation
- **Touch-friendly** buttons and interactions
- **Chat and Admin** now fully visible on mobile
- **Smooth transitions** between sections

### 4. **Testing Phone Auth:**
1. Enter a real phone number
2. You should receive an actual SMS with OTP
3. Enter the 6-digit code to verify
4. If testing, you can add test phone numbers in Firebase Console

### 5. **Troubleshooting:**
- If SMS not received, check Firebase quotas and billing
- Ensure domain is authorized in Firebase settings
- Check browser console for reCAPTCHA errors

The app now uses **real Firebase phone authentication** with actual SMS delivery!
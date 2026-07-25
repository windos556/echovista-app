# Echovista — React Native (Expo) App

This is the real, installable-track version of the Echovista prototype — same screens and
flow as the HTML mockup, now running on actual React Native so it can eventually ship to the
App Store / Play Store.

## Run it on your phone (no Mac, no Android Studio needed)

1. Install Node.js (v18+) on your computer if you don't have it: https://nodejs.org
2. Unzip this project, then in a terminal:
   ```
   cd echovista-app
   npm install
   npx expo start
   ```
3. Install the **Expo Go** app on your phone (App Store / Play Store).
4. Scan the QR code that shows up in your terminal / browser with Expo Go (Android: scan
   directly in the app; iOS: scan with the Camera app, it'll offer to open in Expo Go).
5. The app opens live on your phone. Edit any file and it hot-reloads instantly.

## What's already built
- Splash → Sign up/Log in (mock) → 2-question onboarding quiz → main app
- Bottom tabs: Map, Plans, Profile
- Map screen: 4 real Karachi landmarks (Frere Hall, Empress Market, Mohatta Palace,
  Merewether Clock Tower) with real photos, personalized "Recommended for you"
- Landmark detail screen with **real audio narration** via `expo-speech` (device text-to-speech)
- Premium paywall gating on 2 of the 4 landmarks, with a demo tier-switcher in Profile
- Reviews screen — read and post reviews (in-memory for now)
- Subscription plans screen with monthly/annual toggle, matching the pricing from the
  original business doc (Free / Rs 500 Premium / Rs 1,200 VIP)

## What's mocked and needs a real backend next
Search the codebase for `TODO` comments — these mark every spot that currently uses
in-memory state (`src/data/AppState.js`) and needs to be swapped for a real backend:

- **Accounts**: `src/screens/AuthScreen.js` — swap the mock `submit()` for Firebase Auth
  (`createUserWithEmailAndPassword` / `signInWithEmailAndPassword`)
- **Reviews & landmark data**: currently hardcoded in `src/data/landmarks.js` — move to
  Firestore so reviews persist and multiple users see the same data
- **Audio**: currently uses the phone's built-in text-to-speech (`expo-speech`) reading the
  blurb text aloud, which works today with zero setup. Real narrated audio files would use
  `expo-av` to stream/download actual recordings from Firebase Storage
- **Map**: currently a simple list, not a real interactive map — `react-native-maps` is the
  next add when you want actual GPS pins

## Suggested next steps (in order)
1. Set up a Firebase project (free tier) — Auth + Firestore + Storage
2. Wire up real accounts in `AuthScreen.js`
3. Move `landmarks.js` data into Firestore, fetch it on app load
4. Add `react-native-maps` for a real interactive map
5. Record/commission real audio narration, host in Firebase Storage, play with `expo-av`
6. Once stable, build with `eas build` (Expo Application Services) to get real App
   Store/Play Store binaries

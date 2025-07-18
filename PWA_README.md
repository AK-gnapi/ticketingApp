# Ticketing App PWA

This is a Progressive Web App (PWA) built with React, TypeScript, and Vite.

## PWA Features

- **Installable**: Users can install the app on their devices
- **Offline Support**: Basic offline functionality with service worker caching
- **App-like Experience**: Standalone mode with custom theme colors
- **Update Notifications**: Automatic updates with user prompts
- **Responsive Design**: Works on all device sizes

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## PWA Testing

### Install the App

1. Open the app in Chrome/Edge
2. Look for the install icon in the address bar
3. Click "Install" to add to your device

### Test Offline Functionality

1. Install the app
2. Open Chrome DevTools
3. Go to Network tab
4. Check "Offline"
5. Refresh the page - you should see the offline page

### Test Service Worker Updates

1. Make changes to the code
2. Build the app (`npm run build`)
3. Deploy to a server
4. Visit the app - you should see an update notification

## PWA Configuration

The PWA is configured in `vite.config.ts` with the following features:

- **Manifest**: App metadata, icons, and display settings
- **Service Worker**: Caching strategies and offline support
- **Icons**: Multiple sizes for different devices
- **Theme Colors**: Consistent branding

## File Structure

```
public/
├── manifest.json          # Web app manifest
├── icon.svg              # App icon (SVG)
├── icon-192x192.png      # App icon (192x192)
└── icon-512x512.png      # App icon (512x512)

src/
├── components/
│   ├── PWAUpdatePrompt.tsx  # Update notifications
│   └── OfflinePage.tsx      # Offline page
├── hooks/
│   └── usePWA.ts           # PWA utilities
└── App.tsx                 # Main app component
```

## Browser Support

- Chrome 67+
- Edge 79+
- Firefox 67+
- Safari 11.1+

## Deployment

For best PWA experience, deploy to HTTPS. The service worker requires a secure context to function properly.

### Recommended Hosting

- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

## Troubleshooting

### Service Worker Not Registering

- Ensure you're serving over HTTPS
- Check browser console for errors
- Clear browser cache and reload

### Install Prompt Not Showing

- App must meet installability criteria
- User must interact with the site first
- Check manifest.json is valid

### Offline Not Working

- Verify service worker is registered
- Check cache strategies in vite.config.ts
- Test with browser dev tools offline mode 
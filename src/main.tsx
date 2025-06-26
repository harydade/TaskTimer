
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Capacitor imports
import { Capacitor } from '@capacitor/core';

// Initialize app
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Add platform-specific styles
if (Capacitor.isNativePlatform()) {
  document.body.classList.add('mobile-app');
}

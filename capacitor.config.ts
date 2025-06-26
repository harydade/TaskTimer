
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.aeda03af5b7e4841b56026e50515d9f1',
  appName: 'do-it-timer-app',
  webDir: 'dist',
  server: {
    url: 'https://aeda03af-5b7e-4841-b560-26e50515d9f1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;


import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7a3e4042502e42b3b35c669a002b4777',
  appName: 'solo-voyage-planner',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://7a3e4042-502e-42b3-b35c-669a002b4777.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  }
};

export default config;

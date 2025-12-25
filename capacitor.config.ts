import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.focusflow.app',
    appName: 'FocusFlow',
    webDir: '.',
    android: {
        buildOptions: {
            keystorePath: undefined,
            keystoreAlias: undefined,
            keystorePassword: undefined,
            keystoreAliasPassword: undefined,
            signingType: 'apksigner'
        }
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            backgroundColor: '#0f0f23',
            showSpinner: false
        }
    }
};

export default config;

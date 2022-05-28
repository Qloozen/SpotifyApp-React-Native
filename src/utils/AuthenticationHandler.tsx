import { AuthConfiguration, authorize, refresh } from 'react-native-app-auth';

class AuthenticationHandler {
    spotifyAuthConfig: AuthConfiguration;
    constructor() {
        this.spotifyAuthConfig = {
            clientId: process.env.CLIENT_ID || "",
            redirectUrl: process.env.REDIRECT_URL || "",
            scopes: [
                'playlist-read-private',
                'playlist-modify-public',
                'playlist-modify-private',
                'user-library-read',
                'user-library-modify',
                'user-top-read',
            ],
            usePKCE: false,
            serviceConfiguration: {
                authorizationEndpoint: 'https://accounts.spotify.com/authorize',
                tokenEndpoint: process.env.BASE_URL + "/user/authentication" || "",
            },
        };
    }

    async onLogin() {
        try {
            const result = await authorize(this.spotifyAuthConfig);
            return result;
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    }

    async refreshLogin(refreshToken: string) {
        const result = await refresh(this.spotifyAuthConfig, {
            refreshToken: refreshToken,
        });
        return result;
    }

}

const authHandler = new AuthenticationHandler();

export default authHandler;
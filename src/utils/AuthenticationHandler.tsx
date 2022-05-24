import { AuthConfiguration, authorize, refresh } from 'react-native-app-auth';

class AuthenticationHandler {
    spotifyAuthConfig: AuthConfiguration;
    constructor() {
        this.spotifyAuthConfig = {
            clientId: '6b3f78b71ea64ae58fbd17de05a22f9b',
            clientSecret: 'c6556e25b35c476caeaccb7defc6163d',
            redirectUrl: 'com.spotifyapp://oauthredirect',
            scopes: [
                'playlist-read-private',
                'playlist-modify-public',
                'playlist-modify-private',
                'user-library-read',
                'user-library-modify',
                'user-top-read',
            ],
            serviceConfiguration: {
                authorizationEndpoint: 'https://accounts.spotify.com/authorize',
                tokenEndpoint: 'https://accounts.spotify.com/api/token',
            },
        };
    }

    async onLogin() {
        try {
            const result = await authorize(this.spotifyAuthConfig);
            console.log(JSON.stringify(result));
                return result;
        } catch (error) {
            console.log(JSON.stringify(error));
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
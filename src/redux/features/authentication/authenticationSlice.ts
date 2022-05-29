import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Slice state type
interface AuthenticationState {
    accessTokenExpirationDate: Date | undefined
    accessToken: string | undefined,
    refreshToken: string | undefined,
    user: SpotifyApi.CurrentUsersProfileResponse | undefined,
    loading: boolean
}

// Initial state
const initialState: AuthenticationState = {
    accessTokenExpirationDate: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
    loading: false,
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string | undefined>) {
            state.accessToken = action.payload;
            state.loading = false;
        },
        setRefreshToken(state, action: PayloadAction<string | undefined>) {
            state.refreshToken = action.payload;
            state.loading = false;
        },
        setAccessTokenExpirationDate(state, action: PayloadAction<Date | undefined>) {
            state.accessTokenExpirationDate = action.payload;
            state.loading = false;
        },
        setLoadingTrue(state) {
            state.loading = true;
        },
        setLoadingFalse(state) {
            state.loading = false;
        },
        setUser(state, action: PayloadAction<SpotifyApi.CurrentUsersProfileResponse | undefined>) {
            state.user = action.payload;
        },
    },
});

export const {
    setAccessToken,
    setRefreshToken,
    setLoadingTrue,
    setLoadingFalse,
    setAccessTokenExpirationDate,
    setUser
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
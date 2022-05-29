import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Slice state type
interface AuthenticationState {
    accessTokenExpirationDate: Date | undefined
    accessToken: string | undefined,
    refreshToken: string | undefined,
    user: SpotifyApi.CurrentUsersProfileResponse | undefined,
    loading: boolean,
    devices: SpotifyApi.UserDevice[]
    currentDevice: SpotifyApi.UserDevice | undefined
}

// Initial state
const initialState: AuthenticationState = {
    accessTokenExpirationDate: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
    loading: false,
    devices: [],
    currentDevice: undefined
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
        setDevices(state, action: PayloadAction<SpotifyApi.UserDevice[]>) {
            state.devices = action.payload
        },
        setCurrentDevice(state, action: PayloadAction<SpotifyApi.UserDevice>) {
            state.currentDevice = action.payload
        },
    },
});

export const {
    setAccessToken,
    setRefreshToken,
    setLoadingTrue,
    setLoadingFalse,
    setAccessTokenExpirationDate,
    setUser,
    setDevices,
    setCurrentDevice
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
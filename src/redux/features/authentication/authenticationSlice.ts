import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Slice state type
interface AuthenticationState {
    accessToken: string | undefined,
    refreshToken: string | undefined,
    loading: boolean
}

// Initial state
const initialState: AuthenticationState = {
    accessToken: undefined,
    refreshToken: undefined,
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
        setLoadingTrue(state) {
            state.loading = true;
        },
        setLoadingFalse(state) {
            state.loading = false;
        },
    },
});

export const {
    setAccessToken,
    setRefreshToken,
    setLoadingTrue,
    setLoadingFalse,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
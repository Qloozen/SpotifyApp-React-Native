import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types';

// Slice state type
interface AuthenticationState {
    accessTokenExpirationDate: Date | undefined
    accessToken: string | undefined,
    refreshToken: string | undefined,
    user: User | undefined,
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
        setUser(state, action: PayloadAction<User | undefined>) {
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
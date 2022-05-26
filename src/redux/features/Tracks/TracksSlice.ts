import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackWrapper } from '../../../types'

// Slice state type
interface TrackState {
    tracks: TrackWrapper[]
}

// Initial state
const initialState: TrackState = {
    tracks: []
}

const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        setTracks(state, action: PayloadAction<TrackWrapper[]>) {
            state.tracks = action.payload
        }
    },
});

export const {
    setTracks
} = trackSlice.actions;

export default trackSlice.reducer;
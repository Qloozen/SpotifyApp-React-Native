import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackWrapper, Track } from '../../../types'

// Slice state type
interface TrackState {
    tracks: TrackWrapper[],
    filteredTracks: TrackWrapper[],
    lastRemovedTrack: Track | null
}

// Initial state
const initialState: TrackState = {
    tracks: [],
    filteredTracks: [],
    lastRemovedTrack: null
}

const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        setTracks(state, action: PayloadAction<TrackWrapper[]>) {
            state.tracks = action.payload
        },
        setFilteredTracks(state, action: PayloadAction<TrackWrapper[]>) {
            state.filteredTracks = action.payload
        },
        setLastRemovedTrack(state, action: PayloadAction<Track | null>) {
            state.lastRemovedTrack = action.payload
        },
    },
});

export const {
    setTracks,
    setFilteredTracks,
    setLastRemovedTrack
} = trackSlice.actions;

export default trackSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackWrapper, Track } from '../../../types'

// Slice state type
interface TrackState {
    savedTracks: TrackWrapper[],
    filteredTracks: TrackWrapper[],
    lastRemovedTrack: Track | null,
    tracks: Track[],

}

// Initial state
const initialState: TrackState = {
    savedTracks: [],
    filteredTracks: [],
    lastRemovedTrack: null,
    tracks: [],
}

const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        setSavedTracks(state, action: PayloadAction<TrackWrapper[]>) {
            state.savedTracks = action.payload
        },
        setFilteredTracks(state, action: PayloadAction<TrackWrapper[]>) {
            state.filteredTracks = action.payload
        },
        setLastRemovedTrack(state, action: PayloadAction<Track | null>) {
            state.lastRemovedTrack = action.payload
        },
        setTracks(state, action: PayloadAction<Track[]>) {
            state.tracks = action.payload
        },
    },
});

export const {
    setSavedTracks,
    setFilteredTracks,
    setLastRemovedTrack,
    setTracks
} = trackSlice.actions;

export default trackSlice.reducer;
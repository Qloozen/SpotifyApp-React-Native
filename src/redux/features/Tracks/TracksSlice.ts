import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Slice state type
interface TrackState {
    savedTracks: SpotifyApi.SavedTrackObject[],
    filteredTracks: SpotifyApi.SavedTrackObject[],
    lastRemovedTrack: SpotifyApi.TrackObjectFull | null,
    tracks: SpotifyApi.TrackObjectFull[],

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
        setSavedTracks(state, action: PayloadAction<SpotifyApi.SavedTrackObject[]>) {
            state.savedTracks = action.payload
        },
        setFilteredTracks(state, action: PayloadAction<SpotifyApi.SavedTrackObject[]>) {
            state.filteredTracks = action.payload
        },
        setLastRemovedTrack(state, action: PayloadAction<SpotifyApi.TrackObjectFull | null>) {
            state.lastRemovedTrack = action.payload
        },
        setTracks(state, action: PayloadAction<SpotifyApi.TrackObjectFull[]>) {
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
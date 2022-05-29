import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Slice state type
interface TrackState {
    savedTracks: SpotifyApi.SavedTrackObject[],
    filteredTracks: SpotifyApi.SavedTrackObject[],
    lastRemovedTrack: SpotifyApi.TrackObjectFull | null,
    tracks: SpotifyApi.TrackObjectFull[],
    currentTrack: SpotifyApi.TrackObjectFull | null,
    isPlaying: boolean
    currentPlayBack: SpotifyApi.CurrentPlaybackResponse | null
}

// Initial state
const initialState: TrackState = {
    savedTracks: [],
    filteredTracks: [],
    lastRemovedTrack: null,
    tracks: [],
    currentTrack: null,
    isPlaying: false,
    currentPlayBack: null
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
        setCurrentTrack(state, action: PayloadAction<SpotifyApi.TrackObjectFull | null>) {
            state.currentTrack = action.payload
        },
        setIsPlayingTrue(state) {
            state.isPlaying = true
        },
        setIsPlayingFalse(state) {
            state.isPlaying = false
        },
        setCurrentPlayBack(state, action: PayloadAction<SpotifyApi.CurrentPlaybackResponse | null>) {
            state.currentPlayBack = action.payload
        }

    },
});

export const {
    setSavedTracks,
    setFilteredTracks,
    setLastRemovedTrack,
    setTracks,
    setCurrentTrack,
    setIsPlayingTrue,
    setIsPlayingFalse,
    setCurrentPlayBack
} = trackSlice.actions;

export default trackSlice.reducer;
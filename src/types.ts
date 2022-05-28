export interface SavedTracksResponse {
    items: TrackWrapper[]
}
export interface SearchTrackResponse {
    tracks: {
        items: Track[]
    }
}

export interface TrackWrapper {
    added_at: string,
    track: Track
}

export interface Track {
    id: string,
    album: Album,
    artists: Artist[],
    duration: Number,
    name: string
}

export interface Album {
    id: string,
    artists: Artist[],
    images: Image[],
    name: string,
    release_date: string,
    total_tracks: Number,
}

export interface Artist {
    id: string,
    name: string
}

export interface Image {
    height: Number,
    url: string,
    width: Number
}
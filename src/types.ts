export interface TracksResponse {
    items: TrackWrapper[]
}

export interface TrackWrapper {
    added_at: string,
    track: Track
}

export interface Track {
    id: String,
    album: Album,
    artists: Artist[],
    duration: Number,
    name: String
}

export interface Album {
    id: String,
    artists: Artist[],
    images: Image[],
    name: String,
    release_date: String,
    total_tracks: Number,
}

export interface Artist {
    id: String,
    name: String
}

export interface Image {
    height: Number,
    url: String,
    width: Number
}
import axios from "axios"
import { useDispatch } from 'react-redux';
import { store } from '../store/store';
import { setSavedTracks, setFilteredTracks, setTracks } from '../features/Tracks/TracksSlice';
import { setUser } from "../features/authentication/authenticationSlice";

import SpotifyWebAPI from 'spotify-web-api-js';


const dispatch = useDispatch();

class SpotifyService {
    sp: SpotifyWebAPI.SpotifyWebApiJs
    
    constructor(){
        this.sp = new SpotifyWebAPI();
    }

    private setToken(): void{
        const token = store.getState().root.authentication.accessToken
        if(token) this.sp.setAccessToken(token)
    }

    public async getSavedTracks() {
        console.debug("SpotifyService: getSavedTracks called.")
        this.setToken();

        await this.sp.getMySavedTracks()
            .then(res => {
                dispatch(setSavedTracks(res.items))
                dispatch(setFilteredTracks(res.items))
            })
            .catch(err => {
                console.error(err)
            })
    }

    public async addSavedTrack(trackId: string) {
        console.debug("SpotifyService: addSavedTrack called.")

        this.setToken();
        await this.sp.addToMySavedTracks([trackId])
            .catch(err => {
                console.error(err)
            })
    }

    public async removeSavedTrack(trackId: string) {
        console.debug("SpotifyService: removeSavedTrack called.")

        this.setToken();
        await this.sp.removeFromMySavedTracks([trackId])
            .catch(err => {
                console.error(err)
            })
    }

    public async searchTrack(term: string) {
        console.debug("SpotifyService: searchTrack called.")

        this.setToken();
        await this.sp.searchTracks(term)
            .then(res => {
                dispatch(setTracks(res.tracks.items))
            })
            .catch(err => {
                console.error(err)
            })
    }

    public async getMe() {
        console.debug("SpotifyService: getMe called")
        this.setToken();
        await this.sp.getMe()
            .then(res => {
                dispatch(setUser(res))
            })
            .catch(err => {
                console.error(err)
            })
    } 
}
const spotifyService = new SpotifyService()
export default new SpotifyService()
export const getService = () => { return spotifyService}



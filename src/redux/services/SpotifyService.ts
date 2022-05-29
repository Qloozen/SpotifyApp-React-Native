import axios from "axios"
import { useDispatch } from 'react-redux';
import { store } from '../store/store';
import { setSavedTracks, setFilteredTracks, setTracks, setCurrentPlayBack,  } from '../features/Tracks/TracksSlice';
import { setAccessToken, setAccessTokenExpirationDate, setUser,setDevices, setCurrentDevice } from "../features/authentication/authenticationSlice";

import SpotifyWebAPI from 'spotify-web-api-js';


const dispatch = useDispatch();

class SpotifyService {
    sp: SpotifyWebAPI.SpotifyWebApiJs
    
    constructor(){
        this.sp = new SpotifyWebAPI();
    }

    private async setToken(){
        const token = store.getState().root.authentication.accessToken
        const refreshToken = store.getState().root.authentication.refreshToken

        const expiring = store.getState().root.authentication.accessTokenExpirationDate;

        if (expiring && expiring < new Date()) {
            await axios({
                method: "post",
                url: `${process.env.BASE_URL}/user/authentication`,
                data: {
                    refresh_token: refreshToken
                }
            }).then(res => {
                console.debug("SpotifyService: token refreshed")
                const expires = new Date()
                expires.setMinutes(expires.getMinutes() + 2)
                dispatch(setAccessToken(res.data.accessToken))
                dispatch(setAccessTokenExpirationDate(expires))
            })
        }


        if(token) this.sp.setAccessToken(token)
    }

    public async getSavedTracks() {
        console.debug("SpotifyService: getSavedTracks called.")
        await this.setToken()
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

        await this.setToken()
        await this.sp.addToMySavedTracks([trackId])
                .catch(err => {
                    console.error(err)
                })

    }

    public async removeSavedTrack(trackId: string) {
        console.debug("SpotifyService: removeSavedTrack called.")

        await this.setToken()
        await this.sp.removeFromMySavedTracks([trackId])
                .catch(err => {
                    console.error(err)
                })

    }

    public async searchTrack(term: string) {
        console.debug("SpotifyService: searchTrack called.")

        await this.setToken()
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
        await this.setToken()
        await this.sp.getMe()
            .then(res => {
                dispatch(setUser(res))
            })
            .catch(err => {
                console.error(err)
            })
    } 

    public async getDevices() {
        console.debug("SpotifyService: getDevices called")

        await this.setToken()
        await this.sp.getMyDevices()
            .then(res => {
                dispatch(setDevices(res.devices))
            })
    }

    public async play(track: SpotifyApi.TrackObjectFull) {
        await this.setToken()
        await this.getDevices()

        const devices = store.getState().root.authentication.devices
        const currentTrack = store.getState().root.tracks.currentTrack
        const currentPlayBack = store.getState().root.tracks.currentPlayBack
        let position_ms = 0;

        if(devices.length < 1) {
           throw new Error("No playback device");
        }
        if(currentTrack?.id == track.id) {
            position_ms = currentPlayBack?.progress_ms ? currentPlayBack.progress_ms : 0
        }
        const deviceId = devices[0]?.id
        dispatch(setCurrentDevice(devices[0]))
        await this.sp.play({
            device_id: deviceId!,
            context_uri: track.album.uri,
            offset: {
            position: track.track_number - 1
            },
            position_ms: position_ms
        })
    }

    public async Pause() {
        await this.setToken()
        await this.sp.getMyCurrentPlaybackState().then(res => {
            dispatch(setCurrentPlayBack(res))
            return this.sp.pause()
        })
    }
}
const spotifyService = new SpotifyService()
export default new SpotifyService()
export const getService = () => { return spotifyService}



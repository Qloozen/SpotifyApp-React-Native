import axios from "axios"
import { useDispatch } from 'react-redux';
import { setSavedTracks, setFilteredTracks, setTracks } from '../../redux/features/Tracks/TracksSlice';

import { SavedTracksResponse, SearchTrackResponse, User } from "../../types";
import { setUser } from "../features/authentication/authenticationSlice";

const dispatch = useDispatch();

class UserService {
    public async getSavedTracks() {
        console.debug("userService: getSavedTracks called.")
        await axios({
            method: 'get',
            url: `${process.env.BASE_URL}/user/savedTracks`
        })
            .then(res => res.data)
            .then((res: SavedTracksResponse) => {
                dispatch(setSavedTracks(res.items))
                dispatch(setFilteredTracks(res.items))
            })
            .catch(err => {
                console.log(err)
            })
    }

    public async addSavedTrack(trackId: string) {
        console.debug("userService: addSavedTrack called.")
        await axios({
            method: 'post',
            url: `${process.env.BASE_URL}/user/savedTracks/${trackId}`
        })
        .catch(err => {
            console.log(err)
        })
    }

    public async removeSavedTrack(trackId: string) {
        console.debug("userService: removeSavedTrack called.")
        await axios({
            method: 'delete',
            url: `${process.env.BASE_URL}/user/savedTracks/${trackId}`
        })
        .catch(err => {
            console.log(err)
        })
    }

    public async searchTrack(term: string) {
        console.debug("userService: searchTrack called.")
        await axios({
            method: 'get',
            url: `${process.env.BASE_URL}/track?term=${term}`
        })
            .then(res => res.data)
            .then((res: SearchTrackResponse) => {
                dispatch(setTracks(res.tracks.items))
            })
            .catch(err => {
                console.log(err)
            })
    }

    public async getMe() {
        console.debug("userService: getMe called")
        await axios({
            method: 'get',
            url: `${process.env.BASE_URL}/user/profile`
        })
            .then(res => res.data)
            .then((res: User) => {
                dispatch(setUser(res))
            })
            .catch(err => {
                console.error(err)
            })
    } 
}
const userService = new UserService()
export default userService
export const getService = () => { return userService}



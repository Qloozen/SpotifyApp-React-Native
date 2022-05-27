import axios from "axios"
import { useDispatch } from 'react-redux';
import { setTracks, setFilteredTracks } from '../../redux/features/Tracks/TracksSlice';

import { TracksResponse } from "../../types";

const dispatch = useDispatch();

class UserService {
    public async getSavedTracks() {
        console.debug("userService: getSavedTracks called.")
        await axios({
            method: 'get',
            url: `${process.env.BASE_URL}/user/savedTracks`
        })
            .then(res => res.data)
            .then((res: TracksResponse) => {
                dispatch(setTracks(res.items))
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
}
const userService = new UserService()
export default userService



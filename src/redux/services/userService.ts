import axios from "axios"
import { useDispatch } from 'react-redux';
import { setTracks, setFilteredTracks } from '../../redux/features/Tracks/TracksSlice';

import { TracksResponse } from "../../types";

const dispatch = useDispatch();
// Unsolved errors when importing these functions.Tried:
// 1. declared functions differently
// 2. made default exports
// 
// TypeError: undefined is not an object (evaluating '_$$_REQUIRE(_dependencyMap[7], "../../redux/services/userService").savedTracks')
// Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons
export const savedTracks = async() => {
    console.debug("userService: GetSavedTracks called.")
    axios({
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

 export const addSavedTrack = async (trackId: string) => {
    console.debug("userService: AddSavedTrack called.")
    axios({
        method: 'post',
        url: `${process.env.BASE_URL}/user/savedTracks/${trackId}`
    })
    .catch(err => {
        console.log(err)
    })
}



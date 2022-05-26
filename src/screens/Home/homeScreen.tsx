import React from 'react';
import { View, Button, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../types';

import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setTracks } from '../../redux/features/Tracks/TracksSlice';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackCard from '../../Components/TrackCard';


export const HomeScreen = () => {
    const tracks = useAppSelector((state) => state.root.tracks.tracks)
    const token = useAppSelector((state) => state.root.authentication.accessToken)

    const dispatch = useDispatch();

    useEffect(() => {
        if (tracks.length == 0) {
            console.log("CALLED!!!!!!!!!!!!!!!")
            fetch("https://api.spotify.com/v1/me/tracks", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((res: types.TracksResponse) => {
                    dispatch(setTracks(res.items))
                    res.items.forEach((item) => {
                        console.log(item.track.name)
                    })
                })
        }
    }, [])

    return (
        <View>
            <Text>Hello</Text>
            <FlatList
                data={tracks}
                renderItem={({ item }) => (
                    <TrackCard track={item.track} />
                )}
            />
        </View>
    )
}
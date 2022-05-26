import React from 'react';
import { View, Button, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../types';

import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setTracks } from '../../redux/features/Tracks/TracksSlice';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackCard from '../../Components/TrackCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/navigationTypes';
import { setAccessToken, setRefreshToken } from '../../redux/features/authentication/authenticationSlice';
type homeProps = NativeStackScreenProps<RootStackParamList, "Home">

const HomeScreen: React.FC<homeProps> = ({ navigation }) => {
    const tracks = useAppSelector((state) => state.root.tracks.tracks)
    const token = useAppSelector((state) => state.root.authentication.accessToken)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect Called")
        fetch("https://api.spotify.com/v1/me/tracks", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then((res: types.TracksResponse) => {
                dispatch(setTracks(res.items))
            })
    }, [])

    const handleLogout = () => {
        dispatch(setAccessToken(undefined))
        dispatch(setRefreshToken(undefined))
        navigation.replace("Login")
    }

    return (
        <View>
            <Button title="Logout" onPress={handleLogout} />
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

export default HomeScreen
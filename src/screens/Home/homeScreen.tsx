import React from 'react';
import { useState } from 'react';
import { View, Button, Text, FlatList, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Track, TrackWrapper, TracksResponse } from '../../types'
import { globalStyles } from '../../styles/globalStyles';

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
    const [filteredList, setFilteredList] = useState(new Array<TrackWrapper>());
    const [term, setTerm] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("useEffect Called")
        console.log(`${process.env.BASE_URL}/user/savedTracks`)
        fetch(`${process.env.BASE_URL}/user/savedTracks`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then((res: TracksResponse) => {
                dispatch(setTracks(res.items))
                setFilteredList(res.items)
            })
    }, [])

    const handleLogout = () => {
        dispatch(setAccessToken(undefined))
        dispatch(setRefreshToken(undefined))
        navigation.replace("Login")
    }

    const filterHandler = (e: string) => {
        setTerm(e)
        const list: TrackWrapper[] = tracks.filter(wrapper => wrapper.track.name.toLowerCase().includes(e.toLowerCase()) || wrapper.track.artists[0].name.toLowerCase().includes(e.toLowerCase()))
        setFilteredList(list)
    }

    return (
        <View style={globalStyles.container}>
            <Button title="Logout" onPress={handleLogout} />
            <TextInput
                style={globalStyles.input}
                onChangeText={(e) => { filterHandler(e) }}
                value={term}
                placeholder="useless placeholder"
            />
            <FlatList
                data={filteredList}
                renderItem={({ item }) => (
                    <TrackCard track={item.track} />
                )}
            />
        </View>
    )
}

export default HomeScreen
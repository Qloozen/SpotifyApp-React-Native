import React from 'react';
import { useState } from 'react';
import { View, Button, Text, FlatList, TextInput, RefreshControl, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Track, TrackWrapper, TracksResponse } from '../../types'
import { globalStyles } from '../../styles/globalStyles';

import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setTracks, setFilteredTracks } from '../../redux/features/Tracks/TracksSlice';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackCard from '../../Components/TrackCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/navigationTypes';
import { setAccessToken, setRefreshToken } from '../../redux/features/authentication/authenticationSlice';
type homeProps = NativeStackScreenProps<RootStackParamList, "Home">

const HomeScreen: React.FC<homeProps> = ({ navigation }) => {
    const tracks = useAppSelector((state) => state.root.tracks.tracks)
    const filteredTracks = useAppSelector((state) => state.root.tracks.filteredTracks)
    const lastRemovedTrack = useAppSelector((state) => state.root.tracks.lastRemovedTrack)
    const token = useAppSelector((state) => state.root.authentication.accessToken)
    const [term, setTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);
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
                dispatch(setFilteredTracks(res.items))
            })
    }, [])

    const handleLogout = () => {
        dispatch(setAccessToken(undefined))
        dispatch(setRefreshToken(undefined))
        navigation.replace("Login")
    }

    const filterHandler = (e: string) => {
        //console.log(filteredTracks.length)
        setTerm(e)
        const list: TrackWrapper[] = tracks.filter(wrapper => wrapper.track.name.toLowerCase().includes(e.toLowerCase()) || wrapper.track.artists[0].name.toLowerCase().includes(e.toLowerCase()))
        dispatch(setFilteredTracks(list))
    }

    const onRefresh = () => {
        setRefreshing(true)

        fetch(`${process.env.BASE_URL}/user/savedTracks`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then((res: TracksResponse) => {
                dispatch(setTracks(res.items))
                dispatch(setFilteredTracks(res.items))
                setRefreshing(false)

            })
    }
    let removedTrackCard;
    // Last Removed track
    if (lastRemovedTrack) {
        removedTrackCard =
            <View style={{ flex: 1, marginBottom: 10, height: "20%", backgroundColor: "#212121" }}>
                <TrackCard track={lastRemovedTrack!} buttonText="restore" />
            </View>
    }


    return (
        <View style={globalStyles.container}>
            <View style={styles.header}>
                <Text style={globalStyles.headerText}>Saved Tracks</Text>
                <View>
                    <Button title="Logout" onPress={handleLogout} />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={globalStyles.input}
                    onChangeText={(e) => { filterHandler(e) }}
                    value={term}
                    placeholder="Search track..."
                />
            </View>

            <View style={{ flex: 4 }}>
                <FlatList
                    data={filteredTracks}
                    renderItem={({ item }) => (
                        <TrackCard track={item.track} buttonText="details" />
                    )}
                    ListHeaderComponent={
                        removedTrackCard
                    }
                    ListFooterComponent={
                        <View style={{ marginBottom: 70 }}>
                            <Text>This is the footer</Text>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        height: "15%"
    },
    inputContainer: {
        height: "12%"
    }
})

export default HomeScreen
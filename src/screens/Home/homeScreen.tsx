import React from 'react';
import { useState } from 'react';
import { View, Text, FlatList, TextInput, RefreshControl, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { TrackWrapper } from '../../types'
import { globalStyles } from '../../styles/globalStyles';
import { setFilteredTracks } from '../../redux/features/Tracks/TracksSlice';


import { useAppSelector } from '../../redux/hooks/hooks';
import { useEffect } from 'react';
import TrackCard from '../../Components/TrackCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/NavigationTypes';
import { setAccessToken, setRefreshToken } from '../../redux/features/authentication/authenticationSlice';
import SpotifyService from '../../redux/services/SpotifyService'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SearchInput from '../../Components/SearchInput';

type homeProps = NativeStackScreenProps<RootStackParamList, "Home">

const HomeScreen: React.FC<homeProps> = ({ navigation }) => {
    const savedTracks = useAppSelector((state) => state.root.tracks.savedTracks)
    const filteredTracks = useAppSelector((state) => state.root.tracks.filteredTracks)
    const lastRemovedTrack = useAppSelector((state) => state.root.tracks.lastRemovedTrack)
    const [term, setTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const service = SpotifyService

    useEffect(() => {
        service.getSavedTracks()
    }, [])

    const filterHandler = (e: string) => {
        setTerm(e)
        const list: SpotifyApi.SavedTrackObject[] = savedTracks.filter(wrapper => wrapper.track.name.toLowerCase().includes(e.toLowerCase()) || wrapper.track.artists[0].name.toLowerCase().includes(e.toLowerCase()))
        dispatch(setFilteredTracks(list))
    }

    const onRefresh = () => {
        setRefreshing(true)
        service.getSavedTracks()
            .then(() => {
                setRefreshing(false)
            })
    }

    // Last Removed track
    let removedTrackCard;
    if (lastRemovedTrack) {
        removedTrackCard =
            <View style={{ flex: 1, marginBottom: 10, height: "20%", backgroundColor: "#212121" }}>
                <TrackCard track={lastRemovedTrack!} buttonText="restore" />
            </View>
    }


    return (
        <View style={globalStyles.container}>
            
            <Text style={globalStyles.headerText}>Saved Tracks</Text>

            <SearchInput value={term} onChangeText={filterHandler} placeholder="Search in saved tracks"/>

            <View style={globalStyles.container}>
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

})

export default HomeScreen
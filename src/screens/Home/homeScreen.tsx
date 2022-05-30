import React from 'react';
import * as constants from '../../Constants/Constants';

//Nav
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/NavigationTypes';

//UI
import { View, Text, FlatList, RefreshControl, StyleSheet, Alert } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import TrackCard from '../../Components/TrackCard';
import SearchInput from '../../Components/SearchInput';
import Player from '../../Components/Player';

//Data
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks/hooks';
import { setCurrentTrack, setFilteredTracks, setIsPlayingFalse, setIsPlayingTrue } from '../../redux/features/Tracks/TracksSlice';
import SpotifyService from '../../redux/services/SpotifyService'


type homeProps = NativeStackScreenProps<RootStackParamList, "Home">
const HomeScreen: React.FC<homeProps> = ({ navigation }) => {
    const savedTracks = useAppSelector((state) => state.root.tracks.savedTracks)
    const filteredTracks = useAppSelector((state) => state.root.tracks.filteredTracks)
    const lastRemovedTrack = useAppSelector((state) => state.root.tracks.lastRemovedTrack)
    const [term, setTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        SpotifyService.getSavedTracks()
    }, [])

    const handleSearch = (e: string) => {
        setTerm(e)
        const list: SpotifyApi.SavedTrackObject[] = savedTracks.filter(item => {
            return item.track.name.toLowerCase().includes(e.toLowerCase()) 
                || item.track.artists[0].name.toLowerCase().includes(e.toLowerCase())
        })
        dispatch(setFilteredTracks(list))
    }

    const handleRefresh = () => {
        setRefreshing(true)
        SpotifyService.getSavedTracks()
            .then(() => {
                setRefreshing(false)
            })
    }
    const handlePlay = (track: SpotifyApi.TrackObjectFull) =>{
        SpotifyService.play(track).then(() => {
            dispatch(setCurrentTrack(track))
            dispatch(setIsPlayingTrue())
        }).catch(err => {
            if (err.message == "No playback device") {
                Alert.alert(
                    "Playback",
                    "There is no playback device active",
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      { text: "OK"}
                    ]
                  );
            }
        })
    }
    const handlePause = () => {
        SpotifyService.Pause().then(() => {
            dispatch(setIsPlayingFalse())
        })
    }

    // Last Removed track
    let removedTrackCard;
    if (lastRemovedTrack) {
        removedTrackCard =
            <View style={styles.removedTrack}>
                <TrackCard track={lastRemovedTrack} buttonText="restore" onPress={handlePlay}/>
            </View>
    }


    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Saved Tracks</Text>
            <SearchInput value={term} onChangeText={handleSearch} placeholder="Search in saved tracks"/>
            <View style={globalStyles.container}>
                <FlatList
                    data={filteredTracks}
                    renderItem={({ item }) => (
                        <TrackCard track={item.track} buttonText="details" onPress={handlePlay}/>
                    )}
                    ListHeaderComponent={
                        removedTrackCard
                    }
                    ListFooterComponent={
                        <View style={{ marginBottom: 70 }}>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            </View>
            <Player onPlay={handlePlay} onPause={handlePause}/>       	
        </View>
    )
}

const styles = StyleSheet.create({
    removedTrack: {
        flex: 1, 
        marginBottom: 10, 
        height: "20%", 
        backgroundColor: constants.DARK_GREY_BACKGROUND
    }
})

export default HomeScreen
import React from 'react';
import { useState } from 'react';
import { View, Text, FlatList, TextInput, RefreshControl, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { globalStyles } from '../../styles/globalStyles';
import { setCurrentTrack, setFilteredTracks, setIsPlayingFalse, setIsPlayingTrue } from '../../redux/features/Tracks/TracksSlice';


import { useAppSelector } from '../../redux/hooks/hooks';
import { useEffect } from 'react';
import TrackCard from '../../Components/TrackCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/NavigationTypes';
import SpotifyService from '../../redux/services/SpotifyService'
import SearchInput from '../../Components/SearchInput';
import Player from '../../Components/Player';

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
    const handlePlay = (track: SpotifyApi.TrackObjectFull) =>{
        service.play(track).then(() => {
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
        service.Pause().then(() => {
            dispatch(setIsPlayingFalse())
        })
    }

    // Last Removed track
    let removedTrackCard;
    if (lastRemovedTrack) {
        removedTrackCard =
            <View style={{ flex: 1, marginBottom: 10, height: "20%", backgroundColor: "#212121" }}>
                <TrackCard track={lastRemovedTrack!} buttonText="restore" onPress={handlePlay}/>
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
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>

            <Player onPlay={handlePlay} onPause={handlePause}/>
                    	
        </View>
    )
}

const styles = StyleSheet.create({

})

export default HomeScreen
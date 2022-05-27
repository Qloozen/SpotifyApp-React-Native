import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, ToastAndroid } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from "../styles/globalStyles";
import { Track, TracksResponse } from "../types";
import { setTracks, setFilteredTracks, setLastRemovedTrack } from '../redux/features/Tracks/TracksSlice';
import axios from "axios";

interface TrackCardProps {
    track: Track,
    setModalVisible: any
}

const TrackDetails: React.FC<TrackCardProps> = ({ track, setModalVisible }) => {
    const dispatch = useDispatch();

    const onRemoveHandler = () => {
        console.log("onRemoveHandler called")

        axios({
            method: 'delete',
            url: `${process.env.BASE_URL}/user/savedTracks/${track.id}`
        })
        .then(() => {
            return axios({
                method: 'get',
                url: `${process.env.BASE_URL}/user/savedTracks`
            })
        })
        .then(res => res.data)
        .then((res: TracksResponse) => {
            ToastAndroid.show('Track removed', ToastAndroid.SHORT);
            dispatch(setLastRemovedTrack(track));
            dispatch(setTracks(res.items))
            dispatch(setFilteredTracks(res.items))
            setModalVisible(false)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <View style={styles.card}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: track.album.images[0].url,
                }}
            />
            <Text style={[globalStyles.textWhite, styles.text]}>{track.name}</Text>
            <Text style={[globalStyles.textWhite, { textAlign: "center" }]}>{track.artists[0].name}</Text>

            <View style={styles.actions}>
                <Button title="remove" onPress={onRemoveHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        flex: 1,
        flexDirection: "column",
    },
    songContainer: {
        flexDirection: "row",
    },
    text: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
    actions: {
        marginTop: 50
    }
})

export default TrackDetails;
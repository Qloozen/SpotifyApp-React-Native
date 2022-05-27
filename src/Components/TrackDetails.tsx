import React from "react";
import { StyleSheet, Text, View, Image, Button, ToastAndroid } from "react-native";
import { useDispatch } from 'react-redux';
import { globalStyles } from "../styles/globalStyles";
import { Track } from "../types";
import { setLastRemovedTrack } from '../redux/features/Tracks/TracksSlice';
import userService from "../redux/services/userService";

interface TrackCardProps {
    track: Track,
    setModalVisible: any
}

const TrackDetails: React.FC<TrackCardProps> = ({ track, setModalVisible }) => {
    const dispatch = useDispatch();

    const onRemoveHandler = () => {
        console.log("onRemoveHandler called")
        userService.removeSavedTrack(track.id)
        .then(() => {
            return userService.getSavedTracks()
        })
        .then(() => {
            dispatch(setLastRemovedTrack(track));
            setModalVisible(false)
            ToastAndroid.show('Track removed', ToastAndroid.SHORT);
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
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Modal, ToastAndroid } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Track } from "../types";
import TrackDetails from "./TrackDetails";
import { useDispatch } from 'react-redux';
import { setLastRemovedTrack, } from "../redux/features/Tracks/TracksSlice";
import userService from "../redux/services/userService";



interface TrackCardProps {
    track: Track
    buttonText: string
}

const TrackCard: React.FC<TrackCardProps> = ({ track, buttonText }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const restore = buttonText == "restore";
    const dispatch = useDispatch();

    let cardButton;
    let headerText;
    if (restore) {
        cardButton = <Button title="restore" color={"green"} onPress={() => restoreHandler()} />
        headerText = <Text>Previously removed</Text>

    }
    if (buttonText == "details") cardButton = <Button title="details" onPress={() => setModalVisible(true)} />

    const restoreHandler = () => {
        console.log("onRestoreHandler called")
        userService.addSavedTrack(track.id)
        .then(() => {
            return userService.getSavedTracks()
        })
        .then(() => {
            dispatch(setLastRemovedTrack(null));
            ToastAndroid.show('Track restored', ToastAndroid.SHORT);
        })
    }

    return (
        <TouchableOpacity style={styles.card}>
            {headerText}
            <View style={styles.songContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: track.album.images[0].url,
                    }}
                />
                <View style={styles.content}>
                    <Text style={styles.text}>{track.name}</Text>
                    <Text style={styles.text}>{track.artists[0].name}</Text>
                </View>
                <View style={{ position: "absolute", right: 0 }}>
                    {cardButton}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={[globalStyles.container, styles.centeredView]}>
                    <View style={styles.modalView}>
                        <TrackDetails track={track} setModalVisible={setModalVisible} />
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                </View>
            </Modal>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        flex: 1,
        flexDirection: "column",
        borderBottomWidth: 1,
        justifyContent: "space-between",
    },
    songContainer: {
        flex: 1,
        flexDirection: "row",
    },
    text: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold"

    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    content: {
        marginLeft: 10
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    modalView: {
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        height: "100%"
    },
})

export default TrackCard;
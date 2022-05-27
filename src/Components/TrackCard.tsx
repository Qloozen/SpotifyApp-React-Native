import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Modal, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Track } from "../types";
import TrackDetails from "./TrackDetails";


interface TrackCardProps {
    track: Track
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <TouchableOpacity style={styles.card}>
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
            </View>
            <Button title="details" onPress={() => setModalVisible(true)} />

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
                        <TrackDetails track={track} />
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
        flexDirection: "row",
        borderBottomWidth: 1,
        justifyContent: "space-between"
    },
    songContainer: {
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
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Track } from "../types";

interface TrackCardProps {
    track: Track
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
    return (
        <TouchableOpacity style={styles.card}>
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
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1
    },
    text: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold"

    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    content: {
        marginLeft: 10
    }
})

export default TrackCard;
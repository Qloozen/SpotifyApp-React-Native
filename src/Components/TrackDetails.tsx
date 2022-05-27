import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Track } from "../types";

interface TrackCardProps {
    track: Track
}

const TrackDetails: React.FC<TrackCardProps> = ({ track }) => {
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
                <Text style={styles.text}>Remove</Text>
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
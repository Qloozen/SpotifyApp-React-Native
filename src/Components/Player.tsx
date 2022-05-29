import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from "react-native";
import { globalStyles } from "../styles/globalStyles"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useAppSelector } from "../redux/hooks/hooks";
import TextTicker from 'react-native-text-ticker'
import DropDownPicker from 'react-native-dropdown-picker';



interface PlayerProps {
    onPlay: any
    onPause: any
}

const Player: React.FC<PlayerProps> = ({onPlay, onPause}) => {
    const currentTrack = useAppSelector((state) => state.root.tracks.currentTrack)
    const currentDevice = useAppSelector((state) => state.root.authentication.currentDevice)
    const isPlaying = useAppSelector((state) => state.root.tracks.isPlaying)
    const display = currentTrack ? "flex" : "none"

    let icon;
    if(isPlaying) {
        icon = <Icon name="pause" size={32} color="white" onPress={() => {onPause()}}/>
    } else {
        icon = <Icon name="play-arrow" size={32} color="white" onPress={() => {onPlay(currentTrack)}}/>
    }


    return (
        <TouchableOpacity  style={[styles.container, {display: display}]}>
            <View style={styles.trackWrapper}>
                <Image source={{uri: currentTrack?.album.images[0].url}} style={styles.image}/>
                <View style={styles.titleWrapper}>
                    <TextTicker
                        style={[globalStyles.textWhite, {width: 150}]}
                        duration={3000}
                        scrollSpeed={2}
                        loop
                        animationType="scroll"
                        repeatSpacer={50}
                        >
                    {currentTrack?.name + " - " + currentTrack?.artists[0].name}
                    </TextTicker>
                    <View style={styles.currentDevice}>
                        <Icon name="speaker-group" size={15} color="#1DB954"/>
                        <Text>{currentDevice?.name}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.center}>
                {icon}
            </View>


        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
        alignSelf: "center"
    },
    trackWrapper: {
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "center",
    },
    titleWrapper: {
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 20
    },
    center: {
        justifyContent: "center",
    },
    container: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        width: "80%",
        height: "12%",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "grey",
        alignSelf: "center",
        borderRadius: 10,
    },
    currentDevice: {
        flexDirection: "row"
    },
})


export default Player;
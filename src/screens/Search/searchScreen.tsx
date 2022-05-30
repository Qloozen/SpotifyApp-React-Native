import React, { useState } from "react";
import * as constants from '../../Constants/Constants';

//UI
import { Text, View, Button, FlatList, StyleSheet} from "react-native";
import Player from "../../Components/Player";
import SearchInput from "../../Components/SearchInput";
import TrackCard from "../../Components/TrackCard";
import { globalStyles } from "../../styles/globalStyles";

//Data
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks/hooks";
import { setCurrentTrack, setIsPlayingFalse, setIsPlayingTrue } from "../../redux/features/Tracks/TracksSlice";
import { getService } from "../../redux/services/SpotifyService";

const SearchScreen: React.FC = () => {
    const [term, setTerm] = useState("");
    const tracks = useAppSelector((state) => state.root.tracks.tracks)
    const service = getService();
    const dispatch = useDispatch();

    const handleSearch = () => {
        service.searchTrack(term)
    }

    const handlePlay = (track: SpotifyApi.TrackObjectFull) =>{
        service.play(track).then(() => {
            dispatch(setCurrentTrack(track))
            dispatch(setIsPlayingTrue())
        })
    }
    const handlePause = () => {
        service.Pause().then(() => {
            dispatch(setIsPlayingFalse())
        })
    }
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Search new tracks</Text>
            <SearchInput value={term} onChangeText={setTerm} placeholder="Artists or tracks"/>
            <View style={styles.button}>
                <Button title="Search" onPress={handleSearch} color={constants.MAIN_COLOR} disabled={term.length < 1}/>
            </View>

            <FlatList
                data={tracks}
                renderItem={({ item }) => (
                    <TrackCard track={item} buttonText="add" onPress={handlePlay}/>
                )}
                ListFooterComponent={
                    <View style={{ marginBottom: 70 }}>
                    </View>
                }
            />

        <Player onPlay={handlePlay} onPause={handlePause}/>

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "30%",
        alignSelf: "center",
        marginVertical: 30
    }
})

export default SearchScreen
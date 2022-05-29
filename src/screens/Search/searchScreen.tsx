import React, { useState } from "react";
import { Text, View, TextInput, Button, FlatList, StyleSheet} from "react-native";
import SearchInput from "../../Components/SearchInput";
import TrackCard from "../../Components/TrackCard";
import { useAppSelector } from "../../redux/hooks/hooks";
import {getService} from "../../redux/services/SpotifyService";
import { globalStyles } from "../../styles/globalStyles";

const SearchScreen = () => {
    const [term, setTerm] = useState("");
    const tracks = useAppSelector((state) => state.root.tracks.tracks)
    const service = getService();
    const handleSearch = () => {
        service.searchTrack(term)
    }
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Search new tracks</Text>
            <SearchInput value={term} onChangeText={setTerm} placeholder="Artists or tracks"/>
            <View style={styles.button}>
                <Button title="Search" onPress={handleSearch} color="#1DB954" disabled={term.length < 1}/>
            </View>

            <FlatList
                data={tracks}
                renderItem={({ item }) => (
                    <TrackCard track={item} buttonText="add"/>
                )}
            />
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
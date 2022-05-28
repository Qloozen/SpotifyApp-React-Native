import React, { useState } from "react";
import { Text, View, TextInput, Button, FlatList} from "react-native";
import TrackCard from "../../Components/TrackCard";
import { useAppSelector } from "../../redux/hooks/hooks";
import userService from "../../redux/services/userService";
import { globalStyles } from "../../styles/globalStyles";

const SearchScreen = () => {
    const [term, setTerm] = useState("");
    const tracks = useAppSelector((state) => state.root.tracks.tracks)

    const handleSearch = () => {
        userService.searchTrack(term)
    }
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.textWhite}>This is the search page</Text>
            <TextInput value={term} onChangeText={(e) => {setTerm(e)}} style={globalStyles.input}/>
            <Button title="search" onPress={handleSearch}/>

            <FlatList
                data={tracks}
                renderItem={({ item }) => (
                    <TrackCard track={item} buttonText="add"/>
                )}
            />
        </View>
    )
}

export default SearchScreen
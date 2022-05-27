import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

const SearchScreen = () => {
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.textWhite}>This is the search page</Text>
        </View>
    )
}

export default SearchScreen
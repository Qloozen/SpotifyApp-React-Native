import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface searchInputProps {
    onChangeText: any
    value: string
    placeholder: string
}
const SearchInput: React.FC<searchInputProps> = ({onChangeText, value, placeholder}) => {
    return (
        <View style={styles.inputContainer}>
                <Icon name="search" size={30} color="black"/>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => { onChangeText(e) }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="lightgray"
                />
            </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        alignSelf: "center",
        width: "70%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: 'white',
        color: '#424242',
        borderRadius: 10
    },
})

export default SearchInput;
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#121212"
    },
    headerText: {
        marginVertical: 30,
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    textBlack: {
        color: "black"
    },
    textWhite: {
        color: "white"
    },
    input: {
        width: "70%",
        alignSelf: "center",
        borderWidth: 2,
        padding: 8,
        borderColor: "#969696",
        borderRadius: 10
    }
})
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles"
interface loginButtonProps {
    onPress: any,
    title: string
}

const LoginButton: React.FC<loginButtonProps> = ({ onPress, title }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={[globalStyles.textWhite, styles.text]}>{title}</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        borderWidth: 2,
        width: "75%",
        backgroundColor: "green",
        alignSelf: "center",
        borderRadius: 15
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    }
})


export default LoginButton;
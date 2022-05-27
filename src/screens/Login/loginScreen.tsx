import React, { useEffect } from 'react';
import { View, Button, Text, FlatList, StyleSheet } from 'react-native';
import authHandler from '../../utils/AuthenticationHandler';
import { RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../types';

import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setAccessToken, setRefreshToken } from '../../redux/features/authentication/authenticationSlice';
import { RootStackParamList } from '../../Navigation/navigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { globalStyles } from '../../styles/globalStyles';

import LoginButton from "../../Components/LoginButton"

type loginProps = NativeStackScreenProps<RootStackParamList, "Login">

const LoginScreen: React.FC<loginProps> = ({ navigation }) => {
    const token = useAppSelector((state) => state.root.authentication.accessToken)
    const dispatch = useDispatch();

    const onPressLogin = async () => {
        const authenticationObject = await authHandler.onLogin();
        dispatch(setAccessToken(authenticationObject?.accessToken))
        dispatch(setRefreshToken(authenticationObject?.refreshToken))
        if (authenticationObject?.accessToken != undefined) {
            navigation.replace("HomeStack")
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={[globalStyles.textWhite, styles.title]}>MySpotify</Text>
            <View style={styles.button}>
                <LoginButton title='Login to spotify' onPress={() => onPressLogin()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        position: "absolute",
        top: "50%",
        width: "100%"
    },
    title: {
        marginTop: 30,
        fontSize: 48,
        textAlign: "center"
    }
})

export default LoginScreen
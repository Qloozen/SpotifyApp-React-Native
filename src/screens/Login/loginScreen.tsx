import React, { useEffect } from 'react';
import { View, Button, Text, FlatList } from 'react-native';
import authHandler from '../../utils/AuthenticationHandler';
import { RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../types';

import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setAccessToken, setRefreshToken } from '../../redux/features/authentication/authenticationSlice';
import { RootStackParamList } from '../../Navigation/navigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type loginProps = NativeStackScreenProps<RootStackParamList, "Login">

export const LoginScreen: React.FC<loginProps> = ({ navigation }) => {
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
        <View>
            <Button title='Press to login' onPress={() => onPressLogin()} />
        </View>
    )
}
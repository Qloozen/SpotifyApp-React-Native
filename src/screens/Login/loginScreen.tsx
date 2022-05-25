import React from 'react';
import { View, Button, Text, FlatList } from 'react-native';
import authHandler from '../../utils/AuthenticationHandler';
import { RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../types';

import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { setAccessToken, setRefreshToken } from '../../redux/features/authentication/authenticationSlice';


export const LoginScreen = () => {
    const refreshToken = useAppSelector((state) => state.root.authentication.refreshToken)
    const token = useAppSelector((state) => state.root.authentication.accessToken)
    const dispatch = useDispatch();

    const onPressLogin = async () => {

        const authenticationObject = await authHandler.onLogin();
        dispatch(setAccessToken(authenticationObject?.accessToken))
        dispatch(setRefreshToken(authenticationObject?.refreshToken))
        console.log(authenticationObject?.accessToken)
        console.log(authenticationObject?.refreshToken)
    }

    const onSongs = async () => {
        fetch("https://api.spotify.com/v1/me/tracks", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then((res: types.TracksResponse) => {
                res.items.forEach((item) => {
                    console.log(item.track.name)
                })
            })
    }
    return (
        <View>
            <Button title='Press to login' onPress={() => onPressLogin()} />
        </View>
    )
}
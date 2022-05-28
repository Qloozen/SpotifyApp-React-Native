import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import { useAppSelector } from '../../redux/hooks/hooks';
import { RootStackParamList } from '../../Navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type splashProps = NativeStackScreenProps<RootStackParamList, "Splash">

export const SplashScreen: React.FC<splashProps> = ({ navigation }) => {
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setAnimating(false);
        AsyncStorage.getItem('persist:authentication').then((value) => {
            navigation.replace(JSON.parse(value || "{}").accessToken == undefined ? 'Login' : "HomeStack");
        });
    }, [])

    return (
        <View>
            <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
            />
        </View>
    )
}
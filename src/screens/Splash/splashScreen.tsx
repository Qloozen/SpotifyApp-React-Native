import React, { useEffect, useState } from 'react';

//Nav
import { RootStackParamList } from '../../Navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

//Data
import AsyncStorage from '@react-native-async-storage/async-storage';

//UI
import { View, ActivityIndicator, Text } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';


type splashProps = NativeStackScreenProps<RootStackParamList, "Splash">
const SplashScreen: React.FC<splashProps> = ({ navigation }) => {
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
            <Text style={globalStyles.textBlack}>Loading</Text>
        </View>
    )
}

export default SplashScreen
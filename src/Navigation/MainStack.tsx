import React from 'react';

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from './navigationTypes';

import LoginScreen from "../screens/Login/loginScreen";
import { HomeStack } from './HomeTab';
import { SplashScreen } from '../screens/Splash/splashScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="HomeStack" component={HomeStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
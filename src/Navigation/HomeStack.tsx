import React from 'react';

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from './navigationTypes';

import { LoginScreen } from "../screens/Login/loginScreen";
import { HomeScreen } from "../screens/Home/homeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const HomeStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
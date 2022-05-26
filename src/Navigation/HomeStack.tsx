import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from './navigationTypes';

import HomeScreen from "../screens/Home/homeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const HomeStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}
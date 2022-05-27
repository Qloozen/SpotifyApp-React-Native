import React from 'react';
//import Icon from 'react-native-vector-icons/MaterialIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './navigationTypes';
import { Text } from 'react-native';

import HomeScreen from "../screens/Home/homeScreen";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator<RootStackParamList>();
type homeStackProps = NativeStackScreenProps<RootStackParamList, "HomeStack">
type route = homeStackProps['route'];
export const HomeStack = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#121212',
                },
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: () => {
                    return <Text style={{ borderWidth: 2 }}>Home</Text>
                }
            }} />
        </Tab.Navigator>
    )
}
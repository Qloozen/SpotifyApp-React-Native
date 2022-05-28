import React from 'react';
//import Icon from 'react-native-vector-icons/MaterialIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './NavigationTypes';
import { Text } from 'react-native';

import HomeScreen from "../screens/Home/homeScreen";
import SearchScreen from '../screens/Search/searchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'
import UserScreen from "../screens/User/UserScreen";


const Tab = createBottomTabNavigator<RootStackParamList>();

export const HomeStack = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopWidth: 0
                },
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#636262"

            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="library-music" color={color} size={size}/>
                )
            }} />

            <Tab.Screen name="Search" component={SearchScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="search" color={color} size={size}/>
                )
            }} />

            <Tab.Screen name="User" component={UserScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <Icon name="person" color={color} size={size}/>
                )
            }} />
        </Tab.Navigator>
    )
}
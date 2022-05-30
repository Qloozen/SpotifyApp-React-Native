import React from 'react';

//Nav
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './NavigationTypes';

//Screens
import UserScreen from "../screens/User/UserScreen";
import HomeScreen from '../screens/Home/homeScreen';
import SearchScreen from '../screens/Search/searchScreen';

import MeterialIcon from 'react-native-vector-icons/MaterialIcons'
import * as constants from '../Constants/Constants'


const Tab = createBottomTabNavigator<RootStackParamList>();

export const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: constants.DARK_GREY_BACKGROUND,
                    borderTopWidth: 0
                },
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: constants.MAIN_COLOR,
                tabBarInactiveTintColor: "#636262"

            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <MeterialIcon name="library-music" color={color} size={size}/>
                )
            }} />

            <Tab.Screen name="Search" component={SearchScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <MeterialIcon name="search" color={color} size={size}/>
                )
            }} />

            <Tab.Screen name="User" component={UserScreen} options={{
                tabBarIcon: ({color, size}) => (
                    <MeterialIcon name="person" color={color} size={size}/>
                )
            }} />
        </Tab.Navigator>
    )
}
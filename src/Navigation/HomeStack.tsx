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
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 70
                }
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
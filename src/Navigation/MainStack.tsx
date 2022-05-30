import React from 'react';

//Nav
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from './NavigationTypes';

//Screens
import LoginScreen from "../screens/Login/LoginScreen";
import { MainTab } from './MainTab';
import SplashScreen from '../screens/Splash/splashScreen';

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
                <Stack.Screen name="HomeStack" component={MainTab} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
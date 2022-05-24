import React from 'react';
import { View, Button } from 'react-native';
import authHandler from '../../utils/AuthenticationHandler';

export const LoginScreen = () => {
    return (
        <View>
            <Button title='Press to login' onPress={() => authHandler.onLogin()} />
        </View>
    )
}
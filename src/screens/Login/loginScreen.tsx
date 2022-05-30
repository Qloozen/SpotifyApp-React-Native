import React from 'react';
import { RootStackParamList } from '../../Navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

//UI
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import LoginButton from "../../Components/LoginButton"

//Data
import { setAccessToken, setAccessTokenExpirationDate, setRefreshToken } from '../../redux/features/authentication/authenticationSlice';
import { useDispatch } from 'react-redux'; 
import authHandler from '../../utils/AuthenticationHandler';
import {getService} from '../../redux/services/SpotifyService';

type loginProps = NativeStackScreenProps<RootStackParamList, "Login">

const LoginScreen: React.FC<loginProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const service = getService();
    
    const handleLogin = () => {
        console.debug("LoginScreen: onPressLogin called")
        authHandler.onLogin()
            .then(res => {
                // Format = UTC +0 yyyy-MM-ddThh:mm:sssZ
                // Duration = + 1 hour
                const date = new Date(res!.accessTokenExpirationDate)
                date.setMinutes(date.getMinutes() -30)
                dispatch(setAccessToken(res?.accessToken))
                dispatch(setRefreshToken(res?.refreshToken))
                dispatch(setAccessTokenExpirationDate(date))
                
                if (!(res?.accessToken && res?.refreshToken && res?.accessTokenExpirationDate)) throw new Error("Login failed");

                return service.getMe()
            })
            .then(() => {
                return service.getDevices()
            })
            .then(() => {
                console.log("User logged in");
                navigation.replace("HomeStack");
            })
            .catch(err => {
                console.warn(err)
            })    
    }

    return (
        <View style={globalStyles.container}>
            <Text style={[globalStyles.textWhite, styles.title]}>MySpotify</Text>
            <View style={styles.button}>
                <LoginButton title='Login to spotify' onPress={() => handleLogin()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        position: "absolute",
        top: "50%",
        width: "100%"
    },
    title: {
        marginTop: 30,
        fontSize: 48,
        textAlign: "center"
    }
})

export default LoginScreen
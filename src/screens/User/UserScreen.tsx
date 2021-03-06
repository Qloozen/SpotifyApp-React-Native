import React from 'react';

//Nav
import { RootStackParamList } from '../../Navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

//UI
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons'
import { useAppSelector } from '../../redux/hooks/hooks';

//Data
import { useDispatch } from 'react-redux';
import { setAccessToken, setRefreshToken } from '../../redux/features/authentication/authenticationSlice';


type userProps = NativeStackScreenProps<RootStackParamList, "User">

const UserScreen: React.FC<userProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.root.authentication.user)

    
    let picture = <Icon name="person-circle-sharp" size={150} color="white" style={{alignSelf: 'center'}}/>;
    user?.display_name
    const imageUrl = user?.images ? user?.images[0].url : undefined

    if(imageUrl) {
        picture = <Image source={{uri: imageUrl}} style={styles.image}/>
    }

    const handleLogout = () => {
        dispatch(setAccessToken(undefined))
        dispatch(setRefreshToken(undefined))
        navigation.replace("Login")
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}>Profile</Text>
            {picture}
            <Text style={styles.name}>{user?.display_name}</Text>

            <View style={styles.button}>
                <Button title='Logout' onPress={handleLogout} color="#1DB954"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        width: "50%",
        alignSelf: "center"
    },
    image: {
        marginTop: 40,
        alignSelf: "center",
        height: 200,
        width: 200
    },
    name: {
        marginTop: 40,
        alignSelf: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    button: {
        position: 'absolute',
        width:"50%",
        alignSelf: "center",
        bottom: 40
    }
})

export default UserScreen;
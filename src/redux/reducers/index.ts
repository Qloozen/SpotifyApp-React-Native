import { combineReducers } from 'redux';

import authenticationSlice from '../features/authentication/authenticationSlice';
import TracksSlice from '../features/Tracks/TracksSlice';

import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authenticationConfig = {
    key: 'authentication',
    storage: AsyncStorage,
    blacklist: ['accessToken'],
};

const rootReducer = combineReducers({
    authentication: persistReducer(authenticationConfig, authenticationSlice),
    tracks: TracksSlice
});

export default rootReducer;
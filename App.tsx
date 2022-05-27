import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store/store';
import { MainStack } from './src/Navigation/MainStack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


axios.interceptors.request.use(
  async (req) => {
    const rawToken = await AsyncStorage.getItem('persist:authentication')
    const token: string = "bearer " + JSON.parse(rawToken || "{}").accessToken.replace('"', '')
    req.headers!.Authorization = token
    return req;
  }, (err) => {
    return Promise.reject(err);
  })

const App = () => {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;

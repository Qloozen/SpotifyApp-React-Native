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
import { useAppSelector } from './src/redux/hooks/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.interceptors.request.use(
  async (req) => {
    const rawToken = store.getState().root.authentication.accessToken
    if(rawToken) {
      const token: string = "bearer " + rawToken
      req.headers!.Authorization = token
      return req;
    }

    if(!rawToken) throw new Error("Token not found in storage");
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

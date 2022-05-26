import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store/store';

import { HomeStack } from './src/Navigation/HomeStack';
const App = () => {
  return (
    <Provider store={store}>
      <HomeStack />
    </Provider>
  );
};

export default App;

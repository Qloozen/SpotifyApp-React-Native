import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import { MainStack } from './src/Navigation/MainStack';
import axios from 'axios';

const App = () => {

  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;

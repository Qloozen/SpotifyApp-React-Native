import React from 'react';

// State
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import { MainStack } from './src/Navigation/MainStack';

const App = () => {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;

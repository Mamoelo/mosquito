import React from 'react';
import Routes from './Routes';
import Toast from 'react-native-toast-message'; 
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Routes />
      <Toast />
    </GestureHandlerRootView>
  );
};

export default App;

/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, View} from 'react-native';
import StackRoutes from './routes';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {MemoryProvider} from './hooks/useMemory';

const App = () => {
  return (
    <MemoryProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <View style={{flex: 1, backgroundColor: '#7159c1'}}>
          <StackRoutes />
          <Toast ref={ref => Toast.setRef(ref)} />
        </View>
      </NavigationContainer>
    </MemoryProvider>
  );
};

export default App;

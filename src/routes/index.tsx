import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/home';
import Play from '../pages/play';
import Rank from '../pages/rank';

const Stack = createStackNavigator();

const StackRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#7159c1'},
    }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Play" component={Play} />
    <Stack.Screen name="Rank" component={Rank} />
  </Stack.Navigator>
);

export default StackRoutes;

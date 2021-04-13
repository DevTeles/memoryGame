import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

const Home = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#7159c1',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Text>JOGO DA MEMÓRIA</Text>
    </SafeAreaView>
  );
};

export default Home;

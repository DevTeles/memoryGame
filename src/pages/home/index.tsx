import React from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/button';
import Input from '../../components/input';
import {Container, Title, Interrogation, GroupButton} from './styles';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <View>
            <Title>JOGO DA MEMÓRIA</Title>
            <Interrogation>😃</Interrogation>
          </View>
          <Input name="user" icon="user" placeholder="Nome do usuário" />

          <GroupButton>
            <Button onPress={() => navigation.navigate('Play')}>Jogar</Button>
            <Button onPress={() => navigation.navigate('Rank')}>Rank</Button>
          </GroupButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Home;

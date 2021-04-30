import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import Button from '../../components/button';
import Input from '../../components/input';
import {Container, Title, Image, GroupButton} from './styles';
import {useNavigation} from '@react-navigation/native';
import chavesbarril from '../../assets/chavesbarril.png';

import Toast from 'react-native-toast-message';

import {useMemory} from '../../hooks/useMemory';

const Home = () => {
  const navigation = useNavigation();
  const {user, addUser} = useMemory();

  function handlePlay() {
    if (!user || user.trim() === '') {
      Toast.show({
        type: 'info',
        text1: 'O usuário é obrigatório!',
        text2: '',
      });
      return;
    }

    addUser(user);
    navigation.navigate('Play');
  }

  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <View style={{marginBottom: 100}}>
              <Title>MEMÓRIA CHAVES</Title>
              <Image source={chavesbarril} />
            </View>

            <Input
              name="user"
              icon="user"
              placeholder="Nome do usuário"
              value={user}
              onChangeText={text => addUser(text)}
            />
            <GroupButton>
              <Button onPress={handlePlay}>Jogar</Button>
              <Button onPress={() => navigation.navigate('Rank')}>
                Classificação
              </Button>
            </GroupButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Home;

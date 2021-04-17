import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import Button from '../../components/button';
import Input from '../../components/input';
import {Container, Title, Image, GroupButton} from './styles';
import {useNavigation} from '@react-navigation/native';
import chavesbarril from '../../assets/chavesbarril.png';

import Toast from 'react-native-toast-message';

const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('');

  function handlePlay() {
    if (!user || user.trim() === '') {
      Toast.show({
        type: 'info',
        text1: 'O usuário é obrigatório!',
        text2: '',
      });
      return;
    }

    navigation.navigate('Play', {user});
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
              <Title>JOGO DA MEMÓRIA</Title>
              <Image source={chavesbarril} />
            </View>

            <Input
              name="user"
              icon="user"
              placeholder="Nome do usuário"
              value={user}
              onChangeText={text => setUser(text)}
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

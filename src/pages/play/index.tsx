/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Container,
  Title,
  Grid,
  Reset,
  Letter,
  Header,
  ProfileText,
  Profile,
} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Alert, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import letter from '../../assets/letter.png';
import chaves from '../../assets/chaves.jpeg';
import donaflorinda from '../../assets/donaflorinda.png';
import bruxa from '../../assets/bruxa.png';
import chiquinha from '../../assets/chiquinha.png';
import madruga from '../../assets/madruga.png';
import paty from '../../assets/paty.png';
import barriga from '../../assets/barriga.png';
import personagem from '../../assets/personagem.png';

import {letterProps} from './interface';

const Play = () => {
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [selected, setSelected] = useState<letterProps[]>([]);

  const [letters, setLetters] = useState<letterProps[]>(
    [
      {id: 1, name: 'chaves', icon: chaves, flip: false, isCorrect: false},
      {
        id: 2,
        name: 'donaflorinda',
        icon: donaflorinda,
        flip: false,
        isCorrect: false,
      },
      {
        id: 3,
        name: 'bruxa',
        icon: bruxa,
        flip: false,
        isCorrect: false,
      },
      {
        id: 4,
        name: 'chiquinha',
        icon: chiquinha,
        flip: false,
        isCorrect: false,
      },
      {id: 5, name: 'madruga', icon: madruga, flip: false, isCorrect: false},
      {id: 6, name: 'paty', icon: paty, flip: false, isCorrect: false},
      {
        id: 7,
        name: 'barriga',
        icon: barriga,
        flip: false,
        isCorrect: false,
      },
      {
        id: 8,
        name: 'personagem',
        icon: personagem,
        flip: false,
        isCorrect: false,
      },
      {id: 9, name: 'chaves', icon: chaves, flip: false, isCorrect: false},
      {
        id: 10,
        name: 'donaflorinda',
        icon: donaflorinda,
        flip: false,
        isCorrect: false,
      },
      {
        id: 11,
        name: 'bruxa',
        icon: bruxa,
        flip: false,
        isCorrect: false,
      },
      {
        id: 12,
        name: 'chiquinha',
        icon: chiquinha,
        flip: false,
        isCorrect: false,
      },
      {id: 13, name: 'madruga', icon: madruga, flip: false, isCorrect: false},
      {id: 14, name: 'paty', icon: paty, flip: false, isCorrect: false},
      {
        id: 15,
        name: 'barriga',
        icon: barriga,
        flip: false,
        isCorrect: false,
      },
      {
        id: 16,
        name: 'personagem',
        icon: personagem,
        flip: false,
        isCorrect: false,
      },
    ].sort(() => 0.5 - Math.random()),
  );
  const navigation = useNavigation();
  const {params} = useRoute();

  useEffect(() => {
    async function checkFinish() {
      let isFinish = true;

      letters.forEach(item => {
        if (!item.isCorrect) {
          isFinish = false;
        }
      });

      if (isFinish) {
        Alert.alert(
          `Parabéns ${params.user}`,
          `Você finalizou com ${rounds} rodadas!`,
        );

        const jsonValue = await AsyncStorage.getItem('@memorygame.user');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;

        const joinStorage = [...data, {user: params.user, rounds}];

        await AsyncStorage.setItem(
          '@memorygame.user',
          JSON.stringify(joinStorage),
        );
      }
    }

    checkFinish();
  }, [letters, params, rounds]);

  useEffect(() => {
    function checkRounds() {
      if (count === 2) {
        setRounds(rounds + 1);
        setCount(0);
      }
    }
    checkRounds();
  }, [count, rounds]);

  useEffect(() => {
    function checkMatchUpdate() {
      if (selected.length === 2 && selected[0].name === selected[1].name) {
        const updateLetter = [...letters];

        const letterIndex1 = updateLetter.findIndex(
          item => item.id === selected[0].id,
        );

        const letterIndex2 = updateLetter.findIndex(
          item => item.id === selected[1].id,
        );

        updateLetter[letterIndex1].isCorrect = true;
        updateLetter[letterIndex2].isCorrect = true;

        setLetters(updateLetter);
        setSelected([]);
      } else if (
        selected.length === 2 &&
        selected[0].name !== selected[1].name
      ) {
        const updateLetter = [...letters];

        const letterIndex1 = updateLetter.findIndex(
          item => item.id === selected[0].id,
        );

        const letterIndex2 = updateLetter.findIndex(
          item => item.id === selected[1].id,
        );

        updateLetter[letterIndex1].isCorrect = false;
        updateLetter[letterIndex2].isCorrect = false;

        setLetters(updateLetter);
        setSelected([]);
      }
    }

    checkMatchUpdate();
  }, [selected, letters]);

  function handleLetter(letterItem: letterProps) {
    const updateLetter = [...letters];

    const letterIndex = updateLetter.findIndex(
      item => item.id === letterItem.id,
    );
    updateLetter[letterIndex].isCorrect = !updateLetter[letterIndex].isCorrect;
    setLetters(updateLetter);
    setCount(count + 1);
    setSelected([...selected, letterItem]);
  }

  function handleReset() {
    const updateLetter = [...letters];

    updateLetter.map(item => {
      item.isCorrect = false;
      return item;
    });

    setLetters(updateLetter.sort(() => 0.5 - Math.random()));
    setCount(0);
    setRounds(0);
    setSelected([]);
  }

  return (
    <Container>
      <Header>
        <Icon
          name="arrow-left"
          size={22}
          color="#f2effd"
          style={{marginLeft: 20, marginTop: 5}}
          onPress={() => navigation.goBack()}
        />
        <Profile>
          <ProfileText>{params?.user}</ProfileText>
          <ProfileText>Rodadas: {rounds}</ProfileText>
        </Profile>
      </Header>
      <Title>COMEÇOU A DIVERSÃO</Title>

      <FlatList
        data={letters}
        numColumns={4}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Grid key={item.id}>
            <TouchableOpacity onPress={() => handleLetter(item)}>
              <Letter
                source={item.isCorrect ? item.icon : letter}
                style={{resizeMode: 'cover'}}
              />
            </TouchableOpacity>
          </Grid>
        )}
      />

      <Reset onPress={handleReset}>RESET</Reset>
    </Container>
  );
};

export default Play;

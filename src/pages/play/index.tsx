/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Alert, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useMemory, letterProps} from '../../hooks/useMemory';

const Play = () => {
  const [count, setCount] = useState(0);
  const [selecteds, setSelecteds] = useState<letterProps[]>([]);

  const navigation = useNavigation();
  const {user, letters, updateLetters, rounds, updateRounds} = useMemory();

  const handleReset = useCallback(() => {
    const updateLetter = [...letters];

    updateLetter.map(item => {
      item.isCorrect = false;
      return item;
    });

    updateLetters(updateLetter.sort(() => 0.5 - Math.random()));
    setCount(0);
    updateRounds(0);
    setSelecteds([]);
  }, [letters, updateLetters, updateRounds]);

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    function checkRounds() {
      if (count === 2) {
        updateRounds(rounds + 1);
        setCount(0);
      }
    }
    checkRounds();
  }, [count, rounds, updateRounds]);

  useEffect(() => {
    async function checkMatchUpdate() {
      if (selecteds.length === 2 && selecteds[0].name === selecteds[1].name) {
        const updateLetter = [...letters];

        const letterIndex1 = updateLetter.findIndex(
          item => item.id === selecteds[0].id,
        );

        const letterIndex2 = updateLetter.findIndex(
          item => item.id === selecteds[1].id,
        );

        setSelecteds([]);

        setTimeout(() => {
          updateLetter[letterIndex1].isCorrect = true;
          updateLetter[letterIndex2].isCorrect = true;
          updateLetters(updateLetter);
        }, 1000);
      } else if (
        selecteds.length === 2 &&
        selecteds[0].name !== selecteds[1].name
      ) {
        const updateLetter = [...letters];

        const letterIndex1 = updateLetter.findIndex(
          item => item.id === selecteds[0].id,
        );

        const letterIndex2 = updateLetter.findIndex(
          item => item.id === selecteds[1].id,
        );

        setSelecteds([]);
        setTimeout(() => {
          updateLetter[letterIndex1].isCorrect = false;
          updateLetter[letterIndex2].isCorrect = false;
          updateLetters(updateLetter);
        }, 1000);
      }
    }

    checkMatchUpdate();
  }, [selecteds, letters, updateLetters]);

  const repeatedLetter = useCallback(
    (letterItem: letterProps) => {
      if (selecteds.length === 0) {
        return false;
      }
      if (count === 1 && letterItem.id === selecteds[0].id) {
        return true;
      }

      return false;
    },
    [selecteds, count],
  );

  const checkFinish = useCallback(async () => {
    let isFinish = true;

    letters.forEach(item => {
      if (!item.isCorrect) {
        isFinish = false;
      }
    });

    if (isFinish) {
      const jsonValue = await AsyncStorage.getItem('@memorygame.user');
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;

      const id = new Date().getMilliseconds();

      const joinStorage = [
        ...(data ? data : []),
        {user, rounds: rounds + 1, id},
      ];

      await AsyncStorage.setItem(
        '@memorygame.user',
        JSON.stringify(joinStorage),
      );

      Alert.alert(
        `Parabéns ${user} 🚀`,
        `Você finalizou com ${rounds + 1} rodadas!`,
      );
    }
  }, [letters, rounds, user]);

  const handleLetter = useCallback(
    (letterItem: letterProps) => {
      if (repeatedLetter(letterItem)) {
        return;
      }

      const updateLetter = [...letters];
      const letterIndex = updateLetter.findIndex(
        item => item.id === letterItem.id,
      );
      updateLetter[letterIndex].isCorrect = !updateLetter[letterIndex]
        .isCorrect;
      setCount(count + 1);
      updateLetters(updateLetter);
      setSelecteds([...selecteds, letterItem]);
      checkFinish();
    },
    [updateLetters, count, letters, repeatedLetter, selecteds, checkFinish],
  );

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
          <ProfileText>{user}</ProfileText>
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
                source={item.isCorrect ? item.icon : item.letter}
                style={{resizeMode: 'cover'}}
              />
            </TouchableOpacity>
          </Grid>
        )}
      />

      <Reset onPress={handleReset}>REINICIAR</Reset>
    </Container>
  );
};

export default Play;

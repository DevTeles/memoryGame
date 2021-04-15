/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Container, Title, Grid, Reset, Letter} from './styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import letter from '../../assets/letter.png';
import {FlatList} from 'react-native';

const Play = () => {
  const navigation = useNavigation();

  const dados = [
    {id: 0, name: 'Relâmpago'},
    {id: 1, name: 'Agente'},
    {id: 2, name: 'Doc'},
    {id: 3, name: 'Cruz'},
  ];

  return (
    <Container>
      <Icon
        name="arrow-left"
        size={22}
        color="#f2effd"
        style={{marginLeft: 20}}
        onPress={() => navigation.goBack()}
      />
      <Title>COMEÇOU A DIVERSÃO</Title>

      <FlatList
        data={dados}
        numColumns={4}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Title>{item.name}</Title>}
      />

      <Grid>
        <Letter source={letter} />
        <Letter source={letter} />
        <Letter source={letter} />
        <Letter source={letter} />
        <Letter source={letter} />
        <Letter source={letter} />
        <Letter source={letter} />
        <Letter source={letter} />
        <Letter source={letter} />
      </Grid>

      <Reset onPress={() => {}}>RESET</Reset>
    </Container>
  );
};

export default Play;

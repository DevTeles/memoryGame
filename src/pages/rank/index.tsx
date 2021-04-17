/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Title,
  GroupTitles,
  Titles,
  Content,
  Ranking,
  ContainerRank,
} from './styles';

interface RankProps {
  rounds: number;
  user: string;
  id: string;
}

const Rank: React.FC = () => {
  const navigation = useNavigation();
  const [ranking, setRanking] = useState<RankProps[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const jsonValue = await AsyncStorage.getItem('@memorygame.user');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(data);
        if (data) {
          data.sort(function (a: any, b: any) {
            if (a.rounds > b.rounds) {
              return 1;
            }
            if (a.rounds < b.rounds) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

          setRanking(data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    load();
  }, []);

  return (
    <Container>
      <Icon
        name="arrow-left"
        size={22}
        color="#f2effd"
        style={{marginLeft: 20, marginTop: 5}}
        onPress={() => navigation.goBack()}
      />

      <Title>CLASSIFICAÇÃO</Title>

      <GroupTitles>
        <Titles>Usuário</Titles>
        <Titles>Rodadas</Titles>
      </GroupTitles>

      <ContainerRank>
        {ranking &&
          ranking.map(rank => (
            <Content key={rank.id}>
              <Ranking>{rank.user}</Ranking>
              <Ranking>{rank.rounds}</Ranking>
            </Content>
          ))}
      </ContainerRank>
    </Container>
  );
};

export default Rank;

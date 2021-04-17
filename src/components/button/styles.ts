import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 40%;
  margin: 5%;
  height: 60px;
  background: #7159c1;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #f2effd;
  border: 1px solid #fff;
  border-radius: 10px;
  padding-top: 11%;
`;

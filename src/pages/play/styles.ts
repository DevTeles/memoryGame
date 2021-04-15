import {ImageProps} from 'react-native';
import styled from 'styled-components/native';
import Button from '../../components/button';

export const Container = styled.View`
  flex: 1;
  background: #7159c1;
`;

export const Title = styled.Text`
  margin-top: 3%;
  color: #f2effd;
  font-size: 26px;
  font-weight: bold;
  width: 100%;
  text-align: center;
`;

export const Grid = styled.View``;

export const Letter = styled.Image<ImageProps>`
  width: 32px;
  height: 32px;
`;

export const Reset = styled(Button)`
  width: 90%;
  height: 95px;
`;

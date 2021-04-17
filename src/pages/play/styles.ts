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

export const Grid = styled.View`
  flex-wrap: wrap;
  flex: 1;
  border-radius: 10px;
`;

export const Letter = styled.Image`
  width: 80px;
  height: 80px;
  margin: 40px 30px 0 10px;
  border-radius: 10px;
`;

export const Reset = styled(Button)`
  width: 90%;
  height: 95px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: 15px;
`;

export const Profile = styled.View``;

export const ProfileText = styled.Text`
  color: #c4c4c4;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`;

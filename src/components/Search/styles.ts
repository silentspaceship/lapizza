import { TextInput } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;

  margin-top: -30px;
  padding: 0 24px;
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;

  background-color: ${({ theme }) => theme.COLORS.TITLE};
  border: 1px solid ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Input = styled(TextInput)`
  flex: 1;
  height: 52px;
  padding-left: 12px;

  font-family: ${({ theme }) => theme.FONTS.TEXT};
`;

export const ClearButton = styled.TouchableOpacity`
  margin-right: 8px;
`;

export const Button = styled(RectButton)`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;

  margin-left: 8px;

  border-radius: 18px;

  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
`;

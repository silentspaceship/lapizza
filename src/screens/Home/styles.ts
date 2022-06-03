import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { Button } from "../../components/Button";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingEmoji = styled.Image`
  height: 32px;
  width: 32px;
  margin-right: 12px;
`;

export const GreetingText = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};

  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 24px 24px 0;
  padding-bottom: 22px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const MenuItemsNumber = styled.Text`
  font-size: 14px;

  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const Title = styled.Text`
  font-size: 20px;
  line-height: 20px;

  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const NewProductButton = styled(Button)`
  margin: 0 24px;
  margin-bottom: ${getBottomSpace() + 12}px;
`;

export const Header = styled<any>(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${getStatusBarHeight() + 32}px 24px 58px;
`;
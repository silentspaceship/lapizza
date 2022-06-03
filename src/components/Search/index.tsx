import React from "react";
import { TextInputProps } from "react-native";

import { Feather } from "@expo/vector-icons";

import { Button, ClearButton, Container, Input, InputArea } from "./styles";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export function Search({ onSearch, onClear, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder="Pesquisar" {...rest} />

        <ClearButton onPress={onClear}>
          <Feather name="x" size={16} />
        </ClearButton>
      </InputArea>

      <Button onPress={onSearch}>
        <Feather name="search" size={16} color={theme.COLORS.SHAPE} />
      </Button>
    </Container>
  );
}

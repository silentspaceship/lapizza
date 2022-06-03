import React from "react";
import { ListViewBase, TextInputProps } from "react-native";

import { Container, Input, Label, Size } from "./styles";

type Props = TextInputProps & {
  size: string;
};

export function PriceInput({ size, ...rest }: Props) {
  return (
    <Container>
      <Size>
        <Label>{size}</Label>
      </Size>

      <Label>R$</Label>

      <Input keyboardType="numeric" {...rest} />
    </Container>
  );
}

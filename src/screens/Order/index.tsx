import React, { useState } from "react";
import { Platform } from "react-native";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { RadioButton } from "../../components/RadioButton";

import { PIZZA_TYPES } from "../../utils/pizzaTypes";

import {
  Container,
  ContentScroll,
  Form,
  FormRow,
  Header,
  InputGroup,
  Label,
  Photo,
  Price,
  Sizes,
  Title,
} from "./styles";

export function Order() {
  const [size, setSize] = useState("");

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <BackButton onPress={() => {}} style={{ marginBottom: 108 }} />
        </Header>
        <Photo source={{ uri: "" }} />

        <Form>
          <Title>Nome da Pizza</Title>
          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                key={item.id}
                title={item.name}
                onPress={() => setSize(item.id)}
                selected={size === item.id}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType="numeric" />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$0,00</Price>
          <Button title="Confirmar pedido" />
        </Form>
      </ContentScroll>
    </Container>
  );
}

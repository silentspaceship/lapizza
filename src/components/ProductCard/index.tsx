import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "styled-components/native";

import {
  Container,
  Content,
  Description,
  Details,
  Identification,
  Image,
  Line,
  Name,
} from "./styles";

export type ProductProps = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
};

type Props = RectButtonProps & {
  data: ProductProps;
};

export default function ProductCard({ data, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather
              name="chevron-right"
              size={18}
              color={theme.COLORS.SHAPE}
            />
          </Identification>
          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  );
}

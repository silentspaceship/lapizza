import React, { useEffect, useState } from "react";
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import { useRoute, useNavigation } from "@react-navigation/native";

import { ProductNavigationProps } from "../../@types/navigation";

import { BackButton } from "../../components/BackButton";
import { Photo } from "../../components/Photo";
import { PriceInput } from "../../components/PriceInput";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ProductProps } from "../../components/ProductCard";

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  InputGroup,
  Label,
  MaxCharacters,
  InputGroupHeader,
} from "./styles";

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

export function Product() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [photoPath, setPhotoPath] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params as ProductNavigationProps;

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert("Nome obrigatório", "Informe o nome da pizza.");
    }

    if (!description.trim()) {
      return Alert.alert(
        "Descrição obrigatória",
        "Informe a descrição da pizza."
      );
    }

    if (!image) {
      return Alert.alert(
        "Imagem obrigatória",
        "Selecione uma imagem para a pizza."
      );
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        "Os campos de preço não podem ficar vazios",
        "Informe todos os preços da pizza."
      );
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);

    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert(
          "Erro no cadastro",
          "Não foi possível concluir o cadastro."
        );
      });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDelete() {
    firestore()
      .collection("pizzas")
      .doc(id)
      .delete()
      .then(() => {
        storage()
          .ref(photoPath)
          .delete()
          .then(() => navigation.navigate("Home"));
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as PizzaResponse;

          setName(product.name);
          setImage(product.photo_url);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
          setPhotoPath(product.photo_path);
        });
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <BackButton onPress={handleGoBack} />

          <Title>Cadastrar</Title>

          {id ? (
            <TouchableOpacity onPress={handleDelete}>
              <DeleteLabel>Deletar</DeleteLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 20 }} />
          )}
        </Header>

        <Upload>
          <Photo uri={image} />
          {!id && (
            <PickImageButton
              title="Carregar"
              type="secondary"
              onPress={handleImagePicker}
            />
          )}
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descriçao</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <PriceInput
              size="P"
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <PriceInput
              size="M"
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <PriceInput
              size="G"
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InputGroup>

          {!id && (
            <Button
              title="Cadastrar Pizza"
              isLoading={isLoading}
              onPress={handleAdd}
            />
          )}
        </Form>
      </ScrollView>
    </Container>
  );
}

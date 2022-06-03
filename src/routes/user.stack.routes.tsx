import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { Product } from "../screens/Product";

const Stack = createNativeStackNavigator();

export function UserStackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Product" component={Product}></Stack.Screen>
    </Stack.Navigator>
  );
}

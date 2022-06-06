import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "../hooks/auth";

import { Home } from "../screens/Home";
import { Product } from "../screens/Product";
import { Order } from "../screens/Order";

import { UserTabRoutes } from "./user.tab.routes";

const Stack = createNativeStackNavigator();

export function UserStackRoutes() {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {user?.isAdmin ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Product" component={Product}></Stack.Screen>
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="UserTabRoutes" component={UserTabRoutes} />
          <Stack.Screen name="order" component={Order} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

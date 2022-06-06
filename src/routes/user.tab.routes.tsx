import React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { Orders } from "../screens/Orders";
import { NavigationContainer } from "@react-navigation/native";
import { BottomMenu } from "../components/BottomMenu";

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
          tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            paddingVertical: Platform.OS === "ios" ? 20 : 0,
          },
        }}
      >
        <Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <BottomMenu title="Cardápio" color={color} />
            ),
          }}
        />
        <Screen
          name="orders"
          component={Orders}
          options={{
            tabBarIcon: ({ color }) => (
              <BottomMenu title="Pedidos" color={color} notifications="3" />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

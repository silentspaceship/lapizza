import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import firestore from "@react-native-firebase/firestore";

import { Home } from "../screens/Home";
import { Orders } from "../screens/Orders";
import { NavigationContainer } from "@react-navigation/native";
import { BottomMenu } from "../components/BottomMenu";

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
  const [notifications, setNotifications] = useState("0");

  const theme = useTheme();

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("status", "==", "Pronto")
      .onSnapshot((querySnapshot) => {
        setNotifications(String(querySnapshot.docs.length));
      });

    return () => subscribe();
  }, []);

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
              <BottomMenu
                title="Pedidos"
                color={color}
                notifications={notifications}
              />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

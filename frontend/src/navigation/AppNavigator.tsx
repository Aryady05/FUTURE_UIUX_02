import React from "react";
import { Platform } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../context/AuthContext";
import { BookingsScreen } from "../screens/BookingsScreen";
import { ExploreScreen } from "../screens/ExploreScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SessionDetailsScreen } from "../screens/SessionDetailsScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { AppTabParamList, RootStackParamList } from "../types";
import { colors } from "../theme";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: "#829188",
        tabBarStyle: {
          height: Platform.OS === "ios" ? 84 : 72,
          paddingBottom: Platform.OS === "ios" ? 24 : 12,
          paddingTop: 10,
          backgroundColor: "rgba(255,255,255,0.94)",
          borderTopColor: colors.border
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof AppTabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: "home-outline",
            Explore: "search-outline",
            Bookings: "calendar-outline",
            Profile: "person-outline"
          };

          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          primary: colors.primary,
          card: colors.white,
          border: colors.border,
          text: colors.text
        }
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade"
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        ) : (
          <>
            <Stack.Screen name="AppTabs" component={TabsNavigator} />
            <Stack.Screen
              name="SessionDetails"
              component={SessionDetailsScreen}
              options={{
                headerShown: true,
                title: "Session Details",
                headerTransparent: true,
                headerTintColor: colors.primaryDark,
                headerShadowVisible: false,
                headerBackTitle: "Back",
                headerTitleStyle: {
                  color: colors.primaryDark,
                  fontWeight: "600"
                },
                headerStyle: {
                  backgroundColor: "transparent"
                },
                headerBackButtonDisplayMode: "minimal"
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState } from "react";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CreateAd from "./screens/CreateAd";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Account from "./screens/Account";
import firebase from "./fbconfig";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNav = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

const TabNav = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "CreateAd") {
          iconName = "add-circle";
        } else {
          iconName = "person";
        }
        return <Ionicons name={iconName} size={30} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "#6200ee",
      showLabel: false,
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="CreateAd" component={CreateAd} />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser();
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? <TabNav /> : <StackNav />}
    </NavigationContainer>
  );
}

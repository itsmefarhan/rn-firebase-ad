import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CreateAd from "./screens/CreateAd";
import Home from "./screens/Home";
import Account from "./screens/Account";
import firebase from "./fbconfig";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

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

  const registerForPushNotificationsAsync = async (uid) => {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        //   alert("Failed to get push token for push notification!");
        console.log("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      // alert("Must use physical device for Push Notifications");
      console.log("Must use physical device for Push Notifications");
    }

    if (token) {
      const res = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .set({ token }, { merge: true });
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        registerForPushNotificationsAsync(user.uid);
      } else {
        setUser();
      }
    });

    return () => unsub();
  }, []);

  return (
    <NavigationContainer>
      {user ? <TabNav /> : <StackNav />}
    </NavigationContainer>
  );
}

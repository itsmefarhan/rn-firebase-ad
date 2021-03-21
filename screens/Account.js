import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import firebase from "../fbconfig";

const Account = () => {
  return (
    <View>
      <Text>Account</Text>
      <Button onPress={() => firebase.auth().signOut()}>Logout</Button>
    </View>
  );
};

export default Account;

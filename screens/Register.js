import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import firebase from "../fbconfig";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const registerUser = async () => {
    setError(null);

    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      await firebase.firestore().collection("users").doc(result.user.uid).set({
        email: result.user.email,
        id: result.user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <View style={styles.imgView}>
        <Image
          source={require("../assets/olx.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Create an account</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          label="Email"
          autoCapitalize="none"
          value={email}
          mode="outlined"
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          label="Password"
          value={password}
          mode="outlined"
          onChangeText={(e) => setPassword(e)}
        />
      </View>
      {error ? (
        <Text style={{ marginVertical: 10, color: "red" }}>{error}</Text>
      ) : null}
      <Button mode="contained" onPress={registerUser}>
        Register
      </Button>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Already a user?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "blue" }}> Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  imgView: {
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.5,
  },
  inputView: {
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
});

export default Register;

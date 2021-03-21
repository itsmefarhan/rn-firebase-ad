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

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <Button mode="contained">Register</Button>
      <View
        style={{
          marginTop: 20,
          flexDirection:'row',
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>
          Already a user?          
        </Text>
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

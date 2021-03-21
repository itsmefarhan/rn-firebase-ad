import React, { useState } from "react";
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState();
  const [price, setPrice] = useState();
  const [contact, setContact] = useState("");

  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Create Ad</Text>
        <TextInput
          style={styles.input}
          label="Title"
          value={title}
          onChangeText={(e) => setTitle(e)}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          label="Description"
          value={desc}
          multiline={true}
          numberOfLines={3}
          onChangeText={(e) => setDesc(e)}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          label="Purchase Year"
          value={year}
          onChangeText={(e) => setYear(e)}
          mode="outlined"
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          label="Price"
          value={price}
          onChangeText={(e) => setPrice(e)}
          mode="outlined"
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          label="Contact Info"
          value={contact}
          onChangeText={(e) => setContact(e)}
          mode="outlined"
        />
        <Button mode="contained" icon="camera" style={styles.input}>
          Upload Image
        </Button>
        <Button mode="contained" style={styles.input}>
          Create Ad
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.5,
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
  },
});

export default CreateAd;

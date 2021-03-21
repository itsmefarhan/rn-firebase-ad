import React, { useState } from "react";
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import firebase from "../fbconfig";
import * as ImagePicker from "expo-image-picker";

const CreateAd = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState();
  const [price, setPrice] = useState();
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const response = await fetch(result.uri);
        const blob = await response.blob();
        setImg(blob);
      }
    }
  };

  const uploadImage = async () => {
    try {
      const uploadTask = await firebase
        .storage()
        .ref()
        .child(`images/${new Date()}`)
        .put(img);
      const url = await uploadTask.ref.getDownloadURL();
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const createAd = async () => {
    const userId = firebase.auth().currentUser.uid;
    setLoading(true);
    const imgUrl = await uploadImage();
    try {
      await firebase.firestore().collection("ads").add({
        uid: userId,
        title,
        desc,
        year,
        price,
        contact,
        image: imgUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setLoading(false);
      setTitle("");
      setDesc("");
      setYear("");
      setPrice("");
      setContact("");
      setImg("");
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
          keyboardType="number-pad"
        />
        <Button
          mode="contained"
          icon="camera"
          style={styles.input}
          onPress={pickImage}
        >
          Upload Image
        </Button>
        <Button
          mode="contained"
          style={styles.input}
          onPress={createAd}
          icon={loading && "loading"}
          disabled={loading}
        >
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

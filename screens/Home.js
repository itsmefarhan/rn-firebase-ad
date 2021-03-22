import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { TextInput } from "react-native-paper";
import Card from "../components/Card";
import firebase from "../fbconfig";

const Home = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const searchQuery = items?.filter((item) =>
    item.title.toLowerCase().includes(text.toLowerCase())
  );

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("ads")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setItems(data);
      });
    return () => unsub();
  }, []);

  return (
    <View>
      <TextInput
        style={{ marginVertical: 30, paddingHorizontal: 10 }}
        label="Search"
        autoCapitalize="none"
        mode="outlined"
        value={text}
        onChangeText={(e) => setText(e)}
      />
      <FlatList
        data={searchQuery}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Card item={item} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
};

export default Home;

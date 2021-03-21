import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import Card from "../components/Card";
import firebase from "../fbconfig";

const Home = () => {
  const [items, setItems] = useState([]);

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
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
};

export default Home;

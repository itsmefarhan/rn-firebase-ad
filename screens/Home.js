import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Platform, Linking } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import firebase from "../fbconfig";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("ads").orderBy('createdAt', 'desc')
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

  const handleDial = (contact) => {
    if(Platform.OS === 'android') {
      Linking.openURL(`tel:${contact}`)
    } else {
      Linking.openURL(`telprompt:${contact}`)
    }
  }

  const renderItem = (item) => (
    <Card style={styles.container}>
      <Card.Title title={item.title} />
      <Card.Content>
        <Paragraph>{item.desc}</Paragraph>
        <Paragraph>{item.year}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Actions>
        <Button>{item.price}</Button>
        <Button onPress={() => handleDial(item.contact)}>Call Seller</Button>
      </Card.Actions>
    </Card>
  );
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    elevation: 5,
  },
});

export default Home;

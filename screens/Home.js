import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const Home = () => {
  const items = [
    {
      id: 1,
      title: "Ad 1",
      desc: "Ad One desc",
      year: 2000,
      price: 20,
      image:
        "https://images.unsplash.com/photo-1510872893374-80379d91fc92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      contact: "03212019264",
    },
    {
      id: 2,
      title: "Ad 2",
      desc: "Ad Two desc",
      year: 2010,
      price: 100,
      image:
        "https://images.unsplash.com/photo-1510872893374-80379d91fc92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      contact: "03212019264",
    },
  ];

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
        <Button>Call Seller</Button>
      </Card.Actions>
    </Card>
  );
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
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

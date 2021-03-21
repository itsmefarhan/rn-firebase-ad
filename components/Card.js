import React from "react";
import { Button, Card, Paragraph } from "react-native-paper";
import { StyleSheet, Platform, Linking } from "react-native";

const AdCard = ({ item }) => {
  const handleDial = (contact) => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${contact}`);
    } else {
      Linking.openURL(`telprompt:${contact}`);
    }
  };
  return (
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
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    elevation: 5,
  },
});

export default AdCard;

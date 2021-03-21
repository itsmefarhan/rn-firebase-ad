import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { Button } from "react-native-paper";
import firebase from "../fbconfig";
import Card from "../components/Card";

const Account = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("ads")
      .where("uid", "==", firebase.auth().currentUser.uid)
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
    <SafeAreaView>
      <View>
        <Text style={{ textAlign: "center" }}>
          Welcome{" "}
          <Text style={{ fontWeight: "bold" }}>
            {firebase.auth().currentUser.email}
          </Text>
        </Text>
        <Button onPress={() => firebase.auth().signOut()}>Logout</Button>
      </View>
      <View>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          Your Ads
        </Text>

        <FlatList
          data={items}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <Card item={item} />}
          contentContainerStyle={{ paddingBottom: 250 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Account;

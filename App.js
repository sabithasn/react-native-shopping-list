// React Native Mobile Shopping List app
// Mark Allen - 2020

import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import ItemAdd from "./components/itemAdd";
import ListItem from "./components/listItem";
import ClearButton from "./components/clearButton";
import AddButton from "./components/addButton";
import InfoButton from "./components/infoButton";
import ClearAllButton from "./components/clearAllButton";
import InfoModal from "./components/infoModal";

export default function App() {
  const [listItems, setListItems] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const addItemHandler = itemTitle => {
    setListItems(currentItems => [
      ...currentItems,
      { id: new Date().getTime().toString(), value: itemTitle }
    ]);
  };
  const removeItemHandler = itemId => {
    setListItems(currentItems => {
      return currentItems.filter(item => item.id !== itemId);
    });
  };
  const clearItemsHandler = () => {
    setListItems(currentItems => []);
  };
  const infoModalHandler = () => {
    setShowInfo(currentShowInfo => !currentShowInfo)
  }

  return (
    <View style={styles.screen}>
      <View style={styles.controls}>
        <AddButton />
        <InfoButton onPress={infoModalHandler} />
        <ClearAllButton />
      </View>
      <InfoModal visible={showInfo} onClose={infoModalHandler} />
      <ItemAdd onAddItem={addItemHandler} />
      <ClearButton onClearItems={clearItemsHandler} />
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.itemlist}>
        <FlatList
          data={listItems}
          renderItem={itemData => (
            <ListItem
              id={itemData.item.id}
              title={itemData.item.value}
              onDelete={removeItemHandler}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:1,
    padding: 30,
    backgroundColor: "#dcdde1"
  },
  itemlist: {
    marginVertical: 20
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "#2f3640"
  },
  instructions: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#777"
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

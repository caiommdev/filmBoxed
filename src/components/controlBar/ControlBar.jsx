import React from "react";
import { View, StyleSheet } from "react-native";
import ColourPalet from "../../AppColours/ColourPalete";

export default function ControlBar(props) {
  return (
    <View style={styles.bar}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 10,
    margin: 20,
    borderRadius: 50,
    height: "5vh",
    width: "70%",
    backgroundColor: ColourPalet.secondary,
    color: ColourPalet.dim,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 5,
  },
});

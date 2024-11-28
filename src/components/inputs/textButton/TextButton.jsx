import colors from "../../../AppColours/ColourPalete";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function TextButton(props) {
    const [hover, setHover] = React.useState(false)
    const [click, setClick] = React.useState(false)

  return (
    <TouchableOpacity
      onPressIn={() => setClick(true)}
      onPressOut={() => setClick(false)}
      onPress={props.onClick}
      style={ButtonStyle(props.highlight, props.primary, hover, click)}
    >
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const ButtonStyle = (highlight, primary, hover, click) => {
  var text = primary ? colors.text : colors.textSecondary;

  return {
    height: 17,
    width: 17,
    textAlign: 'center',
    padding: click ? 6 : 4,
    borderWidth: click ? 2 : 4,
    borderColor: click ? text : 'transparent',
    borderRadius: 50,
    color: highlight ? colors.highlight : text,
    backgroundColor: hover ? colors.dim : 'transparent',
    transitionDuration: '200ms'
  };
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

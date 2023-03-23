import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type buttonProps = {
  name: string,
  style?: {},
  textStyle?: {},
  onClick: () => void,
}

export default function Button({ name, style, textStyle, onClick }: buttonProps) {

  return (
    <TouchableOpacity style={[styles.defaultButton, style]} onPress={onClick}>
      <Text style={[textStyle]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultButton: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
  }
})

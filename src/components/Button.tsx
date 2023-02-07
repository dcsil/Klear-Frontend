import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type buttonProps = {
  name: string,
  style?: {},
  onClick: ()=>void,
}

export default function Button({name, style, onClick }: buttonProps) {

  return (
    <TouchableOpacity style={[styles.defaultButton, style]} onPress={onClick}>
      <Text>{name}</Text>
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

import React from "react"
import { Text, StyleSheet, TouchableOpacity, type ViewStyle, type TextStyle } from "react-native"

interface buttonProps {
  name: string
  style?: ViewStyle[] | ViewStyle
  textStyle?: TextStyle
  onClick: () => void
}

export default function Button({ name, style, textStyle, onClick }: buttonProps) {
  return (
    <TouchableOpacity style={[styles.defaultButton, style]} onPress={onClick}>
      <Text style={[textStyle]}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  defaultButton: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
  }
})

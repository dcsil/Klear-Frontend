import React from "react"
import { Text, StyleSheet, TouchableOpacity, type ViewStyle, View, Image } from "react-native"
import ClockIcon from '../assets/ClockIcon.svg'

interface buttonProps {
  label: string
  imageUri?: string
  time?: string
  style?: ViewStyle | ViewStyle[]
  onClick: () => void
}

export default function InfoRow({ label, imageUri, time, style, onClick }: buttonProps) {
  return (
    <TouchableOpacity style={[styles.defaultRowStyle, style]} onPress={onClick}>
      <View style={styles.infoContainer}>
        {imageUri && <Image style={styles.image} source={require("../assets/tempStudentImg.png")} />}
        <Text style={styles.label}>{label}</Text>
        {time && <View style={styles.time}><ClockIcon /><Text>  {time}</Text></View>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  defaultRowStyle: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  image: {
    borderRadius: 2,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#cecfca",
    marginLeft: 10,
    flex: 1,
    paddingLeft: 5,
    paddingVertical: 4,
    minHeight: 40,
  },
  label: {
    fontWeight: "bold",
    marginLeft: 5,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  }
})

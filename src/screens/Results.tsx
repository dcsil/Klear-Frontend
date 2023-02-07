import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { helloWorld } from "../apis/SampleCalls";
import Button from "../components/Button";
import s from "../css/GlobalStyles"

export default function Results() {
  const nav = useNavigation<any>()
  const [response, setResponse] = useState<string>();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={[s.flex1, s.centerContentX, s.centerContentY]}>
        <Text>Empty template for some other string</Text>
        <Button name="Back" onClick={()=>{nav.navigate("Main")}} style={styles.backButtonStyle}/>
        <Button name="Ping BE" onClick={async ()=>{setResponse(await helloWorld())}} style={styles.backButtonStyle}/>
        <Text>{response}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  backButtonStyle: {
    backgroundColor: "#fad291",
    width: 120,
    marginTop: 50
  }
 });

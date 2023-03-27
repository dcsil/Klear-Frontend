import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../assets/klear_logo.png')} style={styles.logoSize} />
        <Text style={[s.bold, { marginTop: 30 }]}>Welcome to Klear</Text>
        <Text>Much more to come, much more to see</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoSize: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    marginTop: 80,
  },
})

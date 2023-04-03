import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigatorTab from '../components/Navigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
  const nav = useNavigation<any>()
  const logout = () => {
    AsyncStorage.setItem('accessToken', '')
    nav.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable style={styles.logout} onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
      <View style={styles.container}>
        <Image source={require('../assets/klear_logo.png')} style={styles.logoSize} />
        <Text style={[s.bold, { marginTop: 30 }]}>Welcome to Klear</Text>
        <Text>Much more to come, much more to see</Text>
      </View>
      <NavigatorTab />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  logout: {
    alignSelf: 'flex-end',
    marginRight: 20,
    padding: 6,
    backgroundColor: '#f7d3af'
  },
  container: {
    alignItems: 'center',
  },
  logoSize: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    marginTop: 80,
  },
})

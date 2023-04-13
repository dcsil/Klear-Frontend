import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import ProfilePic from '../assets/ProfilePic.svg'
import RightArrow from '../assets/RightArrow.svg'
import { login } from '../apis/Auth'
import Button from '../components/Button'
import s from '../css/GlobalStyles'

export default function Login() {
  const nav = useNavigation<any>()
  const demoUser = { email: "karen.smith@gmail.com", pw: "pw" }

  const handleDemoLogin = async () => {
    const res = await login(demoUser.email, demoUser.pw)
    if (res == "success") nav.navigate("Home")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../assets/klear_logo.png')} accessibilityLabel='Klear Logo' style={styles.logo} />
        <Text style={styles.header}>Sign back in</Text>
        <Text style={styles.header2}>Choose from accounts saved in this device</Text>
        <View style={styles.accounts}>
          <Pressable onPress={handleDemoLogin} style={styles.accountDetails}>
            <ProfilePic />
            <View style={styles.namePassword}>
              <Text style={styles.account1}>Karen Smith</Text>
              <Text style={{ color: '#AFAFAF' }}>{demoUser.email}</Text>
            </View>
            <RightArrow />
          </Pressable>
        </View>
        <Button
          name="LOG IN WITH ANOTHER ACCOUNT"
          style={styles.otherAccount}
          textStyle={[s.bold, s.themeColor, { opacity: 0.8 }]}
          onClick={() => { nav.navigate('NewLogin') }}
        />
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
  header: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 22
  },
  header2: {
    marginTop: 20,
    fontSize: 15,
    color: '#777777'
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'stretch',
    marginTop: 60,
  },
  accounts: {
    marginTop: 30,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#CDCDCD',
  },
  accountDetails: {
    marginLeft: 15,
    marginRight: 7,
    flexDirection: 'row',
    alignItems: 'center'
  },
  namePassword: {
    marginLeft: 8,
    marginRight: 12,
  },
  account1: {
    fontWeight: 'bold',
  },
  otherAccount: {
    position: 'absolute',
    bottom: 40,
    borderColor: '#CDCDCD',
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 13,
  },
})

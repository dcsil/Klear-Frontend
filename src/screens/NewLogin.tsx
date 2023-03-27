import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { login } from '../apis/Auth'

export default function NewLogin() {
  const nav = useNavigation<any>()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>()
  const handleLogin = async (email: string, password: string) => {
    const res = await login(email, password)
    if (res == "success") return nav.navigate("Home")
    setError(res)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Enter your detail</Text>
        <View style={styles.credentials}>
          <TextInput placeholder='Email' style={styles.textInput} onChangeText={t => { setEmail(t); setError("") }} />
          <View style={styles.line} />
          <TextInput placeholder='Password' style={styles.textInput} onChangeText={t => { setPassword(t); setError("") }} />
        </View>
        <Text style={styles.errorText}>{error}</Text>
        <Button name="SIGN IN" onClick={() => { handleLogin(email, password) }}
          style={[styles.loginButtonStyle, s.themeBgColor]} textStyle={styles.loginButtonText} />
        <Button name="Sign Up Instead" onClick={() => { nav.navigate('Signup') }}
          style={styles.signupButtonStyle} textStyle={s.themeColor} />
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
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 22
  },
  credentials: {
    backgroundColor: '#E5E5E5',
    borderRadius: 15,
    borderColor: '#B2B2B2',
    borderWidth: 2,
    marginTop: 20,
  },
  textInput: {
    margin: 10,
  },
  line: {
    height: 2,
    backgroundColor: '#B2B2B2',
  },
  errorText: {
    color: 'red',
  },
  loginButtonStyle: {
    borderWidth: 0,
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
  },
  signupButtonStyle: {
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 15,
    padding: 15,
  },
  loginButtonText: {
    color: "white",
  },
})

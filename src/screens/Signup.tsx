import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import s from '../css/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { signup } from '../apis/Auth';

export default function Signup() {
  const nav = useNavigation<any>()
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [errors, setErrors] = useState<string>();

  const submitForm = async () => {
    if (!firstName) {
      return setErrors("Please enter your first name")
    }
    if (!lastName) {
      return setErrors("Please enter your last name")
    }
    if (!email) {
      return setErrors("Please enter an email")
    }
    if (password != confirmPassword) {
      return setErrors("Passwords do not match")
    }
    if (!password) {
      return setErrors("Invalid Password")
    }
    const response = await signup(firstName, lastName, email, password)
    if (response == "success") nav.navigate("Home")
    setErrors(response)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign up</Text>
        <View style={styles.credentials}>
          {/* TODO: make this a component and reuse in Login screen */}
          <TextInput placeholder='First Name' style={styles.textInput} onChangeText={t => { setFirstName(t); setErrors("") }} />
          <View style={styles.line} />
          <TextInput placeholder='Last Name' style={styles.textInput} onChangeText={t => { setLastName(t); setErrors("") }} />
          <View style={styles.line} />
          <TextInput placeholder='Email' style={styles.textInput} onChangeText={t => { setEmail(t); setErrors("") }} />
          <View style={styles.line} />
          <TextInput placeholder='Password' style={styles.textInput} onChangeText={t => { setPassword(t); setErrors("") }} />
          <View style={styles.line} />
          <TextInput placeholder='Confirm Password' style={styles.textInput} onChangeText={t => { setConfirmPassword(t); setErrors("") }} />
        </View>
        <Text style={styles.errorText}>{errors}</Text>
        <Button name="SIGN UP" onClick={submitForm}
          style={[styles.loginButtonStyle, s.themeBgColor]} textStyle={styles.loginButtonText} />
        <Button name="Have an account? Login" onClick={() => { nav.navigate('Login') }}
          style={styles.signupButtonStyle} textStyle={s.themeColor} />
      </View>
    </SafeAreaView>
  );
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
    marginBottom: 30,
    color: 'red',
  },
  loginButtonStyle: {
    borderWidth: 0,
    borderRadius: 15,
    padding: 15,
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
});

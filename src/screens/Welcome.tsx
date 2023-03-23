import { StyleSheet, Text, View, Image } from 'react-native';
import s from '../css/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const nav = useNavigation<any>()

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../assets/klear_logo.png')} style={styles.logo} />
        <Text style={styles.slogan}>Take better care of your children.</Text>
        <View style={styles.buttons}>
          <Button name="GET STARTED" onClick={() => { nav.navigate('Signup') }}
            style={[styles.loginButtonStyle, s.themeBgColor]} textStyle={styles.loginButtonText} />
          <Button name="I ALREADY HAVE AN ACCOUNT" onClick={() => { nav.navigate('Login') }}
            style={styles.signupButtonStyle} textStyle={s.themeColor} />
        </View>
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
    alignItems: 'center',
  },
  slogan: {
    marginTop: 30,
    color: '#777777',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    marginTop: 60,
  },
  buttons: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  loginButtonStyle: {
    borderWidth: 0,
    borderRadius: 15,
    width: 300,
    padding: 15,
  },
  signupButtonStyle: {
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 15,
    width: 300,
    padding: 15,
  },
  loginButtonText: {
    color: "white",
  },
});

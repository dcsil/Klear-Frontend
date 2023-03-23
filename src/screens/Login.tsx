import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AddIcon from '../assets/AddIcon.svg'
import ProfilePic from '../assets/ProfilePic.svg'
import { login } from '../apis/Auth';


export default function Login() {
  const nav = useNavigation<any>()
  const demoUser = { email: "irvan@danmateo.com", pw: "pw" }

  const handleDemoLogin = async () => {
    if (await login(demoUser.email, demoUser.pw)) nav.navigate("Home")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../assets/klear_logo.png')} style={styles.logo} />
        <Text style={styles.header}>Sign back in</Text>
        <Text style={styles.header2}>Choose from accounts saved in this device</Text>
        <View style={styles.accounts}>
          <Pressable onPress={handleDemoLogin}>
            <View style={styles.accountDetails}>
              <ProfilePic />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.account1}>Irvan Danmateo</Text>
                <Text style={{ color: '#AFAFAF' }}>{demoUser.email}</Text>
              </View>
            </View>
          </Pressable>
          <View style={styles.line} />
          <Pressable onPress={() => nav.navigate('NewLogin')}>
            <View style={styles.accountDetails}>
              <AddIcon width={35} />
              <Text style={styles.otherAccount}>Use another account</Text>
            </View>
          </Pressable>
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
    borderColor: '#CDCDCD'
  },
  line: {
    height: 2,
    backgroundColor: '#CDCDCD',
    marginVertical: 10,
  },
  accountDetails: {
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  account1: {
    fontWeight: 'bold',
  },
  otherAccount: {
    color: '#AFAFAF',
    fontWeight: 'bold',
    marginLeft: 10,
    margintop: 30,
    alignSelf: 'center',
  }
});

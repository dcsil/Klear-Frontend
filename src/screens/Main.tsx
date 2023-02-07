import { StyleSheet, Text, View, Image } from 'react-native';
import s from '../css/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function Main(navigation: any) {
  const nav = useNavigation<any>()

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../assets/klear_logo.png')} style={styles.logoSize}/>
        <View style={[]}>
          <Text style={[s.bold]}>Welcome to Klear</Text>
          <Text>Much more to come, much more to see</Text>
        </View>
        <Button name="Switch page" onClick={()=>{nav.navigate('OtherScreen')}} style={styles.buttonStyle} />
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
    justifyContent: "space-around",
    alignItems: 'center',
  },
  logoSize: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
  buttonStyle: {
    backgroundColor: "orange",
    
  }
});

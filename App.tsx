import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import * as Sentry from 'sentry-expo';
import { SENTRY_DSN } from '@env'
import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId);
import NewLogin from './src/screens/NewLogin';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });
}

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NewLogin" component={NewLogin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

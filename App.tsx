import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from './src/screens/Welcome'
import Login from './src/screens/Login'
import * as Sentry from 'sentry-expo'
import { SENTRY_DSN } from '@env'
import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
import NewLogin from './src/screens/NewLogin'
import Signup from './src/screens/Signup'
import Home from './src/screens/Home'
import Students from './src/screens/Students'
import StudentInfo from './src/screens/StudentInfo'
import PastIncidents from './src/screens/PastIncidents';
import IncidentInfo from './src/screens/IncidentInfo'
import { store } from './src/store/StoreConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

if (Device.isDevice && Platform.OS == "android") {
  OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId)
  AsyncStorage.setItem('oneSignal', 'supported')
} else {
  AsyncStorage.setItem('oneSignal', '')
}

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  })
}

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="NewLogin" component={NewLogin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Students" component={Students} />
          <Stack.Screen name="StudentInfo" component={StudentInfo} />
          <Stack.Screen name="Past Incidents" component={PastIncidents} />
          <Stack.Screen name="IncidentInfo" component={IncidentInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

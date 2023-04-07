import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, RefreshControl } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigatorTab from '../components/Navigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getAllIncidents, resolveIncident } from '../apis/Incidents'
import { type Incident } from '../store/IncidentTypes'
import { translateTime } from '../helpers/convertDates'
import CheckIcon from '../assets/CheckIcon.svg'
import CrossIcon from '../assets/CrossIcon.svg'
import ClockIcon from '../assets/ClockIcon.svg'
import ExitIcon from '../assets/ExitIcon.svg'
import IncidentPicture from '../components/IncidentPicture'

export default function Home() {
  const nav = useNavigation<any>()
  const [refreshing, setRefreshing] = useState(false)
  const [showExplainer, setShowExplainer] = useState(false)
  const [incidents, setIncidents] = useState<Incident[]>()

  const logout = () => {
    AsyncStorage.setItem('accessToken', '')
    nav.navigate('Login')
  }

  const viewedIncident = (incidentId: number, status: number) => {
    resolveIncident(incidentId, status).then(() => {
      fetchLatestIncidents()
    })
  }

  const fetchLatestIncidents = () => {
    setRefreshing(true)
    getAllIncidents(1).then(res => { setIncidents(res) })
    setRefreshing(false)
  }

  useFocusEffect(useCallback(() => {
    fetchLatestIncidents()
  }, []))

  useEffect(() => {
    AsyncStorage.getItem('closedExplainer').then(res => {
      if (!res) setShowExplainer(true)
    })
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[s.row]}>
          <Text style={styles.title}>Welcome</Text>
          <Pressable style={styles.logout} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
        <Text style={styles.title2}>Active Incidents</Text>
        <ScrollView style={styles.incidentScroll}
          refreshControl={<RefreshControl
            onRefresh={fetchLatestIncidents}
            refreshing={refreshing}
          />}
        >
          {incidents?.map((incident: Incident) => {
            return (<View key={incident.incident_id} style={s.row}>
              <View style={styles.circle} />
              <View style={styles.activeIncident}>
                <Pressable onPress={() => nav.navigate("IncidentInfo", { incidentId: incident.incident_id })}>
                  <View style={s.row}>
                    <View>
                      <Text style={styles.incidentName}>{incident.event}</Text>
                      <View style={[s.row, s.centerContentX]}>
                        <ClockIcon />
                        <Text style={styles.incidentDate}>{translateTime(incident.date)}</Text>
                      </View>
                    </View>
                    <IncidentPicture image={incident.screenshot} style={styles.image} />
                  </View>
                </Pressable>
                <View style={styles.decisionWrapper}>
                  <Pressable
                    style={[s.row, s.centerContentX]}
                    onPress={() => { viewedIncident(incident.incident_id, 1) }}
                  >
                    <CheckIcon /><Text style={s.bold}>Acknowledge</Text>
                  </Pressable>
                  <Pressable
                    style={[s.row, s.centerContentX]}
                    onPress={() => { viewedIncident(incident.incident_id, 0) }}
                  >
                    <CrossIcon /><Text style={s.bold}>Dismiss</Text>
                  </Pressable>
                </View>
              </View>
            </View>)
          })}
          {incidents && showExplainer && <View style={styles.explainer}>
            <Text style={styles.explainerText}>Acknowledge means this is an actual
              incident to be resolved. Dismiss means this is not an actual incident.
            </Text>
            <Pressable style={styles.closeExplainer} testID='closedExplainer'
              onPress={() => {
                AsyncStorage.setItem('closedExplainer', "true")
                setShowExplainer(false)
              }}>
              <ExitIcon fill='white' height={13} />
            </Pressable>
          </View>}
        </ScrollView>
      </View>
      <NavigatorTab />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  logout: {
    backgroundColor: '#FCAB41',
    marginLeft: 'auto',
    justifyContent: 'center',
    marginVertical: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    opacity: 0.9,
  },
  logoutText: {
    fontSize: 12,
  },
  container: {
    paddingHorizontal: 20,
  },
  incidentScroll: {
    minHeight: 500
  },
  image: {
    width: 130,
    height: 80,
    resizeMode: 'stretch',
    marginLeft: 'auto'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  title2: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  activeIncident: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: '#cecfca',
    borderRadius: 15,
    marginVertical: 10,
  },
  incidentName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  incidentDate: {
    maxWidth: 90,
    marginLeft: 5,
  },
  decisionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    alignSelf: 'center',
    marginRight: 5,
    backgroundColor: 'orange'
  },
  explainer: {
    backgroundColor: '#FCAB41',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  explainerText: {
    color: 'white',
    flexShrink: 1
  },
  closeExplainer: {
    padding: 10,
    paddingRight: 6,
  }
})

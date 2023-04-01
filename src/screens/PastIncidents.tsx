import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import InfoRow from '../components/InfoRow'
import SearchIcon from '../assets/SearchIcon.svg'
import { useNavigation } from '@react-navigation/native'
import { getAllPastIncidents } from '../apis/Incidents'
import CheckIcon from '../assets/CheckIcon.svg'
import CrossIcon from '../assets/CrossIcon.svg'
import { translateTime } from '../helpers/convertDates'
import NavigatorTab from '../components/Navigator'
import { type Incident } from '../store/IncidentTypes'

export default function PastIncidents() {
  const nav = useNavigation<any>()
  const [incidents, setIncidents] = useState<Incident[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPastIncidents()
      setIncidents(data ?? [])
    }
    try {
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }, [])

  const [filter, setFilter] = useState<string>("")

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <View style={[s.row, { justifyContent: 'space-between' }]}>
                <Text style={s.title}>Incidents</Text>
                <View>
                    <View style={styles.legend}><CheckIcon/><Text> Acknowledged</Text></View>
                    <View style={styles.legend}><CrossIcon/><Text> Dismissed</Text></View>
                </View>
            </View>
            <View style={[s.row, { justifyContent: 'space-between' }]}>
                <View style={styles.filter}>
                    <SearchIcon />
                    <TextInput style={styles.placeHolder} placeholderTextColor='black' placeholder={'Search '} onChangeText={setFilter} />
                </View>
                <View style={[styles.filter]}>
                    <TextInput style={styles.placeHolder} placeholderTextColor='black' placeholder={'Sort By: Most Recent'} />
                </View>
            </View>
            <ScrollView style={{ paddingRight: 10 }}>
                {incidents?.map((incident: Incident) => {
                  return <View key={incident.incident_id} style={s.row}>
                        {incident.status
                          ? <CheckIcon style={styles.icon} />
                          : <CrossIcon style={styles.icon} />}
                        <InfoRow
                            label={incident.event}
                            time={translateTime(incident.date)}
                            onClick={() => { nav.navigate("IncidentInfo", { incidentId: incident.incident_id }) }}
                        />
                    </View>
                })}
            </ScrollView>
        </View>
        <NavigatorTab />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    marginTop: 1,
    paddingHorizontal: 20,
  },
  filter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cecfca',
    paddingVertical: 4,
    paddingLeft: 5,
    marginRight: 10,
  },
  placeHolder: {
    marginLeft: 1,
    paddingRight: 10,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  }
})

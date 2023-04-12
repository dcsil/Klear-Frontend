import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigatorTab from '../components/Navigator'
import { useRoute, useNavigation } from '@react-navigation/native'
import { getIncident } from '../apis/Incidents'
import ExitIcon from '../assets/ExitIcon.svg'
import ClockIcon from '../assets/ClockIcon.svg'
import CheckIcon from '../assets/CheckIcon.svg'
import CrossIcon from '../assets/CrossIcon.svg'
import PersonIcon from '../assets/PersonIcon.svg'
import { translateTime } from '../helpers/convertDates'
import { type Incident } from '../store/IncidentTypes'
import { type Student } from '../store/StudentTypes'
import IncidentPicture from '../components/IncidentPicture'

export default function IncidentInfo() {
  const route = useRoute<any>()
  const nav = useNavigation<any>()
  const [response, setResponse] = useState<Incident>()

  const fetchIncident = async () => {
    const { incidentId } = route.params
    const incident = await getIncident(incidentId)
    setResponse(incident)
  }

  useEffect(() => {
    fetchIncident()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={s.row}>
          <Text style={styles.title}>{response?.event}</Text>
          <Pressable onPress={() => { nav.goBack() }} style={styles.exitIcon}>
            <ExitIcon height={20} fill='black'
            />
          </Pressable>
        </View>
        <View>
          <IncidentPicture image={response?.screenshot} type={'incidents'} style={styles.picture} />
        </View>
        <View>
          {response?.date &&
            <View style={styles.time}>
              <PersonIcon /><Text> Related Student(s): {
                response?.students?.map((student: Student) => {
                  return `${student?.first_name} ${student?.last_name}`
                })
              } </Text>
            </View>}
        </View>
        <View>
          {response?.date &&
            <View style={styles.time}>
              <ClockIcon /><Text> Detected at {translateTime(response.date)}</Text>
            </View>}
        </View>
        {response?.status != null &&
          <View>
            {response?.status
              ? <View style={styles.time}>
                <CheckIcon /><Text> Acknowledged by {`${response?.first_name} ${response?.last_name}`}</Text>
              </View>
              : <View style={styles.time}>
                <CrossIcon /><Text> Dimissed by {`${response?.first_name} ${response?.last_name}`}</Text>
              </View>
            }
          </View>
        }
      </ScrollView>
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
    marginTop: 10,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  exitIcon: {
    position: 'absolute',
    right: 0,
    padding: 5,
  },
  picture: {
    width: '100%',
    height: 410,
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 20
  },
  time: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
    alignItems: 'center'
  }
})

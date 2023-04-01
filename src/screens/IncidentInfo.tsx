import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigatorTab from '../components/Navigator'
import { useRoute, useNavigation } from '@react-navigation/native'
import { getIncident } from '../apis/Incidents'
import { domain } from '../apis/Headers'
import ExitIcon from '../assets/ExitIcon.svg'
import ClockIcon from '../assets/ClockIcon.svg'
import CheckIcon from '../assets/CheckIcon.svg'
import CrossIcon from '../assets/CrossIcon.svg'
import PersonIcon from '../assets/PersonIcon.svg'
import { translateTime } from '../helpers/convertDates'

interface Incident {
  incidentId?: number
  status?: number
  event?: string
  date?: string
  screenshot?: string
  students?: [Student]
}

interface Student {
  first_name: string
  last_name: string
}

const getPicture = (picture: string | undefined) => {
  if (picture) {
    return <Image
        style={styles.picture}
        source={{ uri: `${domain}/images/${picture}` }}
        />
  } else {
    return <Image source={require('../assets/klear_logo.png')} style={styles.picture} />
  }
}

export default function IncidentInfo() {
  const route = useRoute<any>()
  const nav = useNavigation<any>()
  const [response, setResponse] = useState<Incident>({})
  useEffect(() => {
    const fetchIncident = async () => {
      const { incidentId } = route.params
      //   const incident = { incidentId: 2, event: "Bite", date: "2023-03-16 11:38:17", status: 1 }

      const incident = await getIncident(incidentId)
      setResponse(incident)
    }
    try {
      fetchIncident()
    } catch (e) {
      fetchIncident()
    }
  }, [])

  console.log(response, "response")
  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
            <View style={[s.row]}>
            <Text style={styles.title}>{response.event}</Text>
            <ExitIcon style={{
              position: 'absolute',
              right: 5,
              top: 5,
            }}
            onPress={ () => { nav.navigate("Past Incidents") }}
            />
            </View>
            <View>
                {getPicture(response.screenshot)}
                {/* <Image
                style={styles.picture}
                source={{ uri: `http:${DOMAIN}/images/${response.screenshot}` }}
                /> */}
            </View>
            <View>
                {response.date &&
                <View style={styles.time}>
                    <PersonIcon /><Text> Related Student(s): {
                        response.students?.map((student: Student) => {
                          return `${student?.first_name} ${student?.last_name}`
                        })
                        } </Text>
                    </View>}
            </View>
            <View>
                {response.date &&
                <View style={styles.time}>
                    <ClockIcon /><Text> Detected at {translateTime(response.date)}</Text>
                    </View>}
            </View>
            <View>
                {response.status
                  ? <View style={styles.time}>
                    <CheckIcon /><Text> Acknowledged </Text>
                    </View>
                  : <View style={styles.time}>
                    <CrossIcon /><Text> Dimissed </Text>
                    </View>
                    }
            </View>
            <View>
                <Text style={styles.report}>Report an issue</Text>
            </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    textAlign: 'center',
    alignContent: 'center'
  },
  picture: {
    width: 310,
    height: 450,
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 20
  },
  time: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10
  },
  report: {
    alignSelf: 'center',
    color: '#AFAFAF',
    marginTop: 40
  }
})

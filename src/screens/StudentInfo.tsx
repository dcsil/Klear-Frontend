import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, Pressable, RefreshControl } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigatorTab from '../components/Navigator'
import InfoRow from '../components/InfoRow'
import { useRoute } from '@react-navigation/native'
import { getStudentHistory } from '../apis/Students'
import { type Student, type StudentIncident } from '../store/StudentTypes'

export default function StudentInfo() {
  const route = useRoute<any>()
  const studentInfo = route.params.studentInfo as Student
  const [incidents, setIncidents] = useState<StudentIncident[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchStudentHistory = async () => {
    setRefreshing(true)
    setIncidents(await getStudentHistory(studentInfo.student_id) ?? [])
    setRefreshing(false)
  }

  useEffect(() => {
    fetchStudentHistory()
  }, [])

  const [selectedCategory, setSelectedCategory] = useState('Daily')
  const checkSelected = (category: string) => {
    return category == selectedCategory ? 'bold' : 'normal'
  }
  const circleColour = (type: string) => {
    return type == 'activity' ? { backgroundColor: 'orange' } : { backgroundColor: '#FE5151' }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.studentName}>{`${studentInfo.first_name} ${studentInfo.last_name}`}</Text>
        <Image style={styles.studentImage} source={require("../assets/tempStudentImg.png")} />
        <View style={[s.row, styles.categories]}>
          <Pressable onPress={() => { setSelectedCategory('Info') }}>
            <Text style={[styles.category, { fontWeight: checkSelected('Info') }]}>Info  </Text>
          </Pressable>
          <Pressable onPress={() => { setSelectedCategory('Incidents') }}>
            <Text style={[styles.category, { fontWeight: checkSelected('Incidents') }]}>Past Incidents</Text>
          </Pressable>
          <Pressable onPress={() => { setSelectedCategory('Daily') }}>
            <Text style={[styles.category, { fontWeight: checkSelected('Daily') }]}>Daily Logs</Text>
          </Pressable>
        </View>
        <View style={styles.divider} />
        <ScrollView
          style={{ paddingRight: 10 }}
          refreshControl={<RefreshControl
            onRefresh={fetchStudentHistory}
            refreshing={refreshing}
          />}
        >
          {
            selectedCategory == 'Info' && (
              <View>
                <Text style={styles.studentInfo}>{`Name: ${studentInfo.first_name} ${studentInfo.last_name}`}</Text>
                <Text style={styles.studentInfo}>Age: {studentInfo.age}</Text>
                <Text style={styles.studentInfo}>Contact Name: {studentInfo.contact_name}</Text>
                <Text style={styles.studentInfo}>Contact Number: {studentInfo.contact_number}</Text>
              </View>
            )
          }
          {selectedCategory != 'Info' && incidents.map((incident: StudentIncident, index: number) => {
            if (selectedCategory == 'Incidents' && incident.type == 'activity') return null
            return <View key={index} style={s.row}>
              <View style={[styles.circle, circleColour(incident.type)]} />
              <InfoRow
                label={incident.event}
                time="11:42pm"
                onClick={() => { }}
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
  categories: {
    justifyContent: 'space-between',
  },
  category: {
    fontWeight: 'normal',
    fontSize: 15,
    paddingTop: 3,
    paddingBottom: 4,
    paddingHorizontal: 23,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20
  },
  studentImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginVertical: 10,
  },
  divider: {
    height: 3,
    left: -30,
    backgroundColor: 'grey',
    width: '150%',
  },
  circle: {
    backgroundColor: 'orange',
    width: 20,
    height: 20,
    borderRadius: 15,
    alignSelf: 'center',
  },
  studentInfo: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  }
})

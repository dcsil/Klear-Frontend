import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigatorTab from '../components/Navigator'
import InfoRow from '../components/InfoRow'
import { useRoute } from '@react-navigation/native'

export default function StudentInfo() {
  const route = useRoute<any>()
  const [response, setResponse] = useState<unknown[]>([])
  useEffect(() => {
    const info = [{ incidentId: 1, action: "Play", time: "16:01pm", type: 'activity' },
    /* eslint-disable @typescript-eslint/indent */
    { incidentId: 2, action: "Bite", time: "12:01am", type: 'incident' },
    { incidentId: 3, action: "Sprint", time: "2:05pm", type: 'incident' }
    ]
    for (let i = 4; i < 18; i++) {
      info.push({ incidentId: i, action: `activity ${i}`, time: "16:01pm", type: 'activity' },)
    }
    setResponse(info)
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
        <Text style={styles.studentName}>{route.params.studentName}</Text>
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
        <ScrollView style={{ paddingRight: 10 }}>
          {
            selectedCategory == 'Info' && (
              <View>
                <Text style={styles.studentInfo}>Name: Rainy Min</Text>
                <Text style={styles.studentInfo}>Age: 5</Text>
                <Text style={styles.studentInfo}>Parents: </Text>
                <Text style={styles.studentInfo}>{`Parent's Contact`}:</Text>
              </View>
            )
          }
          {selectedCategory != 'Info' && response.map((student: any) => {
            if (selectedCategory == 'Incidents' && student.type == 'activity') return null
            return <View key={student.incidentId} style={s.row}>
              <View style={[styles.circle, circleColour(student.type)]} />
              <InfoRow
                label={student.action}
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
    color: 'grey',
  }
})

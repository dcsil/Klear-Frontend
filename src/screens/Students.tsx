import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigatorTab from '../components/Navigator'
import InfoRow from '../components/InfoRow'
import SearchIcon from '../assets/SearchIcon.svg'
import { useNavigation } from '@react-navigation/native'

export default function Students() {
  const nav = useNavigation<any>()
  const [response, setResponse] = useState<unknown[]>([])
  useEffect(() => {
    const students = [{ id: 1, name: "Timmy Doe", image: "" }, { id: 2, name: "Rainy Min", image: "" }, { id: 3, name: "Dan Limos", image: "" }]
    for (let i = 4; i < 18; i++) {
      students.push({ id: i, name: `Student ${i}`, image: "" })
    }
    setResponse(students)
  }, [])
  const [filter, setFilter] = useState<string>("")

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={s.title}>Students</Text>
        <View style={[s.row, { justifyContent: 'space-between' }]}>
          <View style={styles.filter}>
            <SearchIcon />
            <TextInput style={styles.placeHolder} placeholderTextColor='black' placeholder={'Search '} onChangeText={setFilter} />
          </View>
          <View style={[styles.filter, s.centerContentY]}>
            <TextInput style={styles.placeHolder} placeholderTextColor='black' placeholder={'Sort By: Alphabet   '} />
          </View>
        </View>
        <ScrollView style={{ paddingRight: 10 }}>
          {response.map((student: any) => {
            if (!(student.name).includes(filter)) return null
            return <View key={student.id} style={s.row}>
              <View style={styles.circle} />
              <InfoRow
                label={student.name}
                onClick={() => { nav.navigate("StudentInfo", { studentName: student.name }) }}
                imageUri="../assets/tempStudentImg.png"
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
    marginLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
  },
  circle: {
    backgroundColor: 'orange',
    width: 20,
    height: 20,
    borderRadius: 15,
    alignSelf: 'center',
  },
})

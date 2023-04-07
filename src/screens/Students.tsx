import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import s from '../css/GlobalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigatorTab from '../components/Navigator'
import InfoRow from '../components/InfoRow'
import SearchIcon from '../assets/SearchIcon.svg'
import studentImages from '../assets/studentImages.json'
import { useNavigation } from '@react-navigation/native'
import { getAllStudents } from '../apis/Students'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../store/StoreConfig'
import { StudentStore } from '../store/StudentStore'
import { type Student } from '../store/StudentTypes'

export default function Students() {
  const nav = useNavigation<any>()
  const [filter, setFilter] = useState<string>("")
  const [refreshing, setRefreshing] = useState(false)
  const studentList = useSelector((state: RootState) => state.global.students)
  const dispatch = useDispatch()

  const fetchStudentList = async () => {
    setRefreshing(true)
    const res = await getAllStudents()
    if (!res?.length) return
    const images = studentImages.urls
    for (let i = 0; i < res?.length; i++) {
      res[i].imageUrl = images[i % images.length]
    }
    dispatch(StudentStore.actions.updateStudentList(res))
    setRefreshing(false)
  }

  useEffect(() => {
    fetchStudentList()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={s.title}>Students</Text>
        <View style={[s.row, { justifyContent: 'space-between' }]}>
          <View style={styles.filter}>
            <SearchIcon />
            <TextInput style={styles.textInput} placeholderTextColor='black' placeholder={'Search '} onChangeText={setFilter} />
          </View>
          <View style={styles.filter}>
            <Text style={styles.sortBy}>Sort By: Alphabet </Text>
          </View>
        </View>
        <ScrollView
          style={{ paddingRight: 10 }}
          refreshControl={<RefreshControl onRefresh={fetchStudentList} refreshing={refreshing} />}
        >
          {studentList.map((student: Student) => {
            const fullName = student.first_name + " " + student.last_name
            if (!(fullName).includes(filter)) return null
            return <View key={student.student_id} style={s.row}>
              <View style={styles.circle} />
              <InfoRow
                label={fullName}
                onClick={() => { nav.navigate("StudentInfo", { studentInfo: student }) }}
                imageUri={student.imageUrl}
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
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cecfca',
    paddingVertical: 4,
    paddingLeft: 5,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  sortBy: {
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

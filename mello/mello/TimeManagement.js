import React from 'react';
import { StyleSheet, View } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';

export default function TimeManagement() {
  const sampleEvents = [
    { 'start': '2023-01-13 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
    { 'start': '2023-01-14 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
    { 'start': '2023-01-15 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
    { 'start': '2023-01-15 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
    { 'start': '2023-01-15 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
    { 'start': '2023-01-16 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
    { 'start': '2023-01-16 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
    { 'start': '2023-01-16 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
    { 'start': '2023-01-16 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
    { 'start': '2023-01-16 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
  ]

  return (
    <View style={styles.container}>
      <WeeklyCalendar events={sampleEvents} style={{ height: 400 }} />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
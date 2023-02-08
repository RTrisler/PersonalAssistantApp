import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'

// 2AA198, #003847, 002B36
const BGColor = "#003847"
const LGreen = "#839496"

export default function MonthView() {
  return (
      <CalendarList
        enableSwipeMonths={true}
        // Specify style for calendar container element
        style = {{
          height: '100%',
          width: '100%',
          borderRadius: 10,

        }}

        theme={{
          calendarBackground: '#002B36',
          textSectionTitleDisabledColor: '#d9e1e8',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5', elevation:2,
          selectedDayTextColor: '#white',
          todayTextColor: 'white',
          todayBackgroundColor: '#2AA198', elevation:2,
          dayTextColor: 'white',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'white',
          indicatorColor: 'white',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '200',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14
        }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    backgroundColor: BGColor,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'top',
  },
});

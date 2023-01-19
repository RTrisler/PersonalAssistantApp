import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import 'react-native-gesture-handler'

const BGColor = "#004052"

export default function MonthView() {
  return (
    <Calendar
            enableSwipeMonths={true}
            // Specify style for calendar container element
            style = {{
              height: 375,
              width: 420,
              marginTop: 40,
              paddingTop: 20,
              borderRadius: 10
            }}

            theme={{
              calendarBackground: '#002B36',
              textSectionTitleDisabledColor: '#d9e1e8',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5', elevation:2,
              selectedDayTextColor: '#ffffff',
              todayTextColor: 'white',
              todayBackgroundColor: '#2AA198', elevation:2,
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: '#2AA198',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: '#2AA198',
              indicatorColor: 'blue',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '200',
              textDayFontSize: 20,
              textMonthFontSize: 24,
              textDayHeaderFontSize: 14
            }}
          />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
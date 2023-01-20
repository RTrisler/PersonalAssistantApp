import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import 'react-native-gesture-handler';
import WeekView from './WeekView';

const BGColor = "#004052"
const LGreen = "#2AA198"
const DGreen = "#002B36"

export default function MonthView({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('MonthView')}>
          <View style={styles.monthButton} >
            <Text styles={styles.buttonText}>MonthView</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WeekView')}>
          <View style={styles.weekButton} >
            <Text styles={styles.buttonText}>WeekView</Text>
          </View>
        </TouchableOpacity>
      </View>
        <Calendar
                enableSwipeMonths={true}
                // Specify style for calendar container element
                style = {{
                  height: 375,
                  width: 400,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: BGColor,
    paddingTop: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    width: 400,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: DGreen,
    borderRadius: 10,
  },
  monthButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 195,
    height:35,
    backgroundColor: BGColor,
    borderRadius: 10
  },
  weekButton: {
    width: 195,
    alignItems: 'center',
    justifyContent: 'center',
    height:35,
    backgroundColor: BGColor,
    borderRadius: 10
  },
});
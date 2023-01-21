import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import { Agenda } from 'react-native-calendars';
export default function App() {


  //event maker window visibility
  const [isEventMakerVisible, setEventMakerVisible] = useState(false);
  const toggleEventMaker = () => {
    setEventMakerVisible(!isEventMakerVisible);
  };


  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setstartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const[itemText, setitemText] = useState('empty');

  //functions for changing date/time vars
  const onChangeStartDate = (event, selectedStartDate) => {
    const currentStartDate = selectedStartDate;
    setStartDate(currentStartDate);
  };
  const onChangeStartTime = (event, selectedstartTime) => {
    const currentstartTime = selectedstartTime;
    setstartTime(currentstartTime);
  };
  const onChangeEndDate = (event, selectedEndDate) => {
    const currentEndDate = selectedEndDate;
    setEndDate(currentEndDate);
  };
  const onChangeEndTime = (event, selectedEndTime) => {
    const currentEndTime = selectedEndTime;
    setEndTime(currentEndTime);
  };

  const [eventDates, setEventDates] = useState([
    { 'start': '2023-01-13 09:00:00', 'duration': '0:20:00', 'note': 'Walk my dog' },
    { 'start': '2023-01-15 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
    { 'start': '2023-01-15 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
  ]);
  const addToEvents = () => {
    const fStartDate = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
    const fStartTime = startTime.getHours() + ':' + startTime.getMinutes() + ':' + startTime.getSeconds();
    setEventDates([...eventDates, { 'start': '2023-01-16 22:00:00', 'duration': '1:00:00', 'note': 'Schedule 57' }]);
    console.log('EVENTS IN EVENT ARRAY:')
    //console.log(eventDates[eventDates.length-1]);
    for(var i = 0; i < eventDates.length; i++)
    {
      console.log(eventDates[i]);
    }
    toggleEventMaker();
  };

  return (
    <View style={styles.container}>
      <Button title="Add Event" onPress={toggleEventMaker} />
      <Modal isVisible={isEventMakerVisible}>
        <View style={styles.eventMaker}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}> Item: </Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={setitemText}
        ></TextInput>

          <View style={styles.dateTimeField}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}> Date: </Text>
              <DateTimePicker
                testID='startDatePicker'
                value={startDate}
                mode={'date'}
                onChange={onChangeStartDate}
              />
          </View>
          <View style={styles.dateTimeField}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}> Time: </Text>
              <DateTimePicker
                testID='startTimePicker'
                value={startTime}
                mode={'time'}
                onChange={onChangeStartTime}
              />
          </View>
          {false &&(<View style={styles.dateTimeField}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}> End Date: </Text>
              <DateTimePicker
                testID='endDatePicker'
                value={endDate}
                mode={'date'}
                onChange={onChangeEndDate}
                minimumDate={startDate}
              />
          </View>)}
          {false &&(<View style={styles.dateTimeField}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}> Start Time: </Text>
            <DateTimePicker
              testID='endTimePicker'
              value={endTime}
              mode={'time'}
              onChange={onChangeEndTime}
            />
          </View>)}
          <Button title="Add To Events" onPress={addToEvents} />
          <Button title="Cancel" onPress={toggleEventMaker} />
        </View>
      </Modal>
      <WeeklyCalendar 
        events={eventDates} 
        style={{ height: 400 }}
        onDayPress={(weekday, i) => {
          console.log(weekday.format('ddd') + ' is selected! And it is day ' + (i+1) + ' of the week!')
      }} />
    </View>
    
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  eventMaker: {
    padding: 20,
    backgroundColor: '#dddddd',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dateTimeField: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'space-between'
  }

});
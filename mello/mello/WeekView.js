import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import { Agenda } from 'react-native-calendars';

// 2AA198, #003847, 002B36
const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

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

    setEventDates([...eventDates, { 'start': fStartDate + ' ' + fStartTime, 'duration': '00:00:00', 'note': itemText }]);

    //sample event control data
    //setEventDates([...eventDates, { 'start': '2023-01-16 22:00:00', 'duration': '1:00:00', 'note': 'Schedule 57' }]);
    console.log('EVENTS IN EVENT ARRAY:')
    //console.log(eventDates[eventDates.length-1]);
    for(var i = 0; i < eventDates.length; i++)
    {
      console.log(eventDates[i]);
    }
    console.log();
    toggleEventMaker();
  };

  const getFormattedCurrentDate = () => {
    const fCDate = new Date();
    let fCDateMonth = fCDate.getMonth() + '';
    if(fCDateMonth.length <2) {
      fCDateMonth = '0' + fCDateMonth;
    }
    let fCDateDate = fCDate.getDate() + '';
    if(fCDateDate.length <2) {
      fCDateDate = '0' + fCDateDate;
    }
    const fCDateStr = fCDate.getFullYear() + '-' + fCDateMonth + '-' + fCDateDate;
    console.log(fCDateDate);
    return fCDateStr;
  };

  const formattedCurrentDate = getFormattedCurrentDate();
  return (
    <View style={styles.container}>
      <Button title="Add Event" onPress={toggleEventMaker} color="#2AA198" />
      <Modal isVisible={isEventMakerVisible}>
        <View style={styles.eventMaker}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: LGreen}}> Item: </Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={setitemText}
        ></TextInput>

          <View style={styles.dateTimeField}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: LGreen}}> Date: </Text>
              <DateTimePicker
                style={{backgroundColor: BGColor, color: LGreen}}
                testID='startDatePicker'
                value={startDate}
                mode={'date'}
                onChange={onChangeStartDate}
              />
          </View>
          <View style={styles.dateTimeField}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: LGreen}}> Time: </Text>
              <DateTimePicker
                style={{backgroundColor: BGColor,color: LGreen}}
                testID='startTimePicker'
                value={startTime}
                mode={'time'}
                onChange={onChangeStartTime}
              />
          </View>
          {false &&(<View style={styles.dateTimeField}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}> End Date: </Text>
              <DateTimePicker
                style={{backgroundColor: BGColor, color: LGreen}}
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
              style={{backgroundColor: BGColor}}
              testID='endTimePicker'
              value={endTime}
              mode={'time'}
              onChange={onChangeEndTime}
            />
          </View>)}
          <Button title="Add To Events" onPress={addToEvents} style={styles.button} color="#2AA198"/>
          <Button title="Cancel" onPress={toggleEventMaker} style={styles.button} color="#2AA198"/>
        </View>
      </Modal>


      <Agenda
       items={{
        '2023-05-22': [{name: 'item 1 - any js object'}],
        '2023-05-23': [{name: 'item 2 - any js object', height: 80}],
        '2023-05-24': [],
        '2023-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
      }}
      // Callback that gets called when items for a certain month should be loaded (month became visible)
      loadItemsForMonth={month => {
        console.log('trigger items loading');
      }}
      // Callback that fires when the calendar is opened or closed
      onCalendarToggled={calendarOpened => {
        console.log(calendarOpened);
      }}
      // Callback that gets called on day press
      onDayPress={day => {
        console.log('day pressed');
      }}
      // Callback that gets called when day changes while scrolling agenda list
      onDayChange={day => {
        console.log('day changed');
      }}
      // Initially selected day
      selected={formattedCurrentDate}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={50}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={50}
      // Specify your item comparison function for increased performance
      rowHasChanged={(r1, r2) => {
        return r1.text !== r2.text;
      }}
      // Agenda theme
      theme={{
        //...calendarTheme,
        agendaDayTextColor: 'yellow',
        agendaDayNumColor: 'green',
        agendaTodayColor: 'red',
        agendaKnobColor: 'blue'
      }}
      // Agenda container style
      style={styles.agenda}
      />
    </View>  
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BGColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: 100,
    alignItems: 'center',
    backgroundColor: DGreen,
    borderColor: LGreen,
    borderWidth: 2,
    borderRadius: 4,
    padding: 10,
  },
  eventMaker: {
    padding: 20,
    backgroundColor: BGColor,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: BGColor,
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dateTimeField: {
    backgroundColor: BGColor,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'space-between'
  },
  agenda: {
    width: '100%',
    height: '80%',
  }
});
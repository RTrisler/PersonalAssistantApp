import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Agenda, DateData } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider, Card, Button, Modal, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
//import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Toast from 'react-native-toast-message';

// 2AA198, #003847, 002B36
const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

const getFormattedDate = (date) => {
  let fCDateMonth = (date.getMonth() + 1) + '';
  if(fCDateMonth.length <2) {
    fCDateMonth = '0' + fCDateMonth;
  }
  let fCDateDate = date.getDate() + '';
  if(fCDateDate.length <2) {
    fCDateDate = '0' + fCDateDate;
  }
  const fCDateStr = date.getFullYear() + '-' + fCDateMonth + '-' + fCDateDate;
  return fCDateStr;
};

const getFormattedTime = (date) => {
  let fCDateHour = date.getHours()+ '';
  if(fCDateHour.length <2) {
    fCDateHour = '0' + fCDateHour;
  }
  let fCDateMinute = date.getMinutes() + '';
  if(fCDateMinute.length <2) {
    fCDateMinute = '0' + fCDateMinute;
  }
  const fCDateStr = fCDateHour + ':' + fCDateMinute;
  return fCDateStr;
};

export default function AgendaView() {

  const [items, setItems] = useState({
    '2023-02-18': [
      {name: 'nametest', timeDueStart: '12:30', timeDueEnd: '13:30', note: 'note test'},
      {name: 'csc 330', timeDueStart: '11:00', timeDueEnd: '12:15', note: 'go to class nerd'},
      {name: 'csc 470', timeDueStart: '11:00', timeDueEnd: '12:15', note: 'go to class nerd'},
      {name: 'csc 405', timeDueStart: '2:00', timeDueEnd: '3:15', note: 'go to class nerd'}
    ],
    '2023-02-19': [
      {name: 'do thing', timeDueStart: '2:00', timeDueEnd: '3:15', note: 'note about thing'}
    ]
  });

  //loading items from the item list to agenda
  const loadItems = async (date) => {
    setTimeout(() => {
      //for each day within 60 days of the current date
      for(let dayOffset = -9; dayOffset < 9; dayOffset++) {
        //get date key to put into item list   day  hour sec  milli
        const time = date.timestamp + dayOffset * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        //if date entry doesnt exist, make blank date
        if(!items[strTime]) {
          items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 70);
  };
  
  //how each item on the agenda is rendered
  const renderItem = (item) => {
    return (
    <TouchableOpacity style={styles.itemBorder}>
      <Card style={{ backgroundColor: LGreen }}>
        <Card.Content>
          <View style={styles.item}>
            <View style={styles.itemTimes}>
              <Text style={{fontSize: 17}}>{item.timeDueStart}</Text>
              <Text style={{fontSize: 17}}>{item.timeDueEnd}</Text>
            </View>
            <Text style={{fontSize: 23, fontWeight: 'bold'}}>{item.name}</Text>
            
            <Text style={{fontSize: 16}}>{item.note}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>)
  }

  const renderEmptyItem = () => {
    return (<View style={{justifyContent: 'center', alignContent: 'center'}}>
      <Divider bold={true} style={{backgroundColor: LGreen}}/>
    </View>)
  }

  //initial load of calendar app
  const [started,setStarted] = useState(false);
  const currentDate = new Date();
  if(!started)
  {
    loadItems({"dateString": getFormattedDate(currentDate), 
               "day": currentDate.getDate(), 
               "month": currentDate.getMonth(),
               "timestamp": currentDate.valueOf() - (currentDate.valueOf() % 100000),
               "year": currentDate.getFullYear()
              })
    setStarted(true);
    for(let i = 0; i < items.length; i++) {
      console.log(items[i]);
    }
  }

  //making an event
  //vars for making an event date
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [nameText, setNameText] = useState('empty');
  const [noteText, setNoteText] = useState('empty');
  const [isEventMakerVisible, setEventMakerVisible] = useState(false);
  const isIOS = Platform.OS === 'ios';
  const [startDatePicker, setStartDatePicker] = useState(false);
  const [startTimePicker, setStartTimePicker] = useState(false);
  const [endTimePicker, setEndTimePicker] = useState(false);

  //making the event maker modal show up or not
  const toggleEventMaker = () => {
    setEventMakerVisible(!isEventMakerVisible);
    resetEventMakerVar();
  };

  const resetEventMakerVar = () => {
    setStartDate(new Date());
    setstartTime(new Date());
    setEndTime(new Date());
    setNameText('empty');
    setNameText('empty');
  }
  //functions for changing date/time vars
  const onChangeStartDate = React.useCallback(
    (params) => {
      setStartDatePicker(false)
      setStartDate(params.date);
    },
    [setStartDatePicker,setStartDate]
  );
  const onChangeStartTime = React.useCallback(
    ({hours, minutes}) => {
      setStartTimePicker(false)
      const t = new Date();
      const value = new Date(t.getFullYear(), t.getMonth(), t.getDate(), hours, minutes, 0,0);
      setStartTime(value);
    },
    [setStartTimePicker,setStartTime]
  );
  const onChangeEndTime = React.useCallback(
    ({hours,minutes}) => {
      setEndTimePicker(false)
      const t = new Date();
      const value = new Date(t.getFullYear(), t.getMonth(), t.getDate(), hours, minutes, 0,0);
      setEndTime(value);
    },
    [setEndTimePicker,setEndTime]
  );
  
  const addToEvents = () => {
    if(nameText == 'empty'){
      Toast.show({
        type: 'error',
        text1: 'Event needs a name'
      })
      return;
    }
    setTimeout(() => {
      console.log(startDate.getDate())
      const startDateStr = getFormattedDate(startDate);
      const eventItem = {name: nameText, 
                         timeDueStart: getFormattedTime(startTime), 
                         timeDueEnd: getFormattedTime(endTime), 
                         note: noteText};
      if(!items[startDateStr]) {
        items[startDateStr] = [eventItem];
      }
      else{
        items[startDateStr].push(eventItem);
      }
      console.log(items[startDateStr]);
    }, 70);
    loadItems({"dateString": getFormattedDate(startDate), 
               "day": startDate.getDate(), 
               "month": startDate.getMonth(),
               "timestamp": startDate.valueOf() - (startDate.valueOf() % 100000),
               "year": startDate.getFullYear()
              })
    toggleEventMaker();
    const endTimeStr = endTime.toTimeString().slice(0,9);
    const timeDifference = endTime.getTime()-startDate.getTime();
    schedulePushNotification(nameText,endTimeStr,timeDifference);
  }

  const toggleStartDatePicker = () => {
    setStartDatePicker(!startDatePicker);
  }

  const toggleStartTimePicker = () => {
    setStartTimePicker(!startTimePicker);
  }

  const toggleEndTimePicker = () => {
    setEndTimePicker(!endTimePicker);
  }
  return (
    <View style = {styles.container}>
        <View style = {{flexDirection: 'row-reverse', justifyContent: 'space-around'}}>
          <Button onPress={toggleEventMaker} buttonColor={DGreen} textColor={LGreen} style={{width: '100%'}}>
            <Text style = {{fontSize: 20, minWidth: '90%',}}> Add Event </Text>
          </Button>
        </View>
        <Agenda
          items={items}
          onDayChange={loadItems}
          loadItemsForMonth={loadItems}
          selected={getFormattedDate(currentDate)}
          showClosingKnob={true}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyItem}
          style = {{
            backgroundColor: BGColor
          }}
          theme={styles.calendarTheme}
        />
        
      <Modal visible={isEventMakerVisible} onDismiss={toggleEventMaker}>
            <Card style={styles.eventMaker}>
              <TextInput placeholder='Name' onChangeText={setNameText} textColor="#2AA198"/>
              <TextInput placeholder='Note' onChangeText={setNoteText} textColor="#2AA198"/>

              <View style = {{paddingHorizontal: 10}}>
                <View style={styles.dateTimeField}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: LGreen}}>
                    Date:
                  </Text>
                  <DatePickerModal locale="en" mode="single" date={startDate} onConfirm={onChangeStartDate} onDismiss={toggleStartDatePicker} visible={startDatePicker}/>
                  <Button buttonColor={DGreen} textColor={LGreen} onPress={toggleStartDatePicker}>{getFormattedDate(startDate)}</Button>
                </View>

                <View style={styles.dateTimeField}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: LGreen }}>
                    Start:
                  </Text>
                  <TimePickerModal locale="en" visible={startTimePicker} onDismiss={toggleStartTimePicker} onConfirm={onChangeStartTime}/>
                  <Button buttonColor={DGreen} textColor={LGreen} onPress={toggleStartTimePicker}>{getFormattedTime(startTime)}</Button>
                </View>

                <View style={styles.dateTimeField}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: LGreen }}>
                    End:
                  </Text>
                  <TimePickerModal locale="en" visible={startTimePicker} onDismiss={toggleEndTimePicker} onConfirm={onChangeEndTime}/>
                  <Button buttonColor={DGreen} textColor={LGreen} onPress={toggleEndTimePicker}>{getFormattedTime(endTime)}</Button>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop: 10, paddingBottom: 10}}>
                  <Button onPress={addToEvents} buttonColor={DGreen} textColor={LGreen}>
                    <Text style = {{fontSize: 20, fontWeight: 'bold'}}> Save </Text>
                  </Button>
                  <Button onPress={toggleEventMaker} buttonColor={DGreen} textColor={LGreen}>
                    <Text style = {{fontSize: 20, fontWeight: 'bold'}}> Cancel </Text>
                  </Button>
                </View>
              </View>
            </Card>
            <Toast />
      </Modal>
      
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    padding: '10px',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '10px'
  },
  calendar: {
    height: '90%'
  },
  addButton: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: LGreen
  },
  itemBorder: {
    marginRight: 10,
    marginTop: 17,
  },
  item: { 
    justifyContent: 'space-between',
  },
  itemTimes: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between'
  },
  calendarTheme: {
    backgroundColor: BGColor,
    calendarBackground: 'white',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: LGreen,
    textDisabledColor: BGColor,
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: LGreen,
    indicatorColor: 'blue',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  },
  dateTimeField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,

  },
  eventMaker: {
    backgroundColor: BGColor,
  }
});

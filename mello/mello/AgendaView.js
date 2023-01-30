import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Agenda, DateData } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider, Card, Button } from 'react-native-paper';


// 2AA198, #003847, 002B36
const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

const dateToString = (date) => {
  return date.toISOString().split('T')[0];
}

export default function AgendaView() {
  const [items, setItems] = useState({
    '2023-01-30': [
      {name: 'nametest', timeDueStart: '12:30', timeDueEnd: '13:30', note: 'note test'},
      {name: 'csc 330', timeDueStart: '11:00', timeDueEnd: '12:15', note: 'go to class nerd'},
      {name: 'csc 470', timeDueStart: '11:00', timeDueEnd: '12:15', note: 'go to class nerd'},
      {name: 'csc 405', timeDueStart: '2:00', timeDueEnd: '3:15', note: 'go to class nerd'}
    ],
    '2023-01-31': [
      {name: 'do thing', timeDueStart: '2:00', timeDueEnd: '3:15', note: 'note about thing'}
    ]
  });

  //loading items from the item list to agenda
  const loadItems = (date) => {
    setTimeout(() => {
      //for each day within 60 days of the current date
      for(let dayOffset = -45; dayOffset < 45; dayOffset++) {
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
      <Card>
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
    return (<View>
      <Divider/>
    </View>)
  }

  //initial load of calendar app
  const [started,setStarted] = useState(false);
  const currentDate = new Date;
  if(!started)
  {
    loadItems({"dateString": dateToString(currentDate), 
               "day": currentDate.getDate(), 
               "month": currentDate.getMonth(),
               "timestamp": currentDate.valueOf(),
               "year": currentDate.getFullYear()
              })
    setStarted(true);
  }

  //making an event in the first place
  const [isEventMakerVisible, setEventMakerVisible] = useState(false);
  const toggleEventMaker = () => {
    setEventMakerVisible(!isEventMakerVisible);
  };



  return (
    <View style = {styles.container}>
      <View style = {styles.calendar}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={dateToString(currentDate)}
          showClosingKnob={true}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyItem}
          style = {{
            backgroundColor: BGColor
          }}
          theme={styles.calendarTheme}
        />
      </View>
      <View style = {styles.addButton}>
        <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button onPress={toggleEventMaker} buttonColor={DGreen} textColor={LGreen}>
          <Text style = {{fontSize: 20}}> Add Event </Text>
        </Button>
        </View>
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LGreen
  },
  calendar: {
    height: '90%'
  },
  addButton: {
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: LGreen
  },
  itemBorder: {
    marginRight: 10,
    marginTop: 17
  },
  item: { 
    justifyContent: 'space-between'
  },
  itemTimes: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between'
  },
  calendarTheme: {
    backgroundColor: LGreen,
    calendarBackground: BGColor,
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: LGreen,
    textDisabledColor: DGreen,
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
  }
});
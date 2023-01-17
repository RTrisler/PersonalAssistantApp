import react from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import {agenda} from 'react-native-calendars';
import {card} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'

/*
export default function TimeManagement() {
  return (
    <View style={styles.container}>
      <Text>TimeManagement!</Text>
      <StatusBar style="auto" />
    </View>
  );
}*/

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

const App = () => {
  const [items, setItems] = React.useState({});
  
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i<85; i++){
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]){
          items[strTime] = [];

          const numItems = Math.floor(Math.random()*3+1);
          for (let j = 0; j < numItems; j++){
            items[strTime].push({
              name: 'item for ' + strTime + ' #' + j,
              height: Math.max(10, Math.floor(Math.random()*150)),
              day: strTime
            });
          }
        }
      }
      const newItem = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  }
  const renderItem = (item) => {
    return(
      <TouchableOpacity style={styles.item}>
        <Card>
          <Card.Content>
            <View>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }
  return(
    <View style={styles.container}>
      <agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2023-1-1'}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
        />
    </View>
  ):
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight:10,
    marginTop:17,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home'
import Settings from './Settings';
import TimeManagement from './TimeManagement';
import TimeMediator from './TimeMediator';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home" screenOptions={{
                                                drawerStyle: {
                                                  backgroundColor: '#839496'
                                                }
    }}>
      <Drawer.Screen name="Mello" component={Home} options={{ title: 'Welcome', headerStyle: {
              backgroundColor: '#2aa198'
           } }} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Calender" component={TimeMediator} options={{ headerShown: false}} />
      <Drawer.Screen name="TimeManagement" component={TimeManagement} options={
        () => ({
          drawerLabel: () => null,
          title: undefined,
          drawerIcon: () => null,
          headerShown: false,
        })
      }
        />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}


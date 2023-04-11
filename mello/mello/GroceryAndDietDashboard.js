import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import Character from './Character'
import SignoutButton from './Signout';
import { Checkbox, FormGroup, FormControlLabel, Box  } from '@material-ui/core';
import { Divider, Card, Button, Modal, TextInput,List, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-web';
import { useFonts } from 'expo-font';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import {db} from './firebase'
import { BlurView } from 'expo-blur';
import { SelectList } from 'react-native-dropdown-select-list';

const BGColor = "#003847";
const LGreen = "#2AA198"
const DGreen = "#002B36"

export default function GroceryAndDietDashboard() {

  const [fontsLoaded] = useFonts({
    'Elnath': require('/assets/fonts/ELNATH.ttf'),
  });

  //vars for adding items
  const [itemAdderVisible, setItemAdderVisible] = useState(false);
  const [category, setCategory] = useState('');
  const categories = [
    {key:'0', value:'Vegetables'},
    {key:'1', value:'Fruit'},
    {key:'2', value:'Meat'},
    {key:'3', value:'Grains'},
    {key:'4', value:'Frozen'},
    {key:'5', value:'Canned'},
    {key:'6', value:'Drinks'},
    {key:'7', value:'Misc'},
    {key:'8',value:'Not Food'}
  ]
  const showItemAdder = () => setItemAdderVisible(true);
  const hideItemAdder = () => setItemAdderVisible(false);
  const [list, setList] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  //the actual adding part
  const handleAddItem = async () => {
    if(newItemName == '' || isNaN(+newIngredientQty)) {
      Toast.show({
        type: 'error',
        text1: 'Item needs a name or quantity'
      })
      return;
    }
    const itemToAdd = newItemName;
    const itemQty = newItemQty ? newItemQty : 1;
    //reset newitemname
    setNewItemName('');
    setNewItemQty(1);
    const oldList = list;
    const cat = category || -1;
    console.log(cat);
    //add to list quickly
    setList([...oldList, { name: itemToAdd, ID: -1,  foodData: "" , itemCategory: cat == -1 ? "" : categories[cat], Qty: itemQty}]);
    hideItemAdder();
    //if not a food then no point in getting data from database
    if(category == '' || cat > 7) return;
    const fData = await fetchData(itemToAdd.replace(/[^a-zA-Z ]/g, ''));
    //
    if(fData[0] != -1) {
        let fDataMap = fData[1].map(nutrient => {
            return {
                id: nutrient.nutrient.id,
                amount: nutrient.amount,
                name: nutrient.nutrient.name,
                number: nutrient.nutrient.number,
                unitName: nutrient.nutrient.unitName
            }
        });
        const calories = fDataMap.filter((nutrient) => nutrient.id == 1008)[0];
        const carbs = fDataMap.filter((nutrient) => nutrient.id == 1005)[0];
        const protein = fDataMap.filter((nutrient) => nutrient.id == 1003)[0];
        const cholesterol = fDataMap.filter((nutrient) => nutrient.id == 1253)[0];
        const fat = fDataMap.filter((nutrient) => nutrient.id == 1004)[0];
        const calV = calories ? (calories.amount + calories.unitName) : "0kcal";
        const carbV = carbs ? (carbs.amount + carbs.unitName) : "0g";
        const protV = protein ? (protein.amount + protein.unitName) : "0g";
        const fatV = fat ? (fat.amount + fat.unitName) : "0g";
        const cholV = cholesterol ? (cholesterol.amount + cholesterol.unitName) : "0g";
        let fDataStr = "Cal " + calV + "\t" + "Carbs " + carbV + "\t" + "Protein " + protV  + "\t" + "Fat " + fatV + "\t" + "Cholesterol " + cholV;
        setList([...oldList, { name: itemToAdd, ID: fData[0],  foodData: fDataStr, itemCategory: cat == -1 ? "" : categories[cat], Qty: itemQty }]);
    }
  };


  const handleDeleteItem = (index) => {
    setList(list.filter((item, i) => i !== index));
  };

  const fetchData = async (food) => {
    try {
        const response = await axios.get(
            `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=k96EAuXMLlpv0zSgHpR2DD1c1D8W6Z03Sh8MjzPK&query=${food}`
        );
        const ID = response.data.foods[0].fdcId;
        const otherResponse = await axios.get(
            `https://api.nal.usda.gov/fdc/v1/food/${ID}?api_key=k96EAuXMLlpv0zSgHpR2DD1c1D8W6Z03Sh8MjzPK`
        );
        return [ID, otherResponse.data.foodNutrients];
      } 
      catch (err) {
        console.log(err);
        return [-1, {}];
      }
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

  const returnTimes = (startTime, endTime) => {
    const times = getFormattedTime(new Date(startTime)) + '-' + getFormattedTime(new Date(endTime))
    if (!isNaN(+times[0])) return times;
    else return '';
  }
  return (
    <LinearGradient
        // Background Linear Gradient
        colors={[ BGColor, 'white']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.container}>

            {/* MEAL PLAN */}
            <Surface style={styles.mealPlanner}>
                <Text style={styles.todoTodayText}>Meal Plan</Text>
            </Surface>

            {/* RECIPES */}
            <Surface style={styles.recipeList}>
                <Text style={styles.todoTodayText}>Recipes</Text>
            </Surface>

            {/* GROCERY LIST */}
            <Surface style={styles.groceryList}>
                <Text style={styles.todoTodayText}>Grocery List</Text>
                <Button onPress={showItemAdder} style={styles.showAdderButton}><Text style={{fontSize: 20, fontWeight: 'bold', color: LGreen}}>Add Grocery Item</Text></Button>
                <ScrollView>
                    <List.Section style={{backgroundColor: BGColor}}>
                        {list.map((item, index) => (
                            <Surface key={item.name} style={{backgroundColor: BGColor, justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{...styles.itemDetailsContainer, justifyContent: 'center'}}>
                                <View style ={{justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Text style={styles.categoryText}>{item.name}</Text>
                                    <Text style={{...styles.categoryText, paddingRight: '3%'}}>{item.itemCategory.value}</Text>
                                </View>
                                </View>
                                <View style={{backgroundColor: DGreen, maxWidth: '15%', minWidth: '5%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: LGreen, fontSize: 25, fontWeight: 'bold'}}>{item.Qty}</Text>
                                </View>
                                <IconButton
                                    onPress={() => handleDeleteItem(index)}
                                    icon="delete"
                                    iconColor={LGreen}
                                >
                                </IconButton>
                            </View>
                            {(item.ID != -1) && <List.Accordion style={{backgroundColor: DGreen}} title="Nutrional Info" titleStyle={{color: LGreen}}>
                                <Text style={styles.itemDetails}>{item.foodData}</Text>
                            </List.Accordion>}
                            </Surface>
                        ))}
                    </List.Section>
                </ScrollView>
            </Surface>
        

            <Modal visible={itemAdderVisible} onDismiss={hideItemAdder}>
                <Card style={styles.itemAdder}>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput placeholder='Item name' activeUnderlineColor = "#2AA198" onChangeText={setNewItemName} textColor="#2AA198" value={newItemName} style={{minWidth: '75%', backgroundColor: DGreen}}/>
                        <TextInput placeholder='Qty.' activeUnderlineColor = "#2AA198" onChangeText={setNewItemQty} textColor="#2AA198" value={newItemQty} style={{minWidth: '25%', backgroundColor: DGreen}} keyboardType='numeric'/>
                    </View>
                    <SelectList setSelected={setCategory} data={categories} save="key" inputStyles={{color: LGreen}} dropdownTextStyles={{color: LGreen}}/>
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical: 10, paddingHorizontal: 5}}>
                    <Button onPress={handleAddItem} buttonColor={DGreen} textColor={LGreen}>
                        <Text style = {{fontSize: 20, fontWeight: 'bold', color: LGreen}}> Save </Text>
                    </Button>
                    <Button onPress={hideItemAdder} buttonColor={DGreen} textColor={LGreen}>
                        <Text style = {{fontSize: 20, fontWeight: 'bold', color: LGreen}}> Cancel </Text>
                    </Button>
                    </View>
                </Card>
            </Modal>

        </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: "space-around",
    justifyContent: "space-evenly",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gradient: {
    flex: 1,
  },
  mealPlanner: {
    height: "45%",
    width: "95%",
    backgroundColor: BGColor,
    borderRadius: "10px",
  },
  groceryList: {
    height: "45%",
    width: "45%",
    backgroundColor: BGColor,
    borderRadius: "10px",
  },
  recipeList: {
    height: "45%",
    width: "45%",
    backgroundColor: BGColor,
    borderRadius: "10px",
  },
  button: {
    height: "100px",
    width: "100px",
    backgroundColor: 'red',
  },
  third: {
    height: "35%",
    width: "45%",
    backgroundColor: BGColor,
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  todoTodayText: {
    fontFamily: "Monospace",
    fontSize: 25,
    color: "white",
    alignSelf: "center",
  },
  todoTextContainer: {
    width: "100%",
    height: "100%",
  },
  todoText: {
    fontFamily: "Monospace",
    fontSize: 25,
    alignSelf: "flex-start",
    width: "100%",
  },
  scrollView: {
    width: '95%',
    height: '85%',
},
  todoContainer: {
    width: "95%",
    height: "80%",
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: "5px"
  },
  fourth: {
    height: "50%",
    width: "56%",
    backgroundColor: BGColor,
    borderRadius: "10px",
  },
  wrapper: {
    height: "50%",
    width: "36%",
    backgroundColor: BGColor,
    justifyContent: "space-between",
    alignItems: "space-between",
    borderRadius: "10px",
  },
  divider: {
    width: "100%",
  },
  itemDetails: {
    paddingLeft: 10,
    fontSize: 20,
    color: LGreen
  },
  itemContainer: {
    backgroundColor: BGColor,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  itemDetailsContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  categoryText: {
    fontSize: 25,
    color: LGreen
  },
  addButton: {
    backgroundColor: DGreen,
    marginTop: 10,
  },
  showAdderButton: {
    backgroundColor: DGreen,
    marginTop: 10,
    minWidth: '70%'
  },
 
})
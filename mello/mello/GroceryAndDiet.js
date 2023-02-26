import React, { useState } from 'react';
import { View,  StyleSheet,SafeAreaView, Platform } from 'react-native';
import { TextInput, List, Checkbox, Divider, Surface, Text, Button, IconButton, Modal, Card } from 'react-native-paper';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-gesture-handler';

const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

export default function GroceryAndDiet() {
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
    if(newItemName == '') {
      Toast.show({
        type: 'error',
        text1: 'Item needs a name'
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
        let fDataStr = "Cal " + calV + "\t" + "Carbs " + carbV + "\t" + "Protein " + protV  + "\n" + "Fat " + fatV + "\t" + "Cholesterol " + cholV;
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

  const [groceryView, setGroceryView] = useState(true);

  const toggleGroceryView = () => {
    setGroceryView(!groceryView);
  };


  const [recipeAdderVisible, setRecipeAdderVisible] = useState(false);
  const hideRecipeAdder = () => {
    setRecipeAdderVisible(false);
  };
  const showRecipeAdder = () => {
    setRecipeAdderVisible(true);
  };
  const [newRecipeName, setNewRecipeName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const handleAddRecipe = () => {
    setRecipes([...recipes, {name: newRecipeName}]);
  };


  return (
    <SafeAreaView style={styles.container}>
      {groceryView ? (
      <View style={{flex:1}}>
        <View style={{flexDirection: 'row', paddingHorizontal: '1%', justifyContent: 'space-between'}}>
          <Button onPress={showItemAdder} style={{...styles.showAdderButton}}><Text style={{fontSize: 20, fontWeight: 'bold', color: LGreen}}>Add Grocery Item</Text></Button>
          <IconButton icon='book' iconColor={LGreen} onPress={toggleGroceryView}></IconButton>
        </View>
        <ScrollView>
        <List.Section style={{backgroundColor: BGColor}}>
          {list.map((item, index) => (
            <Surface key={item.name} style={styles.itemContainer}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.itemDetailsContainer}>
                  <View style ={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.categoryText}>{item.itemCategory.value}</Text>
                  </View>
                </View>
                <View style={{backgroundColor: DGreen, minWidth: '10%', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: LGreen, fontSize: 25, fontWeight: 'bold'}}>{item.Qty}</Text>
                </View>
                <IconButton
                  onPress={() => handleDeleteItem(index)}
                  icon="delete"
                  iconColor={LGreen}
                >
                </IconButton>
              </View>
              {(item.ID != -1) && <List.Accordion style={{minWidth: '100%', backgroundColor: DGreen, maxHeight: '3%'}}>
                <Text style={styles.itemDetails}>{item.foodData}</Text>
              </List.Accordion>}
            </Surface>
          ))}
        </List.Section>
        </ScrollView>
        </View>
        )
        :
        (
        <View style={{flex:1}}>
          <View style={{flexDirection: 'row', paddingHorizontal: '1%', justifyContent: 'space-between'}}>
            <Button onPress={showRecipeAdder} style={{...styles.showAdderButton}}><Text style={{fontSize: 20, fontWeight: 'bold', color: LGreen}}>Add Recipe</Text></Button>
            <IconButton icon='book' iconColor={LGreen} onPress={toggleGroceryView}></IconButton>
          </View>
          <ScrollView>
        <List.Section style={{backgroundColor: BGColor}}>
          {recipes.map((item, index) => (
            <Surface key={item.name} style={styles.itemContainer}>
              <View style={styles.itemDetailsContainer}>
                <View style ={{justifyContent: 'space-between', flexDirection: 'row'}}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
                <Text style={styles.itemDetails}>{item.name}</Text>
              </View>
              <View style={{backgroundColor: DGreen, minWidth: '10%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: LGreen, fontSize: 25, fontWeight: 'bold'}}>{item.name}</Text>
              </View>
              <IconButton
                onPress={() => handleDeleteItem(index)}
                icon="delete"
                iconColor={LGreen}
              >
              </IconButton>
            </Surface>
          ))}
        </List.Section>
        </ScrollView>
        </View>
        )}


        
        <Modal visible={itemAdderVisible} onDismiss={hideItemAdder}>
          <Card style={styles.itemAdder}>
            <View style={{flexDirection: 'row'}}>
              <TextInput placeholder='Item name' onChangeText={setNewItemName} textColor="#2AA198" value={newItemName} style={{minWidth: '75%', backgroundColor: BGColor}}/>
              <TextInput placeholder='Qty.' onChangeText={setNewItemQty} textColor="#2AA198" value={newItemQty} style={{minWidth: '25%', backgroundColor: DGreen}} keyboardType='numeric'/>
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


        <Modal visible={recipeAdderVisible} onDismiss={hideRecipeAdder}>
          <Card style={styles.itemAdder}>
            <TextInput placeholder='Recipe name' onChangeText={setNewRecipeName} textColor="#2AA198" value={newRecipeName} style={{minWidth: '80%'}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical: 10, paddingHorizontal: 5}}>
            <Button onPress={handleAddRecipe} buttonColor={DGreen} textColor={LGreen}>
              <Text style = {{fontSize: 20, fontWeight: 'bold', color: LGreen}}> Save </Text>
            </Button>
            <Button onPress={hideRecipeAdder} buttonColor={DGreen} textColor={LGreen}>
              <Text style = {{fontSize: 20, fontWeight: 'bold', color: LGreen}}> Cancel </Text>
            </Button>
            </View>
          </Card>
        </Modal>

        <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? '12%' : '10%',
    flex: 1,
    backgroundColor: BGColor,
  },
  input: {
    marginBottom: 20,
    padding: 10,
  },
  addButton: {
    backgroundColor: DGreen,
    marginTop: 10,
  },
  showAdderButton: {
    backgroundColor: DGreen,
    marginTop: 10,
    minWidth: '80%'
  },
  itemContainer: {
    backgroundColor: BGColor,
    alignItems: 'center',
  },
  itemDetailsContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  itemText: {
    fontSize: 25,
    color: LGreen
  },
  categoryText: {
    fontSize: 25,
    color: LGreen
  },
  itemDetails: {
    paddingLeft: 10,
    fontSize: 15,
    color: LGreen
  },
  deleteButton: {
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: LGreen
  },
  itemAdder: {
    backgroundColor: BGColor,
  }
});


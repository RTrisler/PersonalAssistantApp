import React, { useState } from 'react';
import { View,  StyleSheet,SafeAreaView } from 'react-native';
import { TextInput, List, Checkbox, Divider, Surface, Text, Button, IconButton } from 'react-native-paper';
import axios from 'axios';

const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

export default function GroceryAndDiet() {
  const [list, setList] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const handleAddItem = async () => {
    if(newItemName == '') return;
    const itemToAdd = newItemName;
    const fData = await fetchData(itemToAdd);
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
        console.log(calV);
        console.log(carbV);
        console.log(protV);
        console.log(fatV);
        console.log(cholV);
        let fDataStr = "Cal " + calV + "\t " + "Carbs " + carbV + "\t " + "Protein " + protV  + "\n" + "Fat " + fatV + "\t " + "Cholesterol " + cholV;
        setList([...list, { name: newItemName, ID: fData[0],  foodData: fDataStr }]);
    }
    else{
        setList([...list, { name: newItemName, ID: fData[0],  foodData: "" }]);
    }
    
    setNewItemName('');
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

  return (
    <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around',backgroundColor: BGColor}}>
            <TextInput placeholder='Item name' onChangeText={setNewItemName} textColor="#2AA198" value={newItemName} style={{minWidth: '80%'}}/>
            <Button onPress={handleAddItem} style={styles.addButton}><Text style={{fontSize: 20, fontWeight: 'bold', color: LGreen}}>Add</Text></Button>
        </View>
      <List.Section style={{backgroundColor: BGColor}}>
        {list.map((item, index) => (
          <Surface key={item.name} style={styles.itemContainer}>
            <View style={styles.itemDetailsContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemDetails}>{item.foodData}</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  itemContainer: {
    backgroundColor: BGColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetailsContainer: {
    marginLeft: 20,
    flex: 1,
  },
  itemText: {
    fontSize: 25,
    color: LGreen
  },
  itemDetails: {
    fontSize: 15,
    color: LGreen
  },
  deleteButton: {
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: LGreen
  },
});


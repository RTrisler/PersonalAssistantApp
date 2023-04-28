import React, { useState, useEffect } from 'react';
import { View,  StyleSheet,SafeAreaView,   TouchableOpacity} from 'react-native';
import { TextInput, List, Surface, Button, Text, IconButton, Modal, Card, HelperText, } from 'react-native-paper';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur';
import { getDatabase, ref, get, set, onValue } from 'firebase/database';


const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"




export default function GroceryAndDiet() {

  const navigation = useNavigation()

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

  const handleAddItemFromRecipe = async (itemToAdd, itemQty) => {
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
  const handleNavigate = () => {
    navigation.navigate('MoreRecipes')
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
  const [recipeView, setRecipeView] = useState(false);
  const [mealPlanView, setMealPlanView] = useState(false);
  const [shouldShowNewRecipe, setShouldShowNewRecipe] = useState(false);
  const [shouldShowSavedRecipes, setShouldShowSavedRecipes] = useState(false);

  const toggleGroceryView = () => {
    setMealPlanView(false);
    setRecipeView(false);
    setGroceryView(true);
    
  };
  const toggleRecipeView = () => {
    
    setMealPlanView(false)
    setGroceryView(false);
    setRecipeView(true);
  };
  const toggleMealPlanView = () => {
    setRecipeView(false);
    setGroceryView(false);
    setMealPlanView(true);
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
    if((newRecipeName == '' )) { return; }
    const recName = newRecipeName;
    const recIng = recipeIngredients;
    const recStep = recipeSteps;
    setNewRecipeName('');
    setRecipeIngredients([]);
    setRecipeSteps([]);
    setRecipes([...recipes, {name: recName, ingredients: recIng, steps: recStep}]);

    const db = getDatabase();
    const dbvaluesNeeded = ref(db, 'users/userID/valuesNeeded')
    get(dbvaluesNeeded).then((snapshot) => {
      if(snapshot.exists()) {
        let valuesNeeded = snapshot.val();
        valuesNeeded[2] += 1;
        set(dbvaluesNeeded, valuesNeeded);
      }
    });

    hideRecipeAdder();
  };

  const db = getDatabase();
  const dbPantry = ref(db, 'users/userID/pantry')
  const dbRecipes = ref(db, 'users/userID/recipes')

  useEffect(() => {
    get(dbPantry).then((snapshot) => {
      if(snapshot.exists()) {
        setList(snapshot.val());
        console.log(snapshot.val());
        console.log(snapshot.val().map(item => item.name))
        console.log(snapshot.val().map(item => item.name.toLowerCase()))
      }
      else {
        set(dbPantry, list);
      }
    }, []);
    get(dbRecipes).then((snapshot) => {
      if(snapshot.exists()) {
        setRecipes(snapshot.val());
      }
      else {
        set(dbRecipes, recipes);
      }
    }, []);
  }, []);

  useEffect(() => {
    onValue(dbPantry, (snapshot) => {
      if(snapshot.exists()) {
        setList(snapshot.val());
      }
    });
    
    onValue(dbRecipes, (snapshot) => {
      if(snapshot.exists()) {
        setRecipes(snapshot.val());
      }
    });
    
  }, []);

  useEffect(() => {
    set(dbPantry, list);
  }, [list]);

  useEffect(() => {
    set(dbRecipes, recipes);
  }, [recipes]);


  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const [newIngredient, setNewIngredient] = useState("");
  const [newIngredientQty, setNewIngredientQty] = useState(1);
  const handleAddIngredient = () => {
    if(newIngredient == '' || isNaN(+newIngredientQty)) {
      Toast.show({
        type: 'error',
        text1: 'Ingredient needs a name or quantity'
      })
      return;
    }
    const ingred = newIngredient;
    const qty = newIngredientQty
    setNewIngredient('');
    setNewIngredientQty(1);
    setRecipeIngredients([...recipeIngredients, {name: ingred, Qty: newIngredientQty}]);
  }

  const [recipeSteps, setRecipeSteps] = useState([]);
  const [newStep, setNewStep] = useState("");
  const handleAddStep = () => {
    if(newStep == '') {return;}
    const step = newStep;
    setNewStep('');
    setRecipeSteps([...recipeSteps, step]);
  }
  const handleDeleteRecipe = (index) => {
    setRecipes(recipes.filter((item, i) => i !== index));
  };
  const handleDeleteRecipeIngredients = (index) => {
    setRecipeIngredients(recipeIngredients.filter((item, i) => i !== index))
  }
  const handleDeleteRecipeSteps = (index) => {
    setRecipeSteps(recipes.filter((item, i) => i !== index))
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
        {/* MEAL PLAN CONTAINER */}
        <Surface style={styles.mealContainer}>
        </Surface>
        {/* Pantry LIST CONTAINER */}
        <View style={{width: '45%',}}>
          <BlurView style = {{...styles.pantryContainer, flex:1, backgroundColor: BGColor, borderRadius: '10px', overflow: 'hidden'}}>
            <View style={styles.iconcontainer}>
                <Text style={styles.pantryText}> Pantry </Text>
            </View>
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
                    ></IconButton>
                    </View>
                    {(item.ID != -1) && <List.Accordion style={{backgroundColor: DGreen}} title="Nutrional Info" titleStyle={{color: LGreen}}>
                      <Text style={styles.itemDetails}>{item.foodData}</Text>
                    </List.Accordion>}
                  </Surface>
                ))}
              </List.Section>
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={showItemAdder} style={styles.showAdderButton}><Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', alignSelf: 'center'}}>Add Pantry Item</Text></TouchableOpacity>
            </View>

            {/* PANTRY MODAL */}
            <Modal style={styles.groceryModal} visible={itemAdderVisible} onDismiss={hideItemAdder}>
              <Card style={styles.itemAdder}>
                <View style={{flexDirection: 'row'}}>
                  <TextInput placeholder='Item name' activeUnderlineColor = "#2AA198" onChangeText={setNewItemName} textColor="#2AA198" value={newItemName} style={{width: '75%', backgroundColor: 'white', border: 'none'}}/>
                  <TextInput placeholder='Qty.' activeUnderlineColor = "#2AA198" onChangeText={setNewItemQty} textColor="#2AA198" value={newItemQty} style={{width: '25%', backgroundColor: 'white'}} keyboardType='numeric'/>
                </View>
                <SelectList setSelected={setCategory} data={categories} save="key" inputStyles={{color: LGreen}} dropdownTextStyles={{color: LGreen}}/>
                <View style={{border: '0px', flexDirection:'row', justifyContent:'space-between', paddingVertical: 10, paddingHorizontal: 5}}>
                <Button onPress={handleAddItem} buttonColor={DGreen} textColor={LGreen}>
                  <Text style = {{fontSize: 20, fontWeight: 'bold', color: LGreen}}> Save </Text>
                </Button>
                <Button onPress={hideItemAdder} buttonColor={DGreen} textColor={LGreen}>
                  <Text style = {{fontSize: 20, fontWeight: 'bold', color: LGreen}}> Cancel </Text>
                </Button>
                </View>
              </Card>
            </Modal>
          </BlurView>
        </View>

        {/* RECIPE LIST CONTAINER */}
        <View style={{width: '45%', height: '45%'}}>
          <BlurView style = {{...styles.pantryContainer, flex:1, backgroundColor: BGColor, borderRadius: '10px', overflow: 'hidden'}}>
            <View style={styles.iconcontainer}>
                <TouchableOpacity style={styles.iconbackground}  onPress={() => {setShouldShowNewRecipe(!shouldShowNewRecipe); setShouldShowSavedRecipes(false); }}>
                  <Text style={styles.recipeText}>New Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconbackground} onPress={() => {setShouldShowSavedRecipes(!shouldShowSavedRecipes); setShouldShowNewRecipe(false);}}>
                  <Text style={styles.recipeText}>Saved Recipes</Text>
                </TouchableOpacity>
              </View>
              {shouldShowNewRecipe ? 
                (
                  <>
                  
              <ScrollView>
                <List.Section style={{backgroundColor: 'red'}}>
                  {recipes.map((item, index) => (
                    <Surface>
                    <Surface key={item.name} style={{...styles.itemContainer, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
                      <View style={styles.itemDetailsContainer}>
                        <View style ={{justifyContent: 'space-between', flexDirection: 'row'}}>
                          <Text style={styles.itemText}>{item.name}</Text>
                        </View>
                      </View>
                      <IconButton
                        onPress={() => handleDeleteRecipe(index)}
                        icon="delete"
                        iconColor={LGreen}
                      >
                      </IconButton>
                    </Surface>
                    {(item.ingredients) && <List.Accordion title='Ingredients' style={{backgroundColor: DGreen}} titleStyle={{color: LGreen}}>
                      {item.ingredients.map((itemIng, iIndex) => (
                        <Surface key={itemIng} style={{...styles.itemContainer, flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{...styles.itemText, paddingLeft: 10}}>{itemIng.name}</Text>
                          <Text style={{...styles.itemText, paddingRight: 10}}>{itemIng.Qty}</Text>
                          <View style={{flexDirection:'row'}}>
                            <IconButton
                              onPress={ async () => {
                                handleAddItemFromRecipe(itemIng.name, itemIng.Qty);
                              }}
                              icon="plus"
                              iconColor={LGreen}
                            >
                            </IconButton>
                          </View>
                        </Surface>
                      ))}
                    </List.Accordion>}
                    {(item.steps) && <List.Accordion title='Steps' style={{backgroundColor: DGreen}} titleStyle={{color: LGreen}}>
                      {item.steps.map((itemStep, sIndex) => (
                        <Surface key={itemStep} style={{...styles.itemContainer, flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{...styles.itemText, paddingLeft: 10}}>{itemStep}</Text>
                        </Surface>
                      ))}
                    </List.Accordion>}
                    </Surface>
                  ))}
                </List.Section>
              </ScrollView>
              <View style={{flexDirection: 'row', paddingHorizontal: '1%', justifyContent: 'center'}}>
                <Button onPress={showRecipeAdder} style={{...styles.showAdderButton}}><Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Add Recipe</Text></Button>
              </View>
              

              <Modal visible={recipeAdderVisible} onDismiss={hideRecipeAdder}>
              <Card style={styles.itemAdder}>
                <TextInput placeholder='Recipe name' activeUnderlineColor = "#2AA198" onChangeText={setNewRecipeName} textColor="#2AA198" value={newRecipeName} style={{minWidth: '80%', backgroundColor: 'white', borderRadius: 0}}/>
                <View style={{flexDirection:'row', justifyContent: 'space-between', alignContent: 'center'}}>
                  <TextInput placeholder='Ingredient' activeUnderlineColor = "#2AA198" onChangeText={setNewIngredient} textColor="#2AA198" value={newIngredient} style={{width: '60%', backgroundColor: 'white', borderRadius: 0}}/>
                  <TextInput placeholder='Qty.' activeUnderlineColor = "#2AA198" onChangeText={setNewIngredientQty} textColor="#2AA198" value={newIngredientQty} style={{width: '20%', backgroundColor: 'white', borderRadius: 0}} keyboardType='numeric'/>
                  <Button onPress={handleAddIngredient} buttonColor={'white'} textColor={LGreen} style={{borderRadius: 0, border: '1px solid #2AA198', minWidth: '20%', flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                    Add
                  </Button>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-between', alignContent: 'center'}}>
                  <TextInput placeholder='Step' activeUnderlineColor = "#2AA198" onChangeText={setNewStep} textColor="#2AA198" value={newStep} style={{minWidth: '80%', backgroundColor: 'white', borderRadius: 0}}/>
                  <Button onPress={handleAddStep} buttonColor={'white'} textColor={LGreen} style={{borderRadius: 0, border: '1px solid #2AA198',  minWidth: '20%', flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                    Add
                  </Button>
                </View>
                <View style={{maxHeight: '60%'}}>
                <ScrollView>
                <List.Accordion title='Ingredients' style={{backgroundColor: 'white'}} titleStyle={{color: LGreen}}>
                  {recipeIngredients.map((item, index) => (
                    <Surface key={item} style={{...styles.itemContainer, flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{...styles.itemText, paddingLeft: 10}}>{item.name}</Text>
                      <Text style={styles.itemText}>{item.Qty}</Text>
                      <IconButton
                        onPress={() => handleDeleteRecipeIngredients(index)}
                        icon="delete"
                        iconColor={LGreen}
                      >
                      </IconButton>
                    </Surface>
                  ))}
                </List.Accordion>
                <List.Accordion title='Steps' style={{backgroundColor: 'white'}} titleStyle={{color: LGreen}}>
                  {recipeSteps.map((item, index) => (
                    <Surface key={item} style={{...styles.itemContainer, flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{...styles.itemText, paddingLeft: 10}}>{item}</Text>
                      <IconButton
                        onPress={() => handleDeleteRecipeSteps(index)}
                        icon="delete"
                        iconColor={LGreen}
                      >
                      </IconButton>
                    </Surface>
                  ))}
                </List.Accordion>
                </ScrollView>
                </View>
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
            </>
                ) : null}

            {shouldShowSavedRecipes ? (
              <>
                <ScrollView></ScrollView>
                <View style={{flexDirection: 'row', paddingHorizontal: '1%', justifyContent: 'center'}}>
                  <Button onPress={handleNavigate} style={{...styles.showAdderButton}}><Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Find More Recipes</Text></Button>
                </View>
              </>
            ):null}
        
          </BlurView>
        </View>
          <Toast />
      </SafeAreaView>
    </LinearGradient>
  );
};

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
  mealContainer: {
    flexDirection: 'row',
    alignContent: "space-around",
    justifyContent: "space-evenly",
    width: '95%',
    height: '45%',
    borderRadius: '10px',
    backgroundColor: BGColor
  },
  mealCard: {
    flex: 1,
    maxWidth: '12.5%',
    height: '5%',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
    padding: 10,
  },
  addButton: {
    backgroundColor: DGreen,
    marginTop: 10,
    alignSelf: 'center',
  },
  showAdderButton: {
    backgroundColor: DGreen,
    marginTop: 10,
    width: '110%',
    alignSelf: 'center',
    justifyContent: 'center',
    border: '1px solid white',
    borderRadius: '10px'
  },
  moreRecipesButton: {
    backgroundColor: DGreen,
    marginTop: 10,
    width: '90%',
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
    fontSize: 20,
    color: LGreen
  },
  deleteButton: {
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: LGreen
  },
  itemAdder: {
    width: '95%',
    height: '100%',
    alignSelf: 'center',
  },
  groceryModal: {
    alignSelf: 'center',
    /* offset-x | offset-y | blur-radius | color */
    boxShadow: '10px 5px 5px 2px rgba(0, 0, 0, 0.2);',
    
  },
  iconcontainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: DGreen,
    border: '1px solid white',
    borderRadius: '10px'
  },
  iconbackground: {
    display: 'flex',
    width: '50%',
    height: '50px',
    backgroundColor: DGreen,
    justifyContent: 'center',
    border: '1px solid white',
    borderRadius: '10px'
  },
  recipeText: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',

  },
  pantryText: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: '10px',
    marginBottom: '10px',

  },
  pantryContainer: {
    width: "95%",
    height: "80%",
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: "5px"
  },
  
});


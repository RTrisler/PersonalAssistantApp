import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import {Dimensions} from 'react-native';
import { Divider, Card, Button, Modal, List, Surface, IconButton } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { useEffect, useState } from 'react';
import { BlurView } from 'expo-blur';
import { SelectList } from 'react-native-dropdown-select-list';
import RecipeList from "./RecipeList"

const BGColor = "#003847";
const LGreen = "#2AA198";
const DGreen = "#002B36";
const SurfaceColor = "#00181f";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function GroceryAndDietDashboard() {
  //#region  FONTS
  const [fontsLoaded] = useFonts({
    'GothamBold': require('/assets/fonts/GothamBold.ttf'),
    'GothamBook': require('/assets/fonts/GothamBook.ttf'),
    'GothamLight': require('/assets/fonts/GothamLight.ttf'),
    'GothamMedium': require('/assets/fonts/GothamMedium.ttf'),
    'Elnath': require('/assets/fonts/ELNATH.ttf'),
  });
  //#endregion

  //#region PANTRY ITEM ADD/DELETE
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

  //vars for adding items
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
    //#endregion

  //#region RECIPE ITEM ADD/DELETE
  const [recipeAdderVisible, setRecipeAdderVisible] = useState(false);
  const [chooseRecipeVisible, setChooseRecipeVisible] = useState(false);
  const [recipeDataVisible, setRecipeDataVisible] = useState(false);
  const hideRecipeAdder = () => {
    setRecipeAdderVisible(false);
  };
  const showRecipeAdder = () => {
    setRecipeAdderVisible(true);
  };
  const hideChooseRecipe = () => {
    setChooseRecipeVisible(false);
  };
  const showChooseRecipeVisible = () => {
    setChooseRecipeVisible(true);
  };
  const hideRecipeData = () => {
    setRecipeDataVisible(false);
  };
  const showRecipeData = () => {
    setRecipeDataVisible(true);
  };
  const [newRecipeName, setNewRecipeName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const handleAddRecipe = () => {
    if(newRecipeName == '') { return; }
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
  //#endregion
  
  //#region RECIPE SEARCH
  const [mealData, setMealData] = useState(null)
  const [recipeData, setRecipeData] = useState(null)
  const [calories, setCalories] = useState(2000)
  const [ingredient, setIngredient] = useState('')

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=4edd629e3fe94477b016ab3c541c35bd&timeFrame=day&targetCalories=${calories}`
    )
      .then(response => response.json())
      .then(data => {
        setMealData(data)
        console.log(data);
      })
      .catch(() => {
        console.log("error")
      })
  }

  function getRecipeData() {
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=6&ranking=2&ignorePantry=true&apiKey=4edd629e3fe94477b016ab3c541c35bd`
    )
      .then(response => response.json())
      .then(data => {
        setRecipeData(data)
        console.log(data);
      })
      .catch(() => {
        console.log("error with ingredients")
      })
  }

  function handleChangeCalories(e) {
    setCalories(e.target.value)
  }

  function handleChangeIngredient(e) {
    setIngredient(e.target.value)
  }
  //#endregion

  const [findMoreVisible, setfindMoreVisible] = useState(false);
  const [mealPlannerVisible, setmealPlannerVisible] = useState(true);
  const showFindMore = () => {setfindMoreVisible(true);setmealPlannerVisible(false);};
  const hideFindMore = () => {setfindMoreVisible(false);setmealPlannerVisible(true);};
  const daysAbv = ['Sun.', 'Mon.', 'Tues', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
  const [meals, setMeals] = useState([
    [{name: 'null'},{name: 'null'},{name: 'null'}],
    [{name: 'null'},{name: 'null'},{name: 'null'}],
    [{name: 'null'},{name: 'null'},{name: 'null'}],
    [{name: 'null'},{name: 'null'},{name: 'null'}],
    [{name: 'null'},{name: 'null'},{name: 'null'}],
    [{name: 'null'},{name: 'null'},{name: 'null'}],
    [{name: 'null'},{name: 'null'},{name: 'null'}],]);
  const [activeRecipeSlot, setActiveRecipeSlot] = useState([-1,-1]);

  const dbMeals = ref(db, 'users/userID/Meals')

  useEffect(() => {
    get(dbMeals).then((snapshot) => {
      if(snapshot.exists()) {
        setMeals(snapshot.val());
      }
      else {
        set(dbMeals, meals);
      }
    }, []);
  }, []);

  useEffect(() => {
    onValue(dbMeals, (snapshot) => {
      if(snapshot.exists()) {
        setMeals(snapshot.val());
      }
    });
  }, []);

  useEffect(() => {
    set(dbMeals, meals);
  }, [meals]);

  return (
    <LinearGradient
        // Background Linear Gradient
        colors={[ 'black', 'black']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        { /* PANTRY */}
        <Surface style={styles.pantry}>
          <Surface
            elevation={5}
            style={styles.pantryTopBox}> 
              <Text style={styles.pantryText}> Your Pantry </Text>
              <IconButton
                icon="plus"
                iconColor={"gray"}
                size={30}
                style={styles.iconButton}
                onPress={showItemAdder}
                />
          </Surface>
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
        </Surface>
         
        {/* MEALS/RECIPE FINDER */}
        <Surface style={styles.meals}>
          {findMoreVisible ?
            (
              <>
                <View style={styles.searchContainer}>
                  <Surface 
                    style={styles.topControl}
                    elevation={5}
                  >
                    <View style={styles.backBtnContainer}>
                      <IconButton
                      icon="arrow-left"
                      iconColor={"gray"}
                      size={30}
                      style={styles.iconButton}
                      onPress={hideFindMore}
                      />
                      <Text style={{...styles.mealsText, alignSelf: 'center'}}> Meal Plan </Text>
                    </View>

                    
                    <Text style={styles.titleText}>Find Recipes</Text>
                    

                    <View style={{width: '40%', marginTop: '10px', borderWidth: '1px', flexDirection: 'row'}}>
                      <TextInput
                        placeholder="Ingredient e.g. apple"
                        value={ingredient}
                        onSubmitEditing={getRecipeData}
                        onChangeText={ingredient => setIngredient(ingredient)}
                        style={{width: '100%', height: '100%', backgroundColor: 'gray'}}
                      />
                      <TouchableOpacity
                        style={styles.button}
                        onPress={getRecipeData}
                      >
                        <Text>Search</Text>
                      </TouchableOpacity>
                    </View>
                    
                    
                  </Surface>
                  {/*{mealData && <MealList mealData={mealData} />} */}
                  <ScrollView 
                    vertical={true} 
                    pagingEnabled={true} 
                    showsHorizontalScrollIndicator={true} 
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}
                    bounces={false}
                    style={styles.recipeContainer}>
                    {recipeData && <RecipeList recipeData={recipeData} />}
                  </ScrollView>
                  
                </View>
              </>
            ): null}
          {mealPlannerVisible ? 
            (
              <>
                <Surface
                  elevation={5}
                  style={styles.mealsTopBox}> 
                    <Text style={styles.mealsText}> Meal Planner </Text>
                    <View style={styles.findMoreContainter}>
                      <Text style={{...styles.findMoreText, alignSelf: 'center'}}> FindMoreRecipes </Text>
                      <IconButton
                        icon="arrow-right"
                        iconColor={"gray"}
                        size={30}
                        style={styles.iconButton}
                        onPress={showFindMore}
                      /> 
                    </View>
                </Surface>
                <ScrollView
                  vertical={true}
                  showsVerticalScrollIndicator={false}
                  pagingEnabled={true}  
                  alwaysBounceHorizontal={false}
                  alwaysBounceVertical={false}
                  bounces={false}
                  style={styles.mealScroll}>
                      {/*for each day */}
                      {meals.map((day, index) => (
                        <LinearGradient
                        // Background Linear Gradient
                        colors={[ DGreen, 'white']}
                        style={styles.dayCard}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Text style={styles.dayText}>{daysAbv[index]}</Text>
                        <Divider style={{ width: 2, height: '90%', alignSelf: 'center', marginLeft: '300px', zIndex: 1}} />
                        <View style={styles.mealCardContainer}>
                          {/*for each meal of the day*/}
                          {day.map((meal, jndex) => (
                          <BlurView intensity={30} tint='dark' style={styles.mealCard}>
                            {meal.name == 'null' && (<IconButton
                              icon="plus"
                              iconColor={"white"}
                              size={50}
                              style={{alignSelf: 'center'}}
                              onPress={() => {
                                setActiveRecipeSlot([index,jndex]);
                                showChooseRecipeVisible();
                              }}
                              />)}
                              {/*REID RIGHT HERE*/}
                              {meal.name != 'null' && (
                                <BlurView intensity={0} tint='dark' style={{...styles.mealCard, height: '100%', marginTop: 0, marginBottom: 0, border: '1px solid black'}}>
                                  <Text style={{color: 'white', fontSize: 30, fontFamily: 'GothamMedium', fontWeight: 'bold', justifyContent: 'space-around', alignItems: 'center'}}>{meal.name}</Text>
                                  <IconButton
                                    onPress={() => {
                                      let newMeals = meals;
                                      meals[index][jndex] = {name: 'null'};
                                      setMeals(newMeals);
                                      set(dbMeals, newMeals);
                                    }}
                                    icon="delete"
                                    iconColor={'white'}
                                  ></IconButton>
                                </BlurView>
                              )}
                          </BlurView>))}
                        </View>
                      </LinearGradient>))}


                </ScrollView>
              </>
            ): null}
          
          
        </Surface>

        {/* RECIPES */}
        <Surface style={styles.recipes}>
          <Surface
            elevation={5}
            style={styles.pantryTopBox}> 
              <Text style={styles.pantryText}> Recipes </Text>
              <IconButton
                icon="plus"
                iconColor={"gray"}
                size={30}
                style={styles.iconButton}
                onPress={showRecipeAdder}
                />
          </Surface>

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
                </List.Accordion> }
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

        </Surface>

        <Modal visible={chooseRecipeVisible} onDismiss={hideChooseRecipe} style={styles.recipesModal}>
            <Surface
              elevation={5}
              style={styles.pantryTopBox}> 
                <Text style={styles.pantryText}> Select Recipe </Text>
                <IconButton
                  icon="arrow-collapse"
                  iconColor={"gray"}
                  size={30}
                  style={styles.iconButton}
                  onPress={hideChooseRecipe}
                  />
            </Surface>

            <ScrollView>
              <List.Section style={{backgroundColor: 'red'}}>
                {recipes.map((item, index) => (
                  <Surface>
                  <TouchableOpacity onPress={
                    () => {
                      const newMeals = meals;
                      newMeals[activeRecipeSlot[0]][activeRecipeSlot[1]] = item;
                      console.log(newMeals);
                      set(dbMeals, newMeals);
                      setMeals(newMeals);
                      hideChooseRecipe();
                    }} 
                    key={item.name} 
                    style={{...styles.itemContainer, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
                    <View style={styles.itemDetailsContainer}>
                      <View style ={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={styles.itemText}>{item.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
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
                  </List.Accordion> }
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
        </Modal>
       
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
  },
  scrollContainer: {
    height: '100%',
  },
  mealScroll: {
    paddingTop: '30px',
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    padding: '10px',
  },
  pantry: {
    width: 300,
    backgroundColor: BGColor,
    borderRadius: '10px',
    flexDirection: 'column',
  },
  meals: {
    flexGrow: 1,
    backgroundColor: BGColor,
    borderRadius: '10px',
    minWidth: "40%",
    maxWidth: "70%",
    marginLeft: "10px",
    marginRight: "10px",
  },
  weekContainer: {
    flex: 1,
  },
  recipes: {
    width: 300,
    backgroundColor: BGColor,
    borderRadius: '10px',
    flexDirection: 'column',
  },
  recipesModal: {
    marginLeft: windowWidth - 325,
    width: 300,
    backgroundColor: BGColor,
    borderRadius: '10px',
    flexDirection: 'row',
    marginTop: '10px',
  },
  pantryTopBox: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BGColor,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  mealsTopBox: {
    height: '25%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGColor,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  pantryText: {
    fontFamily: 'GothamBold',
    fontSize: 35,
    color: 'white',
    marginLeft: '10px',
  },
  mealsText: {
    fontFamily: 'GothamBold',
    fontSize: 70,
    color: 'white',
  },
  findMoreText: {
    fontFamily: 'GothamBold',
    fontSize: 25,
    color: 'white',
  },
  iconButton: {
    marginRight: '15px',
  },
  itemDetailsContainer: {
    paddingLeft: 10,
    flex: 1,
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
  groceryModal: {
    alignSelf: 'center',
    /* offset-x | offset-y | blur-radius | color */
    boxShadow: '10px 5px 5px 2px rgba(0, 0, 0, 0.2);', 
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
  itemDetails: {
    paddingLeft: 10,
    fontSize: 20,
    color: LGreen
  },
  recipeFinderButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 10,
    marginRight: 10
  },
  topControl: {
    height: '25%',
    backgroundColor: BGColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: '10px',
    borderBottomStartRadius: '10px',
  },
  button: {
    backgroundColor: 'white',
    width: '30%',
    height: '30px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeContainer: {
    flex: 1,
  },
  fitToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 'auto'
  },
  titleText: {
    fontFamily: 'GothamBold',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#fff',
    marginBottom: '5px'
  },
  backButtonText: {
    fontFamily: 'GothamBold',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: '5px'
  },
  backBtnContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: "center",
    left: 0,
    top: 0,
  },
  backButton: {
    width: '250px',
    alignSelf: 'left',
  },
  top: {
    height: "5%",
    width: "95%",
    alignContent: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    width:"33.3%",
    alignItems: "center",
    marginBottom: '50px'
  },
  findMoreContainter: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: "center",
    top: 0,
    right: 0,
  },
  dayCard: {
    width: "98%",
    height: 300,
    backgroundColor: DGreen,
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    borderRadius: '15px',
    flexDirection: 'row',
  },
  spacer: {
    width: "100%",
    height: 200,
  },
  dayText: {
    position: "absolute",
    left: 0,
    fontFamily: 'GothamBook',
    fontSize: '120px',
    color: 'white',
    alignSelf: 'center',
    lineHeight: '120px',
    zIndex: 1
  },
  mealCardContainer: {
    padding: '10px',
    flex: 1,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    zIndex: 2,
  },
  mealCard: {
    height: '98%',
    width: '220px',
    backgroundColor: 'white',
    borderRadius: '10px',
    justifyContent: 'center',
    alignContent: 'center',
  }
})
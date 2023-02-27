import React, { useState } from 'react';
import { View,  StyleSheet,SafeAreaView, Platform } from 'react-native';
import { TextInput, List, Checkbox, Divider, Surface, Text, Button, IconButton, Modal, Card, HelperText } from 'react-native-paper';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-gesture-handler';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, snackbar, setOptions, Popup, Input, Textarea, formatDate, getJson, SegmentedGroup, SegmentedItem } from '@mobiscroll/react';

const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"
const types = [{
  id: 1,
  name: 'Breakfast',
  color: '#e20f0f',
  kcal: '300 - 400 kcal',
  icon: '🍳'
}, {
  id: 2,
  name: 'Snack',
  color: '#157d13',
  kcal: '100 - 200 kcal',
  icon: '🍌'
}, {
  id: 3,
  name: 'Lunch',
  color: '#32a6de',
  kcal: '500 - 700 kcal',
  icon: '🍜'
}, {
  id: 4,
  name: 'Dinner',
  color: '#e29d1d',
  kcal: '400 - 600 kcal',
  icon: '🥙'
}, {
  id: 5,
  name: 'Snack',
  color: '#68169c',
  kcal: '100 - 200 kcal',
  icon: '🥨'
}];

const viewSettings = {
  timeline: {
      type: 'week',
      eventList: true
  }
};

const responsivePopup = {
  medium: {
      display: 'center',
      width: 400,
      fullScreen: false,
      touchUi: false,
      showOverlay: false
  }
};

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
    if(newItemName == '' || !isNaN(+newIngredientQty)) {
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
  const [recipeView, setRecipeView] = useState(false);
  const [mealPlanView, setMealPlanView] = useState(false);

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
    if(newRecipeName == '') { return; }
    const recName = newRecipeName;
    const recIng = recipeIngredients;
    const recStep = recipeSteps;
    setNewRecipeName('');
    setRecipeIngredients([]);
    setRecipeSteps([]);
    setRecipes([...recipes, {name: recName, ingredients: recIng, steps: recStep}]);
    hideRecipeAdder();
  };

  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const [newIngredient, setNewIngredient] = useState("");
  const [newIngredientQty, setNewIngredientQty] = useState(1);
  const handleAddIngredient = () => {
    if(newIngredient == '' || !isNaN(+newIngredientQty)) {return;}
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

  const [myMeals, setMyMeals] = React.useState([]);
  const [tempMeal, setTempMeal] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [name, setName] = React.useState('');
  const [calories, setCalories] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [headerText, setHeader] = React.useState('');
  const [type, setType] = React.useState(1);
  
  React.useEffect(() => {
      getJson('https://trial.mobiscroll.com/meal-planner/', (events) => {
          setMyMeals(events);
      }, 'jsonp');
  }, []);

  const saveEvent = React.useCallback(() => {
      const newEvent = {
          id: tempMeal.id,
          title: name,
          calories: calories,
          notes: notes,
          start: tempMeal.start,
          end: tempMeal.end,
          resource: tempMeal.resource,
      };
      if (isEdit) {
          // update the event in the list
          const index = myMeals.findIndex(x => x.id === tempMeal.id);;
          const newEventList = [...myMeals];

          newEventList.splice(index, 1, newEvent);
          setMyMeals(newEventList);
      } else {
          // add the new event to the list
          setMyMeals([...myMeals, newEvent]);
      }
      // close the popup
      setOpen(false);
  }, [isEdit, myMeals, calories, notes, name, tempMeal]);

  const deleteEvent = React.useCallback((event) => {
      setMyMeals(myMeals.filter(item => item.id !== event.id));
      setTimeout(() => {
          snackbar({
              button: {
                  action: () => {
                      setMyMeals(prevEvents => [...prevEvents, event]);
                  },
                  text: 'Undo'
              },
              message: 'Event deleted'
          });
      });
  }, [myMeals]);

  const loadPopupForm = React.useCallback((event) => {
      setName(event.title);
      setCalories(event.calories);
      setNotes(event.notes);
  }, []);

  // handle popup form changes
  const nameChange = React.useCallback((ev) => {
      setName(ev.target.value);
  }, []);

  const caloriesChange = React.useCallback((ev) => {
      setCalories(ev.target.value);
  }, []);

  const notesChange = React.useCallback((ev) => {
      setNotes(ev.target.checked);
  }, []);

  const onDeleteClick = React.useCallback(() => {
      deleteEvent(tempMeal);
      setOpen(false);
  }, [deleteEvent, tempMeal]);

  // scheduler options
  const onEventClick = React.useCallback((args) => {
      const event = args.event;
      setHeader('<div>New meal</div><div class="md-meal-type">' +
              formatDate('DDDD, DD MMMM YYYY', new Date(event.start)) + '</div>');
      setType(event.resource);
      setEdit(true);
      setTempMeal({ ...event });
      // fill popup form with event data
      loadPopupForm(event);
      setOpen(true);
  }, [loadPopupForm]);

  const onEventCreated = React.useCallback((args) => {
      const event = args.event;
      const resource = types.find((obj) => { return obj.id === event.resource });
      setHeader('<div>' + resource.name + '</div><div class="md-meal-type">' +
          formatDate('DDDD, DD MMMM YYYY', new Date(event.start)) + '</div>');
      setType(event.resource);
      setEdit(false);
      setTempMeal(event)
      // fill popup form with event data
      loadPopupForm(event);
      // open the popup
      setOpen(true);
  }, [loadPopupForm]);

  const typeChange = React.useCallback((ev) => {
      const value = +ev.target.value;
      setType(value);
      setTempMeal({...tempMeal, resource: value});
  }, [tempMeal]);

  const onEventDeleted = React.useCallback((args) => {
      deleteEvent(args.event)
  }, [deleteEvent]);

  // popup options
  const popupButtons = React.useMemo(() => {
      if (isEdit) {
          return ['cancel', {
              handler: () => {
                  saveEvent();
              },
              keyCode: 'enter',
              text: 'Save',
              cssClass: 'mbsc-popup-button-primary'
          }];
      } else {
          return ['cancel', {
              handler: () => {
                  saveEvent();
              },
              keyCode: 'enter',
              text: 'Add',
              cssClass: 'mbsc-popup-button-primary'
          }];
      }
  }, [isEdit, saveEvent]);

  const onClose = React.useCallback(() => {
      if (!isEdit) {
          // refresh the list, if add popup was canceled, to remove the temporary event
          setMyMeals([...myMeals]);
      }
      setOpen(false);
  }, [isEdit, myMeals]);
  
  const extendDefaultEvent = React.useCallback((args) => {
      return { 
          title: 'New meal',
          allDay: true
      };
  }, []);

  const renderMyResource = (resource) => {
      return <div className="md-meal-planner-cont">
          <div className="md-meal-planner-title" style={{ color: resource.color }}>
              <span className="md-meal-planner-icon" dangerouslySetInnerHTML={{ __html: resource.icon }}></span>
              {resource.name}
          </div>
          <div className="md-meal-planner-kcal">{resource.kcal}</div>
      </div>;
  }
  
  const myScheduleEvent = React.useCallback((args) => {
      const event = args.original;
      return <div className="md-meal-planner-event">
          <div className="md-meal-planner-event-title">{event.title}</div>
          {event.calories && <div className="md-meal-planner-event-desc">Calories {event.calories} kcal</div>}
      </div>
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      {groceryView && (
      <View style={{flex:1}}>
        <View style={{flexDirection: 'row', paddingHorizontal: '1%', justifyContent: 'space-between'}}>
          <Button onPress={showItemAdder} style={styles.showAdderButton}><Text style={{fontSize: 20, fontWeight: 'bold', color: LGreen}}>Add Grocery Item</Text></Button>
          <IconButton icon='book' iconColor={LGreen} onPress={toggleRecipeView}></IconButton>
          <IconButton icon='calendar' iconColor={LGreen} onPress={toggleMealPlanView}></IconButton>
        </View>
        <ScrollView>
        <List.Section style={{backgroundColor: BGColor}}>
          {list.map((item, index) => (
            <Surface key={item.name} style={{backgroundColor: BGColor, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{...styles.itemDetailsContainer, justifyContent: 'center'}}>
                  <View style ={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={styles.categoryText}>{item.name}</Text>
                    <Text style={styles.categoryText}>{item.itemCategory.value}</Text>
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
              {(item.ID != -1) && <List.Accordion style={{maxHeight: '3%'}}>
                <Text style={styles.itemDetails}>{item.foodData}</Text>
              </List.Accordion>}
            </Surface>
          ))}
        </List.Section>
        </ScrollView>
        </View>
        )}
        
        {recipeView && (
        <View style={{flex:1}}>
          <View style={{flexDirection: 'row', paddingHorizontal: '1%', justifyContent: 'space-between'}}>
            <Button onPress={showRecipeAdder} style={{...styles.showAdderButton}}><Text style={{fontSize: 20, fontWeight: 'bold', color: LGreen}}>Add Recipe</Text></Button>
            <IconButton icon='basket' iconColor={LGreen} onPress={toggleGroceryView}></IconButton>
            <IconButton icon='calendar' iconColor={LGreen} onPress={toggleMealPlanView}></IconButton>
          </View>
          <ScrollView>
        <List.Section style={{backgroundColor: DGreen}}>
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
            <List.Accordion title='Ingredients' style={{backgroundColor: DGreen}} titleStyle={{color: LGreen}}>
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
            </List.Accordion>
            <List.Accordion title='Steps' style={{backgroundColor: DGreen}} titleStyle={{color: LGreen}}>
              {item.steps.map((itemStep, sIndex) => (
                <Surface key={itemStep} style={{...styles.itemContainer, flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{...styles.itemText, paddingLeft: 10}}>{itemStep}</Text>
                </Surface>
              ))}
            </List.Accordion>
            </Surface>
          ))}
        </List.Section>
        </ScrollView>
        </View>
        )}

        {mealPlanView && (
         <View>
          <View style={{flexDirection: 'row', paddingHorizontal: '1%', justifyContent: 'space-between'}}>
            <View style={{minWidth: '70%'}}>
              <div>
                <Eventcalendar
                    view={viewSettings}
                    data={myMeals}
                    resources={types}
                    dragToCreate={false}
                    dragToResize={false}
                    dragToMove={true}
                    clickToCreate={true}
                    extendDefaultEvent={extendDefaultEvent}
                    onEventClick={onEventClick}
                    onEventCreated={onEventCreated}
                    onEventDeleted={onEventDeleted}
                    renderResource={renderMyResource}
                    renderScheduleEventContent={myScheduleEvent}
                    cssClass="md-meal-planner-calendar"
                />
                <Popup
                    display="bottom"
                    fullScreen={true}
                    contentPadding={false}
                    headerText={headerText}
                    buttons={popupButtons}
                    isOpen={isOpen}
                    onClose={onClose}
                    responsive={responsivePopup}
                    cssClass="md-meal-planner-popup"
                >
                  <SegmentedGroup onChange={typeChange} value={type}>
                    {types.map((type) => {
                        return <SegmentedItem value={type.id} key={type.id}>{type.name}</SegmentedItem>
                    })}
                  </SegmentedGroup>
                  <div className="mbsc-form-group">
                    <Input label="Name" value={name} onChange={nameChange} />
                    <Input label="Calories" value={calories} onChange={caloriesChange} />
                    <Textarea label="Notes" value={notes} onChange={notesChange} />
                  </div>
                  {isEdit && <div className="mbsc-button-group">
                    <Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete meal</Button>
                  </div>}
                </Popup>
              </div>
            </View>
            <IconButton icon='book' iconColor={LGreen} onPress={toggleRecipeView}></IconButton>
            <IconButton icon='basket' iconColor={LGreen} onPress={toggleGroceryView}></IconButton>
          </View>
         </View> 
        )}


        
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


        <Modal visible={recipeAdderVisible} onDismiss={hideRecipeAdder}>
          <Card style={styles.itemAdder}>
            <TextInput placeholder='Recipe name' activeUnderlineColor = "#2AA198" onChangeText={setNewRecipeName} textColor="#2AA198" value={newRecipeName} style={{minWidth: '80%', backgroundColor: DGreen, borderRadius: 0}}/>
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignContent: 'center'}}>
              <TextInput placeholder='Ingredient' activeUnderlineColor = "#2AA198" onChangeText={setNewIngredient} textColor="#2AA198" value={newIngredient} style={{minWidth: '60%', backgroundColor: DGreen, borderRadius: 0}}/>
              <TextInput placeholder='Qty.' activeUnderlineColor = "#2AA198" onChangeText={setNewIngredientQty} textColor="#2AA198" value={newIngredientQty} style={{minWidth: '20%', backgroundColor: DGreen, borderRadius: 0}} keyboardType='numeric'/>
              <Button onPress={handleAddIngredient} buttonColor={DGreen} textColor={LGreen} style={{borderRadius: 0, minWidth: '20%', flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                Add
              </Button>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignContent: 'center'}}>
              <TextInput placeholder='Step' activeUnderlineColor = "#2AA198" onChangeText={setNewStep} textColor="#2AA198" value={newStep} style={{minWidth: '80%', backgroundColor: DGreen, borderRadius: 0}}/>
              <Button onPress={handleAddStep} buttonColor={DGreen} textColor={LGreen} style={{borderRadius: 0, minWidth: '20%', flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                Add
              </Button>
            </View>
            <View style={{maxHeight: '60%'}}>
            <ScrollView>
            <List.Accordion title='Ingredients' style={{backgroundColor: BGColor}} titleStyle={{color: LGreen}}>
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
            <List.Accordion title='Steps' style={{backgroundColor: BGColor}} titleStyle={{color: LGreen}}>
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

        <Toast />
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
  showAdderButton: {
    backgroundColor: DGreen,
    marginTop: 10,
    minWidth: '70%'
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


// REcipe.js
import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, Button, ScrollView} from 'react-native';
import { getDatabase, ref, get, set} from 'firebase/database';
import { Chip, Surface, List} from 'react-native-paper';

const BGColor = "#003847";
const DGreen = "#002B36";
const LGreen = "#2AA198";

export default function Recipe({ meal }) {
  const [imageUrl, setImageUrl] = useState("")
  const [recipeData, setRecipeData] = useState(null)
  const [instructions, setInstructions] = useState(null)

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=4edd629e3fe94477b016ab3c541c35bd&includeNutrition=false`
    )
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.image)
        setRecipeData(data)
        console.log(data)
        console.log(data.analyzedInstructions)
      })
      .catch(() => {
        console.log("error")
      })
  }, [meal.id])

  const db = getDatabase();

  const [pantry, setPantry] = useState([]);
  const dbPantry = ref(db, 'users/userID/pantry')
  useEffect(() => {
    get(dbPantry).then((snapshot) => {
      if(snapshot.exists()) {
        setPantry(snapshot.val());
      }
      else {
        set(dbPantry, pantry);
      }
    }, []);
  }, []);


  return (
    <View style={{ width: '400px', margin: '10px', }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden", width: '400px' }}>
            <View>
                <Image
                    source={{uri:imageUrl}}
                    style={{
                        height: 250,
                        width: '400px'
                    }}
                />
            </View>
            <View style={{ padding: 10, width: '400px', height: '250px' }}>
                <Text>{meal.title}</Text>
                <Text style={{ color: "#777", paddingTop: 5 }}>
                Ingredients
                </Text>
                
                  <List.Section style={{backgroundColor: 'red'}}></List.Section>
                    {recipeData && <List.Accordion title='Ingredients' style={{backgroundColor: DGreen}} titleStyle={{color: LGreen}}>
                      {recipeData.extendedIngredients.map(ingredent => {
                        return <ScrollView
                          alwaysBounceHorizontal={false}
                          alwaysBounceVertical={false}
                          bounces={false}
                        ><Chip  
                          onPress={() => console.log('Pressed')} 
                          style={{width: 150, backgroundColor: (pantry.map(item => item.name.toLowerCase()).includes(ingredent.name.toLowerCase())) ? "#0f4f20" : "#660d19"}}
                          >
                            <Text style={{color: "white", }}>{ingredent.name}</Text>
                          </Chip></ScrollView>;
                        }) }
                        </List.Accordion>}
    
                    
                <Text style={{ color: "#777", paddingTop: 5 }}>
                Steps
                </Text>
                <List.Section style={{backgroundColor: 'red'}}>
                {recipeData && <List.Accordion title='Steps' style={{backgroundColor: DGreen}} titleStyle={{color: LGreen}}>
                  {recipeData.analyzedInstructions.map(instruction => {
                    return <ScrollView><Surface style={{...styles.itemContainer, justifyContent:'space-between'}} key={instruction.id}>{instruction.steps.map(step => {
                        return <Text key={step.id}>{step.step + " \n"}</Text>
                    })}</Surface></ScrollView>;
                    }) }
                    </List.Accordion>}
                </List.Section>
                <View style={styles.fitToText}>
                    <Button
                        title='Add To My Recipes'
                        color='#003847'
                        onPress={() => {
                          if (!recipeData || !recipeData.extendedIngredients || !recipeData.analyzedInstructions) { return; }

                          const db = getDatabase();
                          const dbRecipes = ref(db, 'users/userID/recipes')
                          console.log(recipeData);
                          console.log(recipeData.analyzedInstructions)
                          console.log(recipeData.analyzedInstructions[0])
                          const newRecipe = {
                            name: meal.title, 
                            ingredients: (recipeData.extendedIngredients != [] ? recipeData.extendedIngredients.map(ing => {return {name: ing.name, Qty: ing.amount}}) : []),
                            steps: (((recipeData.analyzedInstructions != []) && recipeData.analyzedInstructions[0]) ? recipeData.analyzedInstructions[0].steps.map(steps => steps.step) : [])
                          }

                          get(dbRecipes).then((snapshot) => {
                            console.log(snapshot.exists())
                            if(snapshot.exists()) {
                              let recipes = snapshot.val();
                              recipes = [...recipes, newRecipe]
                              set(dbRecipes, recipes);
                            }
                            else {
                              set(dbRecipes, [newRecipe])
                            }
                          });
                        }}
                        >

                    </Button>
                </View>
            </View>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    RecipeCard: {
      backgroundColor: BGColor,
      height: '150px',
      width: '150px'
    },
    RecipeTitle: {
        fontSize: '30px',
        alignContent: 'center',
        textAlign: 'center',
    },
})
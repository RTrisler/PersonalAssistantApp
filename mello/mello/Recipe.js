// REcipe.js
import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView} from 'react-native';
import { Surface} from "react-native-paper"
import { getDatabase, ref, get, set, onValue } from 'firebase/database';

const BGColor = "#003847";

export default function Recipe({ meal }) {
  const [imageUrl, setImageUrl] = useState("")
  const [recipeData, setRecipeData] = useState(null)
  const [instructions, setInstructions] = useState(null)

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=dcea05756d484c179cbba25cbddde02d&includeNutrition=false`
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
    <View style={{ flex: 1, margin: '10px', }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden", width: '600px' }}>
            <View>
                <Image
                    source={{uri:imageUrl}}
                    style={{
                        height: 300,
                        width: '600px'
                    }}
                />
            </View>
            <View style={{ padding: 10, width: '600px', height: '250px' }}>
                <Text>{meal.title}</Text>
                <Text style={{ color: "#777", paddingTop: 5 }}>
                Ingredients
                </Text>
                <ScrollView>
                    {recipeData && recipeData.extendedIngredients.map(ingredent => {
                        return <Text 
                                key={ingredent.id} 
                                style={{color: (pantry.map(item => item.name.toLowerCase()).includes(ingredent.name.toLowerCase())) ? "#22EE22" : "#EE2222"}}
                                >
                                  {ingredent.name}
                                </Text>;
                        }) }
                </ScrollView>
                    
                <Text style={{ color: "#777", paddingTop: 5 }}>
                Steps
                </Text>
                {recipeData && recipeData.analyzedInstructions.map(instruction => {
                    return <ScrollView key={instruction.id}>{instruction.steps.map(step => {
                        return <Text key={step.id}>{step.step + " \n"}</Text>
                    })}</ScrollView>;
                    }) }
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
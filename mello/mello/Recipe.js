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
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=da2e037dcf904218b7068c637a604454&includeNutrition=false`
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
                        return <Text key={ingredent.id}>{ingredent.name}</Text>;
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
                          console.log('hello')
                          get(dbRecipes).then((snapshot) => {
                            console.log('hello2')
                            console.log(snapshot.exists())
                            if(snapshot.exists()) {
                              console.log('hello3')
                              let recipes = snapshot.val();
                              recipes = [...recipes, {name: meal.title, ingredients: recipeData.extendedIngredients, steps: recipeData.analyzedInstructions}]
                              console.log(recipes.extendedIngredients);
                              console.log(recipes.analyzedInstructions);
                              set(dbRecipes, recipes);
                              console.log('hello4')
                            }
                            else {
                              set(dbRecipes, [{name: meal.title, ingredients: recipeData.extendedIngredients, steps: recipeData.analyzedInstructions}])
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
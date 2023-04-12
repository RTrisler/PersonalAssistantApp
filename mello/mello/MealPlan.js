//App.js
import React, { useState } from "react"
import MealList from "./MealList"
import RecipeList from "./RecipeList"
import { View, StyleSheet, Button, TouchableOpacity, ScrollView } from "react-native"
import { Surface, Text, TextInput} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Card from "./Card";


const BGColor = "#003847";

function MealPlan() {
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
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=1&ranking=2&ignorePantry=true&apiKey=4edd629e3fe94477b016ab3c541c35bd`
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

  return (
    <LinearGradient
        colors={[ BGColor, 'white']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
      <View style={styles.container}>
        <Surface 
          style={styles.topControl}
          elevation={5}
        >
          {/* 
          <input
            type="number"
            placeholder="Calories (e.g. 2000)"
            onChange={handleChangeCalories}
          />
          <button onClick={getMealData}>Get Daily Meal Plan</button>
          */}
          <TextInput
            placeholder="Ingredient e.g. apple"
            value={ingredient}
            onChangeText={ingredient => setIngredient(ingredient)}
            style={{width: '30%', }}
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress={getRecipeData}
          >
            <Text>Get Recipe</Text>
          </TouchableOpacity>
        </Surface>
        {/*{mealData && <MealList mealData={mealData} />} */}
        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={true} style={styles.recipeContainer}>
          {recipeData && <RecipeList recipeData={recipeData} />}
        </ScrollView>
        
      </View>
    </LinearGradient>
  )
}

export default MealPlan

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  topControl: {
      height: '200px',
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
  gradient: {
    height: '100%',
  },
  recipeContainer: {
    flex: 1,
  },
  fitToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 'auto'
  },
})
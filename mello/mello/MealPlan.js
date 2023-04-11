//App.js
import React, { useState } from "react"
import MealList from "./MealList"
import RecipeList from "./RecipeList"
import { View } from "react-native"

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
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&ranking=2&ignorePantry=true&apiKey=4edd629e3fe94477b016ab3c541c35bd`
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
    <View className="App">
      <View className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChangeCalories}
        />
        <button onClick={getMealData}>Get Daily Meal Plan</button>
        
        <input
          type="string"
          placeholder="Ingredient (e.g. apple)"
          onChange={handleChangeIngredient}
        />
        <button onClick={getRecipeData}>Get Recipe</button>
      </View>
      {mealData && <MealList mealData={mealData} />}
      {recipeData && <RecipeList recipeData={recipeData} />}
    </View>
  )
}

export default MealPlan
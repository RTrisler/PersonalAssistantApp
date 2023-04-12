// MealList.js
import React from "react"
import Meal from "./Meal"
import Recipe from "./Recipe"
import { View } from "react-native-web";

export default function RecipeList({ recipeData }) {
    console.log(recipeData);
  return (
    <View>
      <View style={{backgroundColor: 'red'}}>
        {recipeData.map(meal => {
          return <Recipe key={meal.id} meal={meal} />
        })}
      </View>
    </View>
  )
}

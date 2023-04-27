// MealList.js
import React from "react"
import Meal from "./Meal"
import Recipe from "./Recipe"
import { View } from "react-native-web";

export default function RecipeList({ recipeData }) {
  return (
    
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {recipeData.map(meal => {
            return <Recipe key={meal.id} meal={meal} />
        })}
    </View>
    
  )
}

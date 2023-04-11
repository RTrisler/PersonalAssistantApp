// MealList.js
import React from "react"
import Meal from "./Meal"
import Recipe from "./Recipe"

export default function RecipeList({ recipeData }) {
    console.log(recipeData);
  return (
    <main>
      <section>
      </section>

      <section className="meals">
        {recipeData.map(meal => {
          return <Recipe key={meal.id} meal={meal} />
        })}
      </section>
    </main>
  )
}

// REcipe.js
import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Surface} from "react-native-paper"

export default function Recipe({ meal }) {
  const [imageUrl, setImageUrl] = useState("")
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=cb1c464d94f142c08b156c5beddade8b&includeNutrition=false`
    )
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.image)
        console.log(data)

      })
      .catch(() => {
        console.log("error")
      })
  }, [meal.id])

  return (
    <Surface style={styles.RecipeCard}>
      <Text>{meal.title}</Text>
      <img src={imageUrl} alt="recipe" />
    </Surface>
  )
}

const styles = StyleSheet.create({
    RecipeCard: {
      height: '400px',
      width: '400px'
    },
})
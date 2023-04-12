// REcipe.js
import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView} from 'react-native';
import { Surface} from "react-native-paper"


const BGColor = "#003847";

export default function Recipe({ meal }) {
  const [imageUrl, setImageUrl] = useState("")
  const [recipeData, setRecipeData] = useState(null)
  const [instructions, setInstructions] = useState(null)

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=cb1c464d94f142c08b156c5beddade8b&includeNutrition=false`
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
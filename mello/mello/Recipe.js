// REcipe.js
import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Image, Button} from 'react-native';
import { Surface} from "react-native-paper"

const BGColor = "#003847";

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
            <View>
                <Image
                    source={{uri:imageUrl}}
                    style={{
                        height: 200,
                        width: 250
                    }}
                />
            </View>
            <View style={{ padding: 10, width: 250 }}>
                <Text>{meal.title}</Text>
                <Text style={{ color: "#777", paddingTop: 5 }}>
                Ingredients
                </Text>
                <Text style={{ color: "#777", paddingTop: 5 }}>
                Steps
                </Text>
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
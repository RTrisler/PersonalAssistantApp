import React  from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';


const BGColor = "#003847"


export default function Card() {
    return (
            <View style={{ backgroundColor: "red", borderRadius: 10, overflow: "hidden", width: '400px', marginLeft: '10px', marginTop: '10px' }}>
            <View>
                <Image
                    source={{uri:'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg'}}
                    style={{
                        height: 250,
                        width: 250
                    }}
                />
            </View>
            <View style={{ padding: 10, width: 250 }}>
                <Text>Title</Text>
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
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: BGColor,
        height: '350px',
        width: '300px',
        borderRadius: '10px'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
    },
    fitToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 'auto'
    },
})

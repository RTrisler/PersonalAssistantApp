import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { Divider, Surface, TextInput } from 'react-native-paper';
import VectorIcon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-web';
import Row from './Row';
import Col from './Column';
import Card from './Card';



const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

export default function CardContainer() {
    return (
        <Row>
            <Col customStyles={{"flex":1}}>
              <Card></Card>
            </Col>
            <Col customStyles={{"flex":1}}>
               <Text>Test 2</Text>
            </Col>
            <Col customStyles={{"flex":1}}>
               <Text>Test 3</Text>
            </Col>
        </Row>
    );
};
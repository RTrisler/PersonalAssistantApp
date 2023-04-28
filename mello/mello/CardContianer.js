import React from 'react';
import {Text} from 'react-native';

import Row from './Row';
import Col from './Column';
import Card from './Card';


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
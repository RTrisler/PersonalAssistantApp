import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import VectorIcon from 'react-native-vector-icons/Feather';

const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const ToDoCard = (props) => {

    const { data: { value }, index, handleClickEdit, handleDeleteTodo } = props;
    const [text, setTodo] = useState(value);
    const [btnDisabled, setBtnDisabled] = useState(true);

    const handleClickSave = () => {

        handleClickEdit({ text, index })
        setBtnDisabled(true)

    }

    const handleClickCheck = () => {

        setBtnDisabled(true)

    }

    const handleClick = () => {
        
        setBtnDisabled(false)
    
    }

    const EditIcon = () => <VectorIcon
        name='edit'
        size={24}
        onPress={handleClick}
    />

    const SaveIcon = () => <VectorIcon
        name='save'
        size={24}
        onPress={handleClickSave}
    />
    
    const CheckIcon = () => <VectorIcon
        name='check-square'
        size={24}
        onPress={handleClickCheck}
    />

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    selectionColor='white'
                    style={styles.input}
                    value={text}
                    disabled={btnDisabled}
                    onChangeText={(text) => setTodo(text)}
                />
                <View style={styles.buttonContainer}>
                    {
                        btnDisabled ? <EditIcon /> : <SaveIcon /> 
                    }
                    <CheckIcon></CheckIcon>
                    <VectorIcon
                        name='trash'
                        size={24}
                        onPress={() => handleDeleteTodo(index)}
                    />
                </View>
            </View>
            <Divider style={styles.divider} />
        </>
    );
};

export default ToDoCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 3,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 20,
        marginRight: 16
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
    divider: {
        borderBottomColor: DGreen,
        borderBottomWidth: 1
    }
})
import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Divider, Surface } from 'react-native-paper';
import TodoCard from './TodoCard';
import InlineInputAndButton from './InlineInputAndButton';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { db } from "./firebase";
import { useEffect } from 'react';

const BGColor = "#003847"
const LGreen = "#2AA198"
const DGreen = "#002B36"

const TodoAppScreen = () => {
    const [todos, setTodos] = useState([{ value: "Edit text here" }]);
    const [text, setText] = useState("");

    const dbTodoRef = ref(db, 'users/userID/todos');
    useEffect(() => {
        get(dbTodoRef).then((snapshot) => {
          if(snapshot.exists()) {
            setTodos(snapshot.val());
          }
        });
      }, []);
    useEffect(() => {
        storeToDo('userID', todos);
    }, [todos]);
    

    const handleChangeText = (text) => {
        setText(text);
    }

    const handleAddButton = (text) => {

        setTodos([...todos, { value: text }]);
        storeToDo("userID", text);
        setText("");


    }

    const handleClickEdit = ({ index: i, text }) => {

        setTodos(prevTodo => prevTodo.map((todo, index) => {

            if (index === i) {
                todo.value = text;
                return todo;
            }

            return todo;
        }));
        
    }

    const handleDeleteTodo = (i) => {

        setTodos(prevTodo => {

            prevTodo.splice(i, 1);
            const newTodo = [...prevTodo];
            return newTodo;
        });

    }

    function storeToDo(userId, todos) {
        const db = getDatabase();
        const reference = ref(db, 'users/' + userId + '/todos');
        set(reference, todos);
      }

    return (
        <>
            <Surface style={styles.container}>
                <Text style={styles.subtitle}>What're your plans for today ?</Text>
                <InlineInputAndButton
                    name='Add'
                    text={text}
                    handleChangeText={handleChangeText}
                    handleAddButton={handleAddButton}
                    placeholder='Enter your plan '
                    mode='contained'
                    style={{backgroundColor: DGreen}}
                />
                <Text style={[styles.subtitle, { fontSize: 22, paddingTop: 16, paddingBottom: 8 }]}> List Todo </Text>
                <Divider style={styles.divider} />
                {
                    todos.map((todo, index) => <TodoCard
                        key={index}
                        index={index}
                        data={todo}
                        handleClickEdit={handleClickEdit}
                        handleDeleteTodo={handleDeleteTodo}
                        />)
                }
            </Surface>
        </>
    );
};

export default TodoAppScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: '10px'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'DGreen',
    },
    subtitle: {
        fontSize: 20,
        color: DGreen,
        marginBottom: 16
    },
    divider: {
        borderBottomColor: DGreen,
        borderBottomWidth: 1
    }
})

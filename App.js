import React from 'react';
import {View, 
  Button,
  Text,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  PickerIOSComponent,
  SafeAreaView,
  alignItems,} from 'react-native';
// import Constants from 'expo-constants';

let id = 0

const styles = StyleSheet.create({
  todoList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    paddingTop:20,
    flex:1
  },
 head: {
      flex: 1,
      fontFamily:"bold",
      fontSize:50,
      color:"purple",
      alignItems: 'center',
    // justifyContent: 'center',
    },   
  });

  const cont = {backgroundColor:"pink"};
  // const fea = { alignItems: 'center',};


const Todo = props => (
  <View style={styles.todoList}>
     <Button onPress={props.onDelete} title="Delete"/>
   <Text style={{paddingLeft:20}}>{props.todo.text}</Text>
  </View>
)

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      text: '',
    }
  }

  addTodo(text) {
    id++
    this.setState({
      tasks: [
        ...this.state.tasks,
        {id: id, text: text,},
      ],
      text: '',
    })
  }

  takeInput = (input) => {
      this.setState({ text: input })
  }

  DeleteTask(id) {
    this.setState({
      tasks: this.state.tasks.filter(todo => todo.id !== id)
    })
  }

  toggleTodo(id) {
    this.setState({
      tasks: this.state.tasks.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
         
        }
      })
    })
  }
render() {
    return (
      <SafeAreaView>
        <Text style={[styles.head,cont]}>To-Do List</Text>
          <TextInput
            style={{ height: 30, width:500,borderWidth: 3, margin: 10,fontSize:20, borderColor: 'gray', paddingLeft:10}}
            placeholder = "Enter Task"
            onChangeText={this.takeInput}
            value={this.state.text}
          />
        <Button 
        color = "orange"
        onPress = {() => 
        this.addTodo(this.state.text)}
         title="Add Task" 
         />
        <ScrollView>
          {this.state.tasks.map(todo => (
            <Todo
            onToggle={() => this.toggleTodo(todo.id)}
            onDelete={() => this.DeleteTask(todo.id)}
              todo={todo}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    )
  }
}
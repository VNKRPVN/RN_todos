import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Picker } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

const TodoApp = () => {
  const [importantUrgent, setImportantUrgent] = useState([]);
  const [importantNotUrgent, setImportantNotUrgent] = useState([]);
  const [notImportantUrgent, setNotImportantUrgent] = useState([]);
  const [notImportantNotUrgent, setNotImportantNotUrgent] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('importantUrgent');

  const addTodo = () => {
    const newTodoItem = { id: uuidv4(), text: newTodo, category: category };
    switch (category) {
      case 'importantUrgent':
        setImportantUrgent([...importantUrgent, newTodoItem]);
        break;
      case 'importantNotUrgent':
        setImportantNotUrgent([...importantNotUrgent, newTodoItem]);
        break;
      case 'notImportantUrgent':
        setNotImportantUrgent([...notImportantUrgent, newTodoItem]);
        break;
      case 'notImportantNotUrgent':
        setNotImportantNotUrgent([...notImportantNotUrgent, newTodoItem]);
        break;
      default:
        break;
    }
    setNewTodo(''); // Очистить поле ввода после добавления нового дела
  };


  const removeTodo = (id, category) => {
    switch (category) {
      case 'importantUrgent':
        setImportantUrgent(importantUrgent.filter((todo) => todo.id !== id));
        break;
      case 'importantNotUrgent':
        setImportantNotUrgent(importantNotUrgent.filter((todo) => todo.id !== id));
        break;
      case 'notImportantUrgent':
        setNotImportantUrgent(notImportantUrgent.filter((todo) => todo.id !== id));
        break;
      case 'notImportantNotUrgent':
        setNotImportantNotUrgent(notImportantNotUrgent.filter((todo) => todo.id !== id));
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputContainer}>
        <Picker
          style={styles.input}
          selectedValue={category}
          onValueChange={(itemValue) =>
            setCategory(itemValue)
          }
        >
          <Picker.Item label="Важно и Срочно" value="importantUrgent" />
          <Picker.Item label="Важно и Не Срочно" value="importantNotUrgent" />
          <Picker.Item label="Не Важно и Срочно" value="notImportantUrgent" />
          <Picker.Item label="Не Важно и Не Срочно" value="notImportantNotUrgent" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Введите задачу"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.categoryTitle}>Важно и Срочно</Text>
      <FlatList
        style={styles.list}
        data={importantUrgent}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTodo(item.id, 'importantUrgent')}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.categoryTitle}>Важно и Не Срочно</Text>
      <FlatList
        style={styles.list}
        data={importantNotUrgent}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTodo(item.id, 'importantNotUrgent')}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.categoryTitle}>Не Важно и Срочно</Text>
      <FlatList
        style={styles.list}
        data={notImportantUrgent}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTodo(item.id, 'notImportantUrgent')}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.categoryTitle}>Не Важно и Не Срочно</Text>
      <FlatList
        style={styles.list}
        data={notImportantNotUrgent}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTodo(item.id, 'notImportantNotUrgent')}>
              <Text style={styles.removeButton}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'column',
  },
  categoryTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default TodoApp;
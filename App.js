import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SingleTodo from "./components/SingleTodo";

export default function App() {
  const [todo, setTodo] = useState("");//todo - variable where the value of todo will go
  //setTodo - function which will help us set the value of todo variable
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todo) return;
    setTodos([...todos, { id: Date.now(), text: todo }]);
    setTodo("");
  };

  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <><View style={styles.container}>
      <Text style={styles.heading}>React-Native Todos App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={todo}
          onChangeText={(text) => setTodo(text)}
          placeholder="Enter a Todo"
          style={styles.input} />
        <TouchableOpacity onPress={handleAddTodo}>
          <Text style={styles.button}>Go</Text>
        </TouchableOpacity>
      </View>
      {/* ScrollView vs FlatList */}

      {/* Using ScrollView and map() */}
      {/* <ScrollView style={{ width: "100%", marginTop: 10 }}>
      {todos?.map((todo) => (
        <SingleTodo
          todos={todos}
          setTodos={setTodos}
          todo={todo}
          key={todo.id}
        />
      ))}
    </ScrollView> */}

      {/* By FlatList */}
      <View style={{ width: "100%", marginTop: 10 }}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <SingleTodo todos={todos} setTodos={setTodos} todo={item} />
          )}
          keyExtractor={(item) => item.id.toString()} />
      </View>
      <StatusBar style="auto" />
    </View><View style={{ width: "100%", marginTop: 10, alignItems: "center" }}>
        <Text>By: Ian Marx (github.com/Marx-wrld)</Text>
      </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#a0d2eb",
    backgroundSize: "cover",
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  button: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 10,
  },
  input: {
    elevation: 10,
    shadowColor: "black",
    backgroundColor: "white",
    flex: 1,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
  },
});

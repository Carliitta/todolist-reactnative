// instalar npm i @react-native-async-storage/async-storage para mantener los datos guardados
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
//Importa AsyncStorage para almacenar datos de forma asíncrona en la aplicación.
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoList = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  //Utiliza el hook useEffect para cargar los datos almacenados cuando el componente se monta por primera vez
  // (vacío [] indica que solo se ejecuta una vez).
  useEffect(() => {
    getData();
  }, []);
//Define una función asincrónica storeData para guardar los datos de las tareas en AsyncStorage.
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("my-todo", jsonValue);
    } catch (e) {
      console.log(e.message);
    }
  };
//Define una función asincrónica getData para recuperar los datos de las tareas almacenadas en AsyncStorage.
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("my-todo");
      if (jsonValue !== null) {
        const taskLocal = JSON.parse(jsonValue);
        setTasks(taskLocal);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
 //Define una función renderItem para renderizar cada ítem de la lista de tareas.
  function renderItem({ item }) {
    return (
      <View style={styles.contenedorList}>
        <TouchableOpacity onPress={() => handleToggleDone(item)}>
          <Text style={!item.done ? styles.list : styles.listDone}>
            {item?.title}
          </Text>
          <Text style={!item.done ? styles.list : styles.listDone}>
            {new Date(item?.date).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {item?.done && (
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Text style={styles.btnClear}>❌</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function handleDelete(itemToDelete) {
    Alert.alert("Holis", "Seguro que querés eliminar esta tarea?🤔", [
      {
        text: "Mejor no",
        style: "cancel",
      },
      {
        text: "See",
        onPress: () => {
          const updatedTasks = tasks.filter((item) => item !== itemToDelete);
          setTasks(updatedTasks);
          storeData(updatedTasks);
        },
      },
    ]);
  }
//si se clickea un item lo pone en true (que seria terminado) y lo tacha
  function handleToggleDone(itemToToggle) {
    const updatedTasks = tasks.map((item) => {
      if (item === itemToToggle) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });
    setTasks(updatedTasks);
    storeData(updatedTasks);
  }

  function addTask() {
    if (text.trim() === "") return;
    // Verificar si la tarea ya existe
    const taskExists = tasks.some((task) => task.title === text);
    if (taskExists) {
      alert(" 📝 La tarea ya existe");
      return;
    }
    const newTask = {
      title: text,
      done: false,
      date: new Date(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    storeData(updatedTasks);
    setText("");
  }

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Lista de tareas📃</Text>
        <View style={styles.inputContenedor}>
          <TextInput
            style={styles.input}
            placeholder="Agregar nueva tarea ✍️"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity onPress={addTask} style={styles.btn}>
            <Text>Ok</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
        {tasks.length > 0 ? (
          <View style={styles.scrollList}>
            <FlatList renderItem={renderItem} data={tasks} />
          </View>
        ) : (
          <View>
            <Text style={styles.msg}>No hay tareas pendientes ✅</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#098baa",
    padding: 10,
  },
  titulo: {
    padding: 30,
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    borderColor: "#fff",
    backgroundColor: "#ffe",
    borderWidth: 1,
    width: Dimensions.get("screen").width * 0.7,
    borderRadius: 5,
    padding: 3,
    paddingStart: 20,
  },
  inputContenedor: {
    flexDirection: "row",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width * 0.2,
    backgroundColor: "#ffe",
    borderRadius: 5,
    marginLeft: 8,
  },
  list: {
    color: "#fff",
  },
  listDone: {
    textDecorationLine: "line-through",
    color: "#fff",
  },
  scrollList: {
    justifyContent: "flex-start",
  },
  contenedorList: {
    flexDirection: "row",
    marginTop: 20,
    borderBottomColor: "#dfdaed",
    borderBottomWidth: 1,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  btnClear: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
    color: "white",
  },
  msg: {
    color: "white",
    marginTop: 60,
    textAlign: "center",
    fontSize: 19,
  },
});

export default TodoList;

import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  
} from "react-native";
import logo from "../../assets/logosession.png";
const Formulario = () => {
  return (
    <View style={styles.container}>
    <Image source={logo} style={styles.logo} />
    <Text style={styles.titulo}>INICIAR SESION</Text>
    <TextInput style={styles.inputs} placeholder="usuario" />
    <TextInput style={styles.inputs} placeholder="contraseña" />
    <Text style={styles.texto}>¿Olvidaste tu contraseña?</Text>
    <StatusBar style="auto" />
    <TouchableOpacity style={styles.enviar}>
      <Button title="enviar" />
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: "#fff",
      alignItems: "center",
      marginTop:50
    },
    inputs: {
      padding: 10,
      width: "90%",
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 20,
      paddingStart: 20, //padding de el placeholder
    },
    enviar: {
      marginTop: 20,
      width: 200,
    },
    logo: {
      width: 300,
      height: 200,
    },
    titulo:{
      fontSize:20,
      color:"grey"
    },
  texto:{
    marginTop:10
  }
  });
  
export default Formulario
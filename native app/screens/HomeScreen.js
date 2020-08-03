import React,{useEffect,useState} from 'react';
import { Button , TextInput } from 'react-native-paper';
import { Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = (props) => {
      const [email,setEmail] = useState("loading")

  useEffect(()=> {
    const boiler = async ()=>{
      const token = await AsyncStorage.getItem("token")
      fetch('http://192.168.1.7:3000', {
        headers: new Headers({
          Authorization:"Bearer "+token
        })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        setEmail(data.email)
        }
      )
    }
    boiler()
  },[])

  const logout =()=> {
    AsyncStorage.removeItem("token").then(()=>{
      props.navigation.replace("login")
    })
  }

  return (
    <View >
        <Text style = {{fontSize:15}}> your email is {email}</Text>

        <Button 
            mode="contained"
            style= {{marginLeft:18, marginRight:18, marginTop:15}}
            theme={{colors:{primary:"green"}}}
            onPress={() => logout(props)}>
            logout
        </Button>
    </View>
  );
}


export default HomeScreen;
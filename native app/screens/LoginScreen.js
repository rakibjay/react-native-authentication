import React,{useState} from 'react';
import { Button , TextInput } from 'react-native-paper';
import { Text, View, TouchableOpacity, KeyboardAvoidingView,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';


const LoginScreen = (props) => {

  const [email,setEmail] = useState('');
  const[password,setPassword] = useState('')

  const sendCred = async (props) => {
    fetch("http://192.168.1.7:3000/signin",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            "email":email,
            "password":password
        })
    })
    .then(res=>res.json())
    .then(async (data)=>{
                try {
                    await AsyncStorage.setItem('token',data.token)
                    props.navigation.replace("home")
                } catch (e) {
                    console.log("error",e);
                    Alert(e)
                }
    })
}

  return (
    <View>
        <KeyboardAvoidingView behavior="position">
          <StatusBar backgroundColor="green" barStyle="light-content" />
        <Text 
          style={{fontSize:30, marginLeft:18, marginTop:20, color:"#3b3b3b"}}
          > Welcome to </Text>
        <Text
            style={{fontSize:25, marginLeft:18, color: "green"}}
            > Calisthenics </Text>
      <View 
            style={{
              borderBottomColor: "green",
              borderBottomWidth: 2,
              borderRadius: 10,
              marginLeft: 30,
              marginRight: 190,
              marginTop: 4
          }}
        />

      <Text
          style = {{
          fontSize:15, marginLeft:15, marginTop:20}}
          >Login with email </Text>

<TextInput 
          label="Email"
          value={email}
          mode="outlined"
          style= {{marginLeft:18, marginRight:18, marginTop:15}}
          theme={{colors:{primary:"green"}}}
          onChangeText={(text)=>setEmail(text)}
        />

      <TextInput 
          label="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text)=>{setPassword(text)}}  
          mode="outlined"
          style= {{marginLeft:18, marginRight:18, marginTop:15}}
          theme={{colors:{primary:"green"}}}
          
       />

        <Button 
            mode="contained"
            style= {{marginLeft:18, marginRight:18, marginTop:15}}
            theme={{colors:{primary:"green"}}} 
            onPress={() => sendCred(props)}>
            login
        </Button>
        <TouchableOpacity>
            <Text
                style = {{
                fontSize:15, marginLeft:15, marginTop:20
                }}
                onPress= {() => props.navigation.replace("signup")}
                >don't have a account ?
            </Text>
        </TouchableOpacity>
        

        </KeyboardAvoidingView>
    </View>
  );
}


export default LoginScreen;
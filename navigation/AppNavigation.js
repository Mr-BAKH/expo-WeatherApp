import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/homeScreen'
import{
    LogBox,
    Text,
    View
}from 'react-native'


const Stack = createNativeStackNavigator();

const SliceApp = ()=>{
    return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
              options={{headerShown: false}}
              name="Home" 
              component={HomeScreen}
            />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default SliceApp;
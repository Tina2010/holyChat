import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { 
  StyleSheet } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            p
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }  
}

const styles = StyleSheet.create({

});

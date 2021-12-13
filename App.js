import React, {Component} from 'react';

import 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createStackNavigator();
export default class App extends Component {

  render() {
    return (
      <NavigationContainer
        theme={DarkTheme}
      >
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
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }  
}

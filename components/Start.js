import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  Platform,
  LogBox} from 'react-native';

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '', 
      bgColor:'#757083',
    }
  // ignoring time warning on android
  LogBox.ignoreLogs(['Setting a timer']);  
  }

  render() {
    return (
      <ImageBackground 
        style={styles.image}
        resizeMode="cover"
        source={require("../assets/bgImage.png")}
      >     
        <View style={styles.container}>
          <Text style={styles.appTitle}>HolyChat!</Text>
          <KeyboardAvoidingView
            behavior= {(Platform.OS === 'ios')? "position" : null}
/*          even though android is said to be problematic with the keyboard, I had trouble with ios,
            therefor the the behavior and keyboardVerticalOffset is needed here */
            keyboardVerticalOffset={(Platform.OS === 'ios')? "100" :  "500"}
          >           
          <View style={styles.subContainer}>
                  <Text>Please enter your name:</Text> 
                 
                  <TextInput
                          onChangeText={(name) => this.setState({ name })}
                          value={this.state.name}
                          placeholder="Your Name"
                          style={styles.yourName}
                        > 
                  </TextInput>
                  <Text style={styles.chooseBGColor}>Choose Background Color:</Text>
                    <View style={styles.touchableColors}
                      collapsable= {true}
                    >
                      {/* change background to black */}
                      <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Change backgroundcolor"
                        accessibilityHint="Lets you pick black as the backgroundcolor for your chat window."
                        accessibilityRole="button"  
                        onPress={() => this.setState({ bgColor: "#090C08", })}
                        style={[styles.colors, styles.black]}
                      ></TouchableOpacity>
                      {/* change background to purple */}
                      <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Change backgroundcolor"
                        accessibilityHint="Lets you pick purple as the backgroundcolor for your chat window."
                        accessibilityRole="button"
                        onPress={() => this.setState({ bgColor: "#474056" })}
                        style={[styles.colors, styles.purple]}
                      ></TouchableOpacity>
                      {/* change background to grey */}
                      <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Change backgroundcolor"
                        accessibilityHint="Lets you pick grey as the backgroundcolor for your chat window."
                        accessibilityRole="button"
                        onPress={() => this.setState({ bgColor: "#8A95A5" })}
                        style={[styles.colors, styles.grey]}
                      ></TouchableOpacity>
                      {/* change background to green */}
                      <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Change backgroundcolor"
                        accessibilityHint="Lets you pick green as the backgroundcolor for your chat window."
                        accessibilityRole="button"
                        onPress={() => this.setState({ bgColor: "#B9C6AE" })}
                        style={[styles.colors, styles.green]}
                      ></TouchableOpacity>
                    </View>  
                  <View style={styles.button}>
                    {this.state.name === ""? 
                      <Pressable
                      style={({ pressed }) => [
                        {
                          opacity: pressed
                            ? 0.5
                            : 50
                        }
                      ]}
                      hitSlop={{
                        top: 20, 
                        bottom: 20,
                        left: 100,
                        right: 100
                      }}
                    >
                        <Text style={{color: 'white'}}>Please enter your name!</Text>
                    </Pressable> 
                  :
                  
                    <Pressable
                      onPress={() => this.props.navigation.navigate('Chat',
                      {name: this.state.name,
                      bgColor: this.state.bgColor})}
                      style={({ pressed }) => [
                        {
                          opacity: pressed
                            ? 0.5
                            : 50
                        }
                      ]}
                      hitSlop={{
                        top: 20, 
                        bottom: 20,
                        left: 100,
                        right: 100
                      }}
                    >
                        <Text style={{color: 'white'}}>Go to Chat!</Text>
                    </Pressable>                   
                  
                  }     
                    
                  </View>    
          </View>
          </KeyboardAvoidingView>
        </View> 
        <StatusBar
         style='light'
         backgroundColor="#121212"
        />  
      </ImageBackground>  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
    top: 100,
    alignSelf: 'center',
  },  
  subContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: '10%',
    padding: '5%'
  },
  yourName: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    margin: 20,
    marginLeft: 0,
    marginRight: 0,
    width: 300,
    borderWidth: 3,
    borderColor: 'darkgrey',
    textAlign: 'center',
  },
  chooseBGColor: {
    fontSize: 16,
    fontWeight: '300',
    color: "#757083",
    opacity: 100,
    padding: 20,
    paddingLeft: 0,
  },
  touchableColors: {
    flexDirection: "row",
    alignSelf: 'center',
  },
  colors: {
    width: 45,
    height: 45,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 45 / 2,
  },
  black: {
    backgroundColor: "#090C08"
  },
  purple: {
    backgroundColor: '#474056'
  },
  grey: {
    backgroundColor:'#8A95A5'
  },
  green: {
    backgroundColor: '#B9C6AE'
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    backgroundColor:"#757083",
    margin: 20,
    marginLeft: 0,
    marginRight: 0,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  }
});

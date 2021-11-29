import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable} from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '', 
      bgColor:'#757083',
      textColor: 'black',
      isFocused: false,
      isFocusedBlack: false,
      isFocusedPurple: false,
      isFocusedGrey: false,
      isFocusedGreen: false,
    }
  }
/* currently only visible in web browser: 
set white inner ring, when color is active
one for each color is needed, since one state for all
controls the visibility of the ring for all at once */
  onFocusChangeBlack = () => {
    this.setState({ isFocusedBlack: true });
  }
  onFocusChangePurple = () => {
    this.setState({ isFocusedPurple: true });
  }
  onFocusChangeGrey = () => {
    this.setState({ isFocusedGrey: true });
  }
  onFocusChangeGreen = () => {
    this.setState({ isFocusedGreen: true });
  }

//remove white inner ring, when color is active  
  onBlurChangeBlack = () => {
    this.setState({ isFocusedBlack: false });
  }
  onBlurChangePurple = () => {
    this.setState({ isFocusedPurple: false });
  }
  onBlurChangeGrey = () => {
    this.setState({ isFocusedGrey: false });
  }
  onBlurChangeGreen = () => {
    this.setState({ isFocusedGreen: false });
  }

  
  render() {
    return (
      <ImageBackground 
          style={styles.image}
          resizeMode="cover"
          source={require("../assets/bgImage.png")}
          >      
         <ScrollView> 
          <View style={styles.container}>
            <Text style={styles.appTitle}>HolyChat!</Text>
              <View style={styles.subContainer}>
                <Text>Please enter your name:</Text> 
                <TextInput
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        placeholder="Your Name"
                        style={styles.yourName}
                      /> 
                <Text style={styles.chooseBGColor}>Choose Background Color:</Text>
                  <View style={styles.touchableColors}>
                    <TouchableOpacity
                      style={(this.state.isFocusedBlack) 
                        ? {
                          backgroundColor: "#090C08",
                          borderColor: 'antiquewhite',
                          borderStyle: 'double',
                          borderWidth: 'initial',
                          width: 45,
                          height: 45,
                          marginRight: 20,
                          marginBottom: 10,
                          borderRadius: 45 / 2,
                        } : {
                          backgroundColor: "#090C08",
                          borderColor: '#090C08',
                          borderStyle: 'double',
                          borderWidth: 'initial',
                          width: 45,
                          height: 45,
                          marginRight: 20,
                          marginBottom: 10,
                          borderRadius: 45 / 2,
                        }}                      
                      onPress={() => this.setState({ bgColor: "#090C08", textColor: "white" })}
                      onFocus={this.onFocusChangeBlack}
                      onBlur={this.onBlurChangeBlack}
                    ></TouchableOpacity>
                    <TouchableOpacity
                        style={(this.state.isFocusedPurple) 
                        ? {
                          backgroundColor: "#474056",
                          borderColor: 'antiquewhite',
                          borderStyle: 'double',
                          borderWidth: 'initial',
                          width: 45,
                          height: 45,
                          marginRight: 20,
                          marginBottom: 10,
                          borderRadius: 45 / 2,
                        } : {
                          backgroundColor: "#474056",
                          borderColor: '#474056',
                          borderStyle: 'double',
                          borderWidth: 'initial',
                          width: 45,
                          height: 45,
                          marginRight: 20,
                          marginBottom: 10,
                          borderRadius: 45 / 2,
                        }} 
                      onPress={() => this.setState({ bgColor: "#474056", textColor: "white" })}
                      onFocus={this.onFocusChangePurple}
                      onBlur={this.onBlurChangePurple}
                    ></TouchableOpacity>
                    <TouchableOpacity
                        style={(this.state.isFocusedGrey) 
                          ? {
                            backgroundColor: "#8A95A5",
                            borderColor: 'antiquewhite',
                            borderStyle: 'double',
                            borderWidth: 'initial',
                            width: 45,
                            height: 45,
                            marginRight: 20,
                            marginBottom: 10,
                            borderRadius: 45 / 2,
                          } : {
                            backgroundColor: "#8A95A5",
                            borderColor: '#8A95A5',
                            borderStyle: 'double',
                            borderWidth: 'initial',
                            width: 45,
                            height: 45,
                            marginRight: 20,
                            marginBottom: 10,
                            borderRadius: 45 / 2,
                          }} 
                      onPress={() => this.setState({ bgColor: "#8A95A5", textColor: "black" })}
                      onFocus={this.onFocusChangeGrey}
                      onBlur={this.onBlurChangeGrey}
                    ></TouchableOpacity>
                    <TouchableOpacity
                        style={(this.state.isFocusedGreen) 
                          ? {
                            backgroundColor: "#B9C6AE",
                            borderColor: 'antiquewhite',
                            borderStyle: 'double',
                            borderWidth: 'initial',
                            width: 45,
                            height: 45,
                            marginRight: 20,
                            marginBottom: 10,
                            borderRadius: 45 / 2,
                          } : {
                            backgroundColor: "#B9C6AE",
                            borderColor: '#B9C6AE',
                            borderStyle: 'double',
                            borderWidth: 'initial',
                            width: 45,
                            height: 45,
                            marginRight: 20,
                            marginBottom: 10,
                            borderRadius: 45 / 2,
                          }} 
                      onPress={() => this.setState({ bgColor: "#B9C6AE", textColor: "black" })}
                      onFocus={this.onFocusChangeGreen}
                      onBlur={this.onBlurChangeGreen}
                    ></TouchableOpacity>
                  </View>  
                <View style={styles.button}>     
                <Pressable
                  onPress={() => this.props.navigation.navigate('Chat',
                  {name: this.state.name,
                  bgColor: this.state.bgColor,
                  textColor: this.state.textColor})}
                >
                    <Text style={{color: 'white'}}>Go to Chat!</Text>
                </Pressable> 
                </View>
            </View>
        </View>
       </ScrollView> 
      </ImageBackground>  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
    top: 100,
  },  
  subContainer: {
    alignItems: 'flex-start',
    margin: 20,
    backgroundColor: 'white',
    padding: 30,
    top: '65%',
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
    color: '#757083',
    opacity: 100,
    padding: 20,
    paddingLeft: 0,
  },
  touchableColors: {
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: 'center',
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

import React from 'react';
import { 
  View,   
  ImageBackground,
  StyleSheet,
  Text,
  Linking,
  KeyboardAvoidingView,
  Platform } from 'react-native';

import { GiftedChat, Bubble } from 'react-native-gifted-chat'


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello '+ this.props.route.params.name  + ' !',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
         },
         {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
         },
      ]
    })
  } 

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'white',
          },
          left: {
            backgroundColor: '#f7e5c4',
          }
        }}
        textStyle={{
          right: {
            color: 'black'
          }
        }}
        timeTextStyle={{ 
          right: { 
            color: 'rgb(26 26 26)' 
          },
          left: { 
            color: 'rgb(26 26 26)' 
          }
        }}
      />
    )
  }


  render() {
    let bgColor = this.props.route.params.bgColor;

    return (
      <ImageBackground 
      style={styles.image}
      resizeMode="cover"
      source={require("../assets/bgImage2.jpg")}
      >      
        <View 
          style={{
                backgroundColor: bgColor,
                flex: 1,
                margin: 20,
                padding: 20
          }}>
            <GiftedChat
                  renderBubble={this.renderBubble.bind(this)}
                  messages={this.state.messages}
                  onSend={messages => this.onSend(messages)}
                  user={{
                    _id: 1,
                  }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
            <Text style={{color: 'black', fontSize: 8, paddingTop: 10}}
                  onPress={() => Linking.openURL('https://www.freepik.com/vectors/pattern')}>
              Pattern vector created by rawpixel.com - www.freepik.com
            </Text>        
      </ImageBackground>  
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    }
});
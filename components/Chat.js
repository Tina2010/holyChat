import React from 'react';
import { 
  View,   
  ImageBackground,
  StyleSheet,
  Text,
  Linking,
  KeyboardAvoidingView,
  Platform,
  LogBox } from 'react-native';

import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCj7Aq_CN8zDRuyw3ZADj0VNeukLUWaQjo",
  authDomain: "test-c54b3.firebaseapp.com",
  projectId: "test-c54b3",
  storageBucket: "test-c54b3.appspot.com",
  messagingSenderId: "632825495982",
  appId: "1:632825495982:web:3f1130b10c3af3e3aa483f",
  measurementId: "G-56FLJZ4Y26"
};


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: this.props.route.params.name, // set name from start-page
      messages: [], 
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: ''
      }
    };
    // ignoring time warning on
    LogBox.ignoreLogs(['Setting a timer']);

    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
      }

    this.messagesCollection = firebase.firestore().collection('messages');
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.state.name }); 
    // calls the Firebase Auth service
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
        
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: this.props.route.params.name,
          avatar: "",
        },
      });

      this.unsubscribeMessagesCollection = this.messagesCollection
      .orderBy('createdAt', 'desc')
      .onSnapshot(this.onCollectionUpdate);
    });
  }

/*   retrieves the current data in the "messages" collection and stores it in the state, 
  allowing that data to be rendered in the view */
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: "https://placeimg.com/140/140/any"
        }
      });
    });
    this.setState({
      messages: messages
    });
  };

  onSend(newMessage = []) { 
    this.addMessage(newMessage)
  }

  // currently in test-phase! 
  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    );
  };

  // add latest message to firebase collection
  addMessage(newMessage) {
    const latestMessage = newMessage[0]; 
    this.messagesCollection.add({ 
      _id: latestMessage._id,
      text: latestMessage.text,
      createdAt: latestMessage.createdAt,
      user: latestMessage.user
    });
  }

  // style of textbubbles
  renderBubble = props => {
    let username = props.currentMessage.user._id
    let color = this.getColor(username)
    return (
      <Bubble
        {...props}
        // bubblewrapper
        wrapperStyle={{
          right: {
            backgroundColor: 'black',
          },
          left: {
            backgroundColor: color,
          }
        }}
        // time in bubblewrapper
        timeTextStyle={{ 
          right: { 
            color: 'rgb(26, 26, 26)' 
          },
          left: { 
            color: 'rgb(26, 26, 26)' 
          }
        }}
      />
    )
  }

  getColor(user){
    let sumChars = 0;
    for(let i = 0;i < user.length;i++){
      sumChars += user.charCodeAt(i);
    }

    const colors = [
      'lightblue', 'lightcoral', 'lightgreen'
    ];
    return colors[sumChars % colors.length];
  }

  // stop receiving updates about collection
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribeMessagesCollection();
 }

  render() {
    let bgColor = this.props.route.params.bgColor; // bgcolor from start page

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
                  renderSystemMessage={this.renderSystemMessage}
                  user={{
                    _id: this.state.uid
                  }}
            />
            {/* Fix for know adroid issue, keyboard hovers over chat */}
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
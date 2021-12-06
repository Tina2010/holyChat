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

import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

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

LogBox.ignoreAllLogs();
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
      },
      isConnected: false,
    };

    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
      }

    this.messagesCollection = firebase.firestore().collection('messages');
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.state.name }); 
    NetInfo.fetch().then(connection => {
      if(connection.isConnected) { 
        this.setState({ isConnected: true});   
        
        // calls the Firebase Auth service
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
          });
          this.unsubscribeMessagesCollection = this.messagesCollection
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        this.setState({isConnected: false});
        this.getMessages();
      }
    })
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
        }
      });
    });
    this.setState({ messages: messages }, () => { 
      this.saveMessages();
    });
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(this.state.messages));
    } catch (error) {
    console.log(error.message);
    }
  }

  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async deleteMessages () {
    try {
      await AsyncStorage.removeItem("messages");
    } catch (error) {
      console.log(error.message);
    }
  }

  onSend(newMessage = []) { 
    this.addMessage(newMessage)
  }

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
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'black',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: 'lightblue',
          },
        }}
      />
    );
  }


  renderInputToolbar(props) {
    if(this.state.isConnected === false) {
    } else {
      return (
        <InputToolbar {...props}/>
      );
    }
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
                  renderBubble={this.renderBubble}
                  messages={this.state.messages}
                  onSend={newMessage => this.onSend(newMessage)}
                  renderInputToolbar={this.renderInputToolbar.bind(this)}
                  renderUsernameOnMessage={true}
                  isTyping={true}
                  user={{ 
                    _id: this.state.uid,
                    name: this.state.name
                  }}/> 
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
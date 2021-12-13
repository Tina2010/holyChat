import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  View,   
  LogBox, 
  Platform} from 'react-native';

import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import MapView from "react-native-maps";

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import 'firebase/compat/storage'

import CustomActions from './CustomActions';

LogBox.ignoreAllLogs();

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
      },
      isConnected: false,
      infoConnection: 'offline',
      image: null,
      location: null
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
        this.setState({ isConnected: true, infoConnection: 'online' });
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => { 
          if (!user) { await firebase.auth().signInAnonymously() }; 
          this.setState({
            uid: user.uid,
            user: {
              _id: user.uid,
              name: this.state.name,
              avatar: 'https://placeimg.com/140/140/any'
            }
          });
          this.unsubscribeMessagesCollection = this.messagesCollection.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        });
      } else {
        this.setState({ isConnected: false, infoConnection: 'offline' });
        this.getMessages();
      }
    });
  }

  // stop receiving updates about collection
  componentWillUnmount() {
    if (this.state.isConnected === true) {
      this.authUnsubscribe(); 
      this.unsubscribeMessagesCollection();
    }
  }

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
      messages = await AsyncStorage.getItem("messages") || [];
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
  onSend(message = []) {
    this.addMessage(message)
  }

  // add latest message to firebase collection
  addMessage(newMessage) {
    const latestMessage = newMessage[0]; 
    this.messagesCollection.add({ 
      _id: latestMessage._id,
      text: latestMessage.text || '',
      createdAt: latestMessage.createdAt,
      user: latestMessage.user,
      image: latestMessage.image || '',
      location: latestMessage.location || null
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
          name: data.user.name
        },
        image: data.image,
        location: data.location
      });
    });
    this.setState({ messages: messages }, () => { 
      this.saveMessages(); 
    });
  };


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

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView (props) {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  render() {
    let bgColor = this.props.route.params.bgColor; // bgcolor from start page
    return (
      <View 
        style={{
          flex: 1,
        }}
      >
        {Platform.OS === "ios" ?
        <View
        style={{
          flex: 1,
        }}
        >
        <View style={{
          flex: 10,
              backgroundColor: bgColor
            }}>
          <GiftedChat
            renderBubble={this.renderBubble}
            messages={this.state.messages}
            onSend={newMessage => this.onSend(newMessage)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderUsernameOnMessage={true}
            renderActions={this.renderCustomActions}
            renderCustomView={this.renderCustomView}
            bottomOffset={70}
            user={{ 
                _id: this.state.uid,
                name: this.state.name
            }}
          /> 
         </View>
          <View style={{
          flex: 1,
              backgroundColor: '#121212'
            }}></View> 
          </View>          
        : null } 

        {Platform.OS === "android" ?
                <View
                style={{
                  flex: 1,
                }}
                >
        <View style={{
          flex: 1,
              backgroundColor: bgColor
            }}>
          <GiftedChat
            renderBubble={this.renderBubble}
            messages={this.state.messages}
            onSend={newMessage => this.onSend(newMessage)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderUsernameOnMessage={true}
            renderActions={this.renderCustomActions}
            renderCustomView={this.renderCustomView}
            user={{ 
                _id: this.state.uid,
                name: this.state.name
            }}
          /> 
         </View>
        </View>
        : null } 

        <StatusBar
         style='light'
         backgroundColor="#121212"
        /> 
      </View>          
    )
  }
}

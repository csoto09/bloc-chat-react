import React, { Component } from 'react';
import './App.css';

import 'bulma/css/bulma.css';
import * as firebase from "firebase";
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from "./components/User";


// Initialize Firebase
const config = {
  apiKey: "AIzaSyBw3sykxgvR04HCBbu7IqyGuAkgzTIC7xI",
  authDomain: "bloc-chat-react-c2244.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-c2244.firebaseio.com",
  projectId: "bloc-chat-react-c2244",
  storageBucket: "bloc-chat-react-c2244.appspot.com",
  messagingSenderId: "381690188559"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: '',
      user: null
    }    
  }
  setActiveRoom = room => {this.setState({ activeRoom: room });}
  setUser = user => {this.setState({ user: user });}

  render() {
    return (
      <div className="App columns">
        <aside className="column">   
          <RoomList
            firebase = {firebase} 
            activeRoom = {this.state.activeRoom}
            setActiveRoom={this.setActiveRoom} 
          /> 
        </aside>
        <main className="column">
         <User
            firebase = {firebase}
            setUser = {this.setUser}
            user = {this.state.user} 
          />
          <MessageList 
            firebase = {firebase}
            activeRoom = {this.state.activeRoom}
            user = {this.state.user} 
          />
        </main>
      </div>
    );
  }
}

export default App;

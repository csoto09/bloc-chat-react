import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase";
import RoomList from './components/RoomList';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBw3sykxgvR04HCBbu7IqyGuAkgzTIC7xI",
  authDomain: "bloc-chat-react-c2244.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-c2244.firebaseio.com",
  projectId: "bloc-chat-react-c2244",
  storageBucket: "bloc-chat-react-c2244.appspot.com",
  messagingSenderId: "381690188559"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <aside>   
          <RoomList firebase = {firebase}/> 
        </aside>

      </div>
    );
  }
}

export default App;

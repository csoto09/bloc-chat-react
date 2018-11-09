import React, { Component } from 'react'

class User extends Component {
  constructor(props) {
    super(props);
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }
  
  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }
  

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default User;
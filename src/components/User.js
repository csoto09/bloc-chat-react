import React, { Component } from 'react'

class User extends Component {
  
  login = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  logout = () => {
    this.props.firebase.auth().signOut();
  }
  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }



  render() {
    return (
      <div>
        {this.props.user ? 
          <span>
            {this.props.user.displayName}
            <img src={this.props.user.photoURL} className="profile-img" alt="profile"/>
            <button onClick={this.logout}>Log Out</button>
          </span>
        : 
          <span>
            Guest 
            <button onClick={this.login}>Log In</button>
          </span>}
        

      </div>
    )
  }
}

export default User;
import React, { Component } from 'react'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) });
    });
  } 
  handleChange(e) {
    this.setState({ newMessage: e.target.value});
  }
  newMessage(e) {
    e.preventDefault();
    if(!this.state.newMessage) {return}
    const newMessage = this.state.newMessage;
    this.messagesRef.push({
      username: this.props.user.displayName,
      content: newMessage,
      roomId:this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({newMessage:''})
  }

  render() {
    const messages = this.state.messages.map(message => {
      if(message.roomId === this.props.activeRoom) { 
        return <p key={message.key}>{message.username}: {message.content}</p>;
      }});
    return (
      <div className="MessageList">{messages}

      <form onSubmit={ (e) => this.newMessage(e) } >
        <input type="text" value={ this.state.newMessage } onChange={ (e) => this.handleChange(e) } className="input is-small is-rounded"/>
        <input className="button is-rounded is-info" type="submit"/>
      </form>
      </div>
    )
  }
}

export default MessageList
import React, { Component } from 'react'

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: '',
            hideRoomField: true
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }
    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
    }
    showRoomField(e) {
        this.setState({ hideRoomField:false})
    }
    handleChange(e) {
        this.setState({ newRoomName: e.target.value })
    }
    createRoom(e) {
        e.preventDefault();
        if(!this.state.newRoomName) { return }
        const newRoom = this.state.newRoomName;
        this.roomsRef.push({
            name: newRoom 
        });  
        this.setState({newRoomName:'',hideRoomField:true});
    }
    render() {
        const display = this.state.hideRoomField ? { display:"none"} : {};
        return (
            <div className = "roomList">    
                <header className="App-header">Bloc Chat!</header>
                <button className="button is-rounded is-primary" onClick={(e) => this.showRoomField(e) } >Add new room</button>     
                <ul>
                    { this.state.rooms.map( (room) => {
                        return <li key={room.key} onClick={() => this.props.setActiveRoom(room.key)}>{room.name}</li>;
                     } )}
                </ul>
                <form onSubmit={ (e) => this.createRoom(e) } style={ display }>
                    <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } className="input is-small is-rounded"/>
                    <input className="button is-rounded is-info" type="submit"/>
                </form>
            </div>
    )
    }
}


export default RoomList;
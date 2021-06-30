import React, {Component} from 'react'
// import logo from './logo.svg';
import './App.css';
import PostComponent from './PostComponent'
import CommentComponent from './CommentComponent'
import PhotoComponent from './PhotoComponent'
import FeedComponent from './FeedComponent'
import loginPage from './loginPage'


export default class InstaComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }
  handleEmailChange(ev) {
     this.setState({email: ev.target.value});
  }
  handlePasswordChange(ev) {
     this.setState({password: ev.target.value});
  }

  handleLoginSubmit(ev) {
    ev.preventDefault();

    const params = {
      email: this.state.email,
      password: this.state.password
    };
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify( params )

    };

    fetch('http://localhost:8000/login', options )
      .then( response => response.json() )
      .then( response => { console.log(response, '<< RESPONSE')
        if (response.sessionKey){
        // if (response.sessionKey !== null && response.sessionKey !== undefined){
          this.setState({loggedIn: true})
        }
      }
    )
  }


  handleLogoutClick(ev) {
    this.setState({loggedIn: false})
  }

  render(){

    if (this.state.loggedIn === false) {
      return loginPage(this.handleLoginSubmit, this.handleEmailChange, this.handlePasswordChange)
    } else {

      return (

        <div className="App">

          <header className="App-header">
            <div id='header-bar-left-buffer'></div>
            <div id='header-bar'>
              <img src='./outstagramme.png' className="App-logo" alt="logo" />
              <button onClick={this.handleLogoutClick} className="logout_btn">
                <img src="./icon_door.png" className="logout_img" />
              </button>
            </div>
          </header>

          <FeedComponent/>

          <footer className="App-footer">
              <a className="App-link"
                href="https://github.com/tremella/insta-react"
                target="_blank"
                rel="noopener noreferrer">
                visit github.com/tremella/insta-react
              </a>
          </footer>

        </div>
      )
    }

  }
}

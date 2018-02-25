import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalendarEventList from './container/CalendarEventList';
import LocalInfoContainer from './container/LocalInfoContainer';
import EarthquakeContainer from './container/EarthquakeContainer';
import * as contextAction from './reduxActionReducer/contextActionReducer';
import * as userAction from './reduxActionReducer/userActionReducer';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: null
    };    
  }
  componentWillMount (){
    this.props.getContext();
    this.getGoogleToken();
  }
  componentDidMount(){
    document.addEventListener('visibilitychange', ()=>{
      if (document.visibilityState === 'visible'){
        // update context
        this.props.getContext();
      }
    });
  }
  getGoogleToken(){
    let _this = this;
    window.gapi.load('client:auth2', function(){
      window.gapi.client.init({
        'apiKey': 'AIzaSyDWhkvTlg4cP6V1hePNDfwbMhwOlZlrCiU',
        'clientId': '387901624290-5vr40ssmq0ivapmsdhpaasgu6c08gd43.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/calendar.readonly',
        }).then(function () {
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(_this.updateSigninStatus.bind(_this));
          // Handle the initial sign-in state.
          _this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        });  
    });    
  }
  updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
      let user = window.gapi.auth2.getAuthInstance().currentUser.get();
      this.props.setUser(user);
      this.setState({isLoggedIn: true});
    }
    else {
      this.props.setUser(null);  
      this.setState({isLoggedIn: false});
    }
    return;
  }
  handleSignInClick(event) {
    // Ideally the button should only show up after gapi.client.init finishes, so that this
    // handler won't be called before OAuth is initialized.
    window.gapi.auth2.getAuthInstance().signIn();
  }
  handleSignOutClick(event) {
    window.gapi.auth2.getAuthInstance().signOut();
  }
  render() {
    if (this.state.isLoggedIn === false){
       return (
        <div className="container" style={{height:'100%', marginTop: '20rem'}}>        
          <h2 className="text-center">Welcome to family message board 7085</h2>
          <div className="d-block text-center">
            <button id="signin-button" className="btn btn-primary btn-lg btn-block" onClick={this.handleSignInClick}>Start</button>        
          </div>
        </div>
       );  
    }
    else if (this.state.isLoggedIn === true){
      if (contextAction.isContextDefined(this.props)){
        return (        
          <div className="app">
            <LocalInfoContainer context={this.props.context}></LocalInfoContainer>
            <EarthquakeContainer context={this.props.context}></EarthquakeContainer>
            <CalendarEventList context={this.props.context}></CalendarEventList>
          </div>
        )  
      }
    }
    else {
      return (
        <div className="container-fluid" style={{height:'100%', marginTop: '20rem'}}>        
          <div className="d-block text-center grey8">
           <i className="fas fa-circle-notch fa-spin" style={{fontSize: '3rem', marginBottom: '1rem'}}></i> 
           <h2>One moment ...</h2>
          </div>
        </div>
      );
    }
    return '';
   }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.context
    context: state.context,
    user: state.user
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.setContext
    getContext: () => {
      dispatch(contextAction.getContext());
    },
    setUser: (user) => {
      dispatch(userAction.setUser(user));
    }
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(App);

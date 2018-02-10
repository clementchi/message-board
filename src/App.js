import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageList from './component/MessageList';
import * as contextAction from './reduxActionReducer/contextActionReducer';
import './App.css';

class App extends Component {
  componentDidMount (){
    this.props.getContext();
  }
  render() {
    return (
      <div className="app">
        <MessageList/>
      </div>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.context
    context: state.context
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  // You can now say this.props.setContext
    getContext: () => {
      dispatch(contextAction.getContext())
    }
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(App);

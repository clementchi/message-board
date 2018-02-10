import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as calendarAction from '../reduxActionReducer/calendarActionReducer';

class EventCard extends Component {
    constructor(props){
        super(props);
        this.props.getEvents();
    }
    render(){
        if (this.props.events.items){
            return (
                <div>
                    Event {this.props.events.items[0].summary}
                </div>
            )
    
        }
        return null;
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    events: state.events
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: () => {
      dispatch(calendarAction.getCalendarEvents())
    }
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(EventCard);


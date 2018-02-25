import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MessageCard from './MessageCard';
import CalendarEventContainer from '../container/CalendarEventContainer';
import * as calendarAction from '../reduxActionReducer/calendarActionReducer';

class CalendarEventList extends Component {
    componentDidMount(){
        this.getData();
    }
    getData(){
        let minTime = new Date();
        let maxTime = new Date();
        maxTime.setHours(minTime.getHours() + 12);
        this.props.getEvents(this.props.user.w3.U3, minTime, maxTime);
        this.timeoutRef = window.setTimeout(()=>{
          this.getData();
        }, 300000);
    }    
    componentWillReceiveProps(nextProps){
        if (this.props.context.latitude !== nextProps.context.latitude || this.props.context.longitude !== nextProps.context.longitude){
            clearTimeout(this.timeoutRef);
            this.getData();        
        }
    }     
    resolveEventCards(){
        if (this.props.events.items){
            let events = this.props.events.items;
            return events.map((event)=>{
                return (
                    <CalendarEventContainer key={event.id} data={event}></CalendarEventContainer>
                )
            });
        }
        return null;
    }      
    render (){        
        // render if context is populated
        let events = this.resolveEventCards();
        if (!events){     
            return null;
        }
        return (
            <React.Fragment>
                {events}
            </React.Fragment>
        )
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
    return {
      events: state.events,
      user: state.user
    }
  };
  
  // Maps actions to props
  const mapDispatchToProps = (dispatch) => {
    return {
      getEvents: (calendarId, minTime, maxTime) => {
        dispatch(calendarAction.getCalendarEvents(calendarId, minTime, maxTime))
      }
    }
  };
  
// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(CalendarEventList);


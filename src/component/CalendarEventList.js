import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MessageCard from './MessageCard';
import CalendarEventCard from './CalendarEventCard';
import * as calendarAction from '../reduxActionReducer/calendarActionReducer';

class CalendarEventList extends Component {
    componentDidMount(){
        this.getData();
    }
    getData(){
        let minTime = new Date();
        let maxTime = new Date();
        maxTime.setDate(minTime.getDate() + 1);
        this.props.getEvents(minTime, maxTime);
        window.setTimeout(()=>{
          this.getData();
        }, 300000);
    }    
    resolveEventCards(){
        if (this.props.events.items){
            let events = this.props.events.items;
            return events.map((event)=>{
                return (
                    <CalendarEventCard className="card" key={event.id} event={event}></CalendarEventCard>
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
      events: state.events
    }
  };
  
  // Maps actions to props
  const mapDispatchToProps = (dispatch) => {
    return {
      getEvents: (minTime, maxTime) => {
        dispatch(calendarAction.getCalendarEvents(minTime, maxTime))
      }
    }
  };
  
// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(CalendarEventList);


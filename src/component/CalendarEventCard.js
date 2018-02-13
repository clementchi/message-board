import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Card.css';
import * as tripAction from '../reduxActionReducer/tripActionReducer';
import * as weatherAction from '../reduxActionReducer/weatherActionReducer';

class CalendarEventCard extends Component {
    componentDidMount(){
      if (this.props.event.location){
        this.getData();          
      }
    }
    getData(){
        this.props.getTripDuration(this.props.context, this.props.event.location);
        this.props.getWeather(this.props.event.location);
        window.setTimeout(()=>{
          this.getData();
        }, 300000);
    }       
    render(){
        let eventInfo = this.props.event;
        let duration = '-';
        let trafficDelay = '-';
        let reportTime = new Date().toLocaleTimeString();
        let temperature;
        let conditionText = '-';
        let delayStyle;
        let location = 'Unknown location';

        if (eventInfo.location){
          location = eventInfo.location;
          let weatherResponse = weatherAction.resolveWeatherFromProps(this.props, eventInfo.location.replace(/#/g,''));
          let tripKey = tripAction.getTripKey(this.props.context.latitude, this.props.context.longitude, eventInfo.location);
          let tripResponse = tripAction.resolveTripResponseFromProp(this.props, tripKey);        
          if (eventInfo && tripResponse && weatherResponse){
              duration = tripResponse.rows[0].elements[0].duration_in_traffic.text;
              trafficDelay = (tripResponse.rows[0].elements[0].duration_in_traffic.value - tripResponse.rows[0].elements[0].duration.value) / 60
              temperature = weatherResponse.temp;
              conditionText = weatherResponse.text;
              
              if (trafficDelay > 20){
                delayStyle = 'alert-danger';
              }
              else if (trafficDelay > 10){
                delayStyle = 'alert-warn';
              }
              else if (trafficDelay > 5){
                delayStyle = 'alert-info';
              }
              else {
                delayStyle = 'alert-success';
              }
          }  
        }  
        return (
          <section className="card">     
            <h3>{eventInfo.summary}</h3>
            <p><i className="fa fa-map-marker"></i> {location}</p>
            <div className="content">
              <div className="column">
                <h1 className={delayStyle}>{duration}</h1>
              </div>
              <div className="column">
                <h3>{conditionText} {temperature} F</h3>
              </div>                        
            </div>
            <p>{reportTime}</p>     
          </section>
        );              
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    trip: state.trip,
    context: state.context,
    weather: state.weather
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    getTripDuration: (context, destination) => {
        dispatch(tripAction.getTripDuration(context, destination))
    },
    getWeather: (destination) => {
        dispatch(weatherAction.getWeather(destination))
    }
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(CalendarEventCard);


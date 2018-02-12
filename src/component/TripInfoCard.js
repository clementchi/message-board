import React, { Component } from 'react';
import './Card.css';
import { connect } from 'react-redux';
import * as weatherAction from '../reduxActionReducer/weatherActionReducer';
import * as tripAction from '../reduxActionReducer/tripActionReducer';

class TripInfoCard extends Component {
  componentDidMount(){
    this.props.getWeather(this.props.destination);
    this.getData();    
  }
  getData(){
    this.props.getTripDuration(this.props.context, this.props.destination);
    window.setTimeout(()=>{
      this.getData();
    }, 300000);
  } 
  render(){
    let tripKey = tripAction.getTripKey(this.props.context.latitude,this.props.context.longitude,this.props.destination);
    if (!this.props.weather[this.props.destination]){
      return null;
    }
    if (!this.props.trip[tripKey]){
      return null;
    }

    let reportTime = new Date().toLocaleTimeString();
    let tripResponse = this.props.trip[tripKey];
    let weatherResponse = this.props.weather[this.props.destination];
    let trafficDelay = (tripResponse.rows[0].elements[0].duration_in_traffic.value - tripResponse.rows[0].elements[0].duration.value) / 60
    let duration = tripResponse.rows[0].elements[0].duration_in_traffic.text;
    let temperature = weatherResponse.query.results.channel.item.condition.temp;
    let conditionText = weatherResponse.query.results.channel.item.condition.text;

    let delayStyle;
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

    return (
      <section className="card">     
        <h3>{this.props.destination}</h3>
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
    weather: state.weather,
    trip: state.trip
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    getWeather: (context) => {
      dispatch(weatherAction.getWeather(context))
    },
    getTripDuration: (context, destination) => {
      dispatch(tripAction.getTripDuration(context, destination))
    }
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(TripInfoCard);



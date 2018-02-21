import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tripAction from '../reduxActionReducer/tripActionReducer';
import * as weatherAction from '../reduxActionReducer/weatherActionReducer';
import * as bartAction from '../reduxActionReducer/bartScheduleActionReducer';
import CalendarEventCard from '../component/CalendarEventCard';

class CalendarEventContainer extends Component {
    componentDidMount(){
        if (this.props.data.location){
            let bartStationId = bartAction.getBartStationId(this.props.data.location);
            this.bartStationId = bartStationId
            this.getData();          
        }  
    }
    getData(){
        this.props.getTripDuration(this.props.context, this.props.data.location);
        this.props.getWeather(this.props.data.location);        
        if (this.bartStationId){
            this.props.getBartSchedule(this.bartStationId);
        }
        window.setTimeout(()=>{
          this.getData();
        }, 300000);
    }       
    render(){
        let eventInfo = this.props.data;
        let data = {
            weather: {},
            trip: {},
            event: eventInfo,
            bart: {}
        };

        if (eventInfo.location){          
          let weatherResponse = weatherAction.resolveWeatherFromProps(this.props, eventInfo.location.replace(/#/g,''));
          let tripKey = tripAction.getTripKey(this.props.context.latitude, this.props.context.longitude, eventInfo.location);
          let tripResponse = tripAction.resolveTripResponseFromProp(this.props, tripKey);     
          let bartScheduleResponse = {};
          let trainInfo = {};
          if (this.bartStationId){
            bartScheduleResponse = bartAction.resolveBartScheduleResponseFromProp(this.props, this.bartStationId);        

            if (bartScheduleResponse && tripResponse){
                bartScheduleResponse.root.station[0].etd.forEach(function(line){
                    let destination = line.destination;
                    line.estimate.forEach(function(estimate){
                        if (!isNaN(parseInt(estimate.minutes, 10))){
                            if (estimate.minutes > tripResponse.rows[0].elements[0].duration_in_traffic.value / 60){
                                let leavingInMinutes = parseInt(estimate.minutes, 10);
                                let baseDateTime = new Date();
                                let departureTime = new Date();
                                departureTime.setMinutes(baseDateTime.getMinutes() + leavingInMinutes);
                                
                                if (!trainInfo[destination]){
                                    trainInfo[destination] = departureTime
                                }
                            }    
                        }
                    });
                });    
            }
          }   
          
          data = {
                weather: weatherResponse,
                trip: tripResponse,
                event: eventInfo,
                bart: trainInfo
            }
        }  

        return (
          <CalendarEventCard data={data}/>
        );              
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    trip: state.trip,
    context: state.context,
    weather: state.weather,
    bartSchedule: state.bartSchedule
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
    },
    getBartSchedule: (context, destination) => {
        dispatch(bartAction.getBartSchedule(context, destination))
    }  
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(CalendarEventContainer);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as weatherAction from '../reduxActionReducer/weatherActionReducer';
import * as airQualityAction from '../reduxActionReducer/airQualityActionReducer';
import * as tripAction from '../reduxActionReducer/tripActionReducer';
import LocalInfoCard from '../component/LocalInfoCard';

class LocalInfoContainer extends Component {
    constructor(){
        super();
        this.baseAddress = 'Briza loop, San Ramon, CA94582';
    }
    componentDidMount(){
        //get data for the first time
        this.getData();
    }
    getData(){
        this.props.getWeather(this.props.context);
        this.props.getTripDuration(this.props.context, this.baseAddress)
        // this.props.getAirQuality(this.props.context);
        this.timeoutRef = window.setTimeout(()=>{
          this.getData();
        }, 300000);
    } 
    componentWillReceiveProps(nextProps){
        if (!nextProps.context.latitude || !nextProps.context.longitude){
            return;
        }
        if (this.props.context.latitude !== nextProps.context.latitude || this.props.context.longitude !== nextProps.context.longitude){
            clearTimeout(this.timeoutRef);
            this.getData();        
        }
    }    
    render(){
        let tripKey = tripAction.getTripKey(this.props.context.latitude, this.props.context.longitude, this.baseAddress);
        let tripResponse = tripAction.resolveTripResponseFromProp(this.props, tripKey);           
        let weatherResponse = weatherAction.resolveWeatherFromProps(this.props, `${this.props.context.latitude}${this.props.context.longitude}`);
        // let airQualityResponse = airQualityAction.resolveAirQualityFromProps(this.props);
        if (weatherResponse){
            let data = {
                weather: weatherResponse,
                trip: tripResponse
            }

            return (
                <LocalInfoCard data={data}/>
            )
        }
        return null;
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    weather: state.weather,
    airQuality: state.airQuality,
    trip: state.trip
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        getWeather: (context) => {
            dispatch(weatherAction.getWeather(context));
        },
        getAirQuality: (context)=> {
            dispatch(airQualityAction.getAirQuality(context));
        },
        getTripDuration: (context, baseAddress)=> {
            dispatch(tripAction.getTripDuration(context, baseAddress));
        }          
    } 
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(LocalInfoContainer);


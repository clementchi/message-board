import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as weatherAction from '../reduxActionReducer/weatherActionReducer';
import * as airQualityAction from '../reduxActionReducer/airQualityActionReducer';
import LocalInfoCard from '../component/LocalInfoCard';

class LocalInfoContainer extends Component {
    componentDidMount(){
        this.getData();
    }
    getData(){
        this.props.getWeather(this.props.context);
        this.props.getAirQuality(this.props.context);
        window.setTimeout(()=>{
          this.getData();
        }, 300000);
    }     
    render(){
        let weatherResponse = weatherAction.resolveWeatherFromProps(this.props, `${this.props.context.latitude}${this.props.context.longitude}`);
        let airQualityResponse = airQualityAction.resolveAirQualityFromProps(this.props);
        if (weatherResponse && airQualityResponse){
            let data = {
                weather: weatherResponse,
                airQuality: airQualityResponse
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
    airQuality: state.airQuality
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
        } 
    } 
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(LocalInfoContainer);


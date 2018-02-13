import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Card.css';
import * as weatherAction from '../reduxActionReducer/weatherActionReducer';
import * as airQualityAction from '../reduxActionReducer/airQualityActionReducer';

class LocalInfoCard extends Component {
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
            let temperature = weatherResponse.temp;
            let conditionText = weatherResponse.text;
            let pm25Value = airQualityResponse.value;

            return (
                <section className="card">     
                <h3>{new Date().toLocaleTimeString()}</h3>
                <div className="content">
                  <div className="column">
                    <h3>{conditionText} {temperature} F</h3>
                  </div>                        
                  <div className="column">
                    <h3>PM2.5 ({pm25Value})</h3>
                  </div>                                          
                </div>
              </section>
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
export default connect(mapStateToProps, mapDispatchToProps)(LocalInfoCard);


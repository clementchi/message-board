import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as weatherAction from '../reduxActionReducer/weatherActionReducer';

class LocalInfoCard extends Component {
    constructor(props){
        super(props);
        this.props.getWeather(this.props.context);
    }
    render(){
        if (this.props.weather.query){
            return (
                <div>
                    Weather
                    {this.props.weather.query.results.channel.item.condition.date}
                    {this.props.weather.query.results.channel.item.condition.temp}
                    {this.props.weather.query.results.channel.item.condition.text}
                </div>
            )
    
        }
        return null;
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    weather: state.weather
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    getWeather: (context) => {
      dispatch(weatherAction.getWeather(context))
    }
  }
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(LocalInfoCard);


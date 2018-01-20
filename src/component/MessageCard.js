import React, { Component } from 'react';
import './MessageCard.css';
import TravelTimeService from '../service/TravelTimeService';
import TravelWeatherService from '../service/TravelWeatherService';

class MessageCard extends Component {
  constructor (){
    super();
    this.state = {
      origin:{
        weather: {
          date: '',          
          temperature: '',          
          condition: ''
        }
      },
      destination: {
        weather: {
          date: '',
          temperature: '',          
          condition: ''
        }
      },
      travel: {
        time: '',
        duration: '',
        distance: ''
      }
    };
  }

  originWeatherResponse = (response) => {
    this.setState({origin: {
        weather: {
          date: response.query.results.channel.item.condition.date,
          temperature: response.query.results.channel.item.condition.temp,
          condition: response.query.results.channel.item.condition.text
        }
      }});
  }

  destinationWeatherResponse = (response) => {
    this.setState({destination: {
      weather: {
        date: response.query.results.channel.item.condition.date,
        temperature: response.query.results.channel.item.condition.temp,
        condition: response.query.results.channel.item.condition.text
      }
    }});  
  }
  
  travelTimeResponse = (response) => {
    let reportTime = new Date().toLocaleTimeString();
    let trafficDelay = (response.rows[0].elements[0].duration_in_traffic.value - response.rows[0].elements[0].duration.value) / 60

    this.setState({
      travel: {
        reportTime: reportTime,
        duration: response.rows[0].elements[0].duration_in_traffic.text,
        distance: response.rows[0].elements[0].distance.text,
        trafficDelay: trafficDelay
      }
    });
  }

  render() {
    let delayStyle;
    if (this.state.travel.trafficDelay > 20){
      delayStyle = 'alert-danger';
    }
    else if (this.state.travel.trafficDelay > 10){
      delayStyle = 'alert-warn';
    }
    else if (this.state.travel.trafficDelay > 5){
      delayStyle = 'alert-info';
    }
    else {
      delayStyle = 'alert-success';
    }

    return (
      <section className="card">
        <TravelTimeService origin={this.props.origin} destination={this.props.destination} responseCallback={this.travelTimeResponse}/>
        <TravelWeatherService destination={this.props.origin} responseCallback={this.originWeatherResponse}/>
        <TravelWeatherService destination={this.props.destination} responseCallback={this.destinationWeatherResponse}/>
        <h3>{this.props.destination}</h3>
        <div className="content">
          {/* <h1>{this.state.travel.distance}</h1> */}
          <div className="column">
            <h1 className={delayStyle}>{this.state.travel.duration}</h1>
          </div>
          <div className="column">
            <h3>{this.state.destination.weather.condition} {this.state.destination.weather.temperature} F</h3>
          </div>      
        </div>
        <p>{this.state.travel.reportTime}</p>     
      </section>
    );
  }
}

export default MessageCard;

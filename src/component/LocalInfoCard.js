import React, { Component } from 'react';
import './Card.css';

class LocalInfoCard extends Component {
    render(){
        if (this.props.data.weather && this.props.data.airQuality){
            let weatherResponse = this.props.data.weather;
            // let airQualityResponse = this.props.airQuality;

            let temperature = weatherResponse.item.condition.temp;
            let conditionText = weatherResponse.item.condition.text;
            let hi = weatherResponse.item.forecast[0].high;
            let lo = weatherResponse.item.forecast[0].low;
            let wind = weatherResponse.wind.speed;
            // let pm25Value = airQualityResponse.value;

            return (
                <section className="card">     
                <h3>Local weather condition</h3>
                <div className="content">
                  <div className="column">
                    <h3>{conditionText} {temperature} F</h3>
                  </div>                        
                  <div className="column">
                    <h3>{hi} F / {lo} F</h3>
                  </div> 
                  <div className="column">
                    <h3>{wind} mph</h3>
                  </div>                                                            
                </div>
                <p>{new Date().toLocaleTimeString()}</p>
              </section>
            )
        }
        return null;
    }
}

export default LocalInfoCard;


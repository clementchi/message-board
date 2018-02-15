import React, { Component } from 'react';
import './Card.css';

class LocalInfoCard extends Component {
    getWindDirText (dir){
        let dirText;
        dir = parseInt(dir, 10);
        if (0 <= dir && dir <= 30){
            dirText = 'N';
        }
        if (30 < dir && dir <= 60){
            dirText = 'NE';
        }
        if (60 < dir && dir <= 90){
            dirText = 'E';
        }            
        if (90 < dir && dir <= 120){
            dirText = 'E';
        }                        
        if (120 < dir && dir <= 150){
            dirText = 'SE';
        }
        if (150 < dir && dir <= 180){
            dirText = 'S';
        }
        if (180 < dir && dir <= 210){
            dirText = 'S';
        }
        if (210 < dir && dir <= 240){
            dirText = 'SW';
        }
        if (240 < dir && dir <= 270){
            dirText = 'W'
        }
        if (270 < dir && dir <= 300){
            dirText = 'W'
        }
        if (300 < dir && dir <= 330){
            dirText = 'NW'
        }
        if (330 < dir && dir <= 360){
            dirText = 'N'
        }  
        return dirText;
    }
    render(){
        if (this.props.data.weather && this.props.data.airQuality){
            let weatherResponse = this.props.data.weather;
            // let airQualityResponse = this.props.airQuality;

            let temperature = weatherResponse.item.condition.temp;
            let conditionText = weatherResponse.item.condition.text;
            let hi = weatherResponse.item.forecast[0].high;
            let lo = weatherResponse.item.forecast[0].low;
            let wind = weatherResponse.wind.speed;
            let dir = weatherResponse.wind.direction;
            let humidity = weatherResponse.atmosphere.humidity;
            let localCity = weatherResponse.location.city;
            let dirText = this.getWindDirText(dir);


            // let pm25Value = airQualityResponse.value;

            return (
                <section className="card">     
                <h3>{localCity} weather condition</h3>
                <div className="content">
                  <div className="column">
                    <h3>{conditionText} {temperature} F</h3>
                  </div>                        
                  <div className="column">
                    <h3>{hi} F / {lo} F</h3>
                  </div> 
                  <div className="column">
                    <h3>{wind} mph {dirText}</h3>
                  </div> 
                  <div className="column">
                    <h3>{humidity} %</h3>
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


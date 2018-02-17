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
    /**
     * Radar image only show up when there is shower, thunderstorm
     */
    shouldShowRadar(weatherCode, lat, lng){
        if (![20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 44, 3200].indexOf(weatherCode)){
            return (
                <section className="card fill" >     
                    <img alt="radar" src={`http://api.wunderground.com/api/16bbc144197b4fff/radar/image.gif?centerlat=${lat}&centerlon=${lng}&radius=40&width=570&height=280&newmaps=1`}></img>
                </section>
            )
        }
    }

    render(){
        if (this.props.data.weather){
            let weatherResponse = this.props.data.weather;
            let temperature = weatherResponse.item.condition.temp;
            let conditionText = weatherResponse.item.condition.text;
            let hi = weatherResponse.item.forecast[0].high;
            let lo = weatherResponse.item.forecast[0].low;
            let wind = weatherResponse.wind.speed;
            let dir = weatherResponse.wind.direction;
            let humidity = weatherResponse.atmosphere.humidity;
            let localCity = weatherResponse.location.city;
            let dirText = this.getWindDirText(dir);
            let radarCard = this.shouldShowRadar(weatherResponse.item.condition.code, weatherResponse.item.lat, weatherResponse.item.long);
            // let pm25Value = airQualityResponse.value;

            return (
                <React.Fragment>
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
                <div className="content secondary">                    
                    <div className="column">
                        <h4>{weatherResponse.item.forecast[1].day}</h4>
                        <h5>{weatherResponse.item.forecast[1].text}  {weatherResponse.item.forecast[1].high} F / {weatherResponse.item.forecast[1].low} F</h5> 
                    </div>
                    <div className="column">
                        <h4>{weatherResponse.item.forecast[2].day}</h4>
                        <h5>{weatherResponse.item.forecast[2].text}  {weatherResponse.item.forecast[2].high} F / {weatherResponse.item.forecast[2].low} F</h5> 
                    </div>
                </div>
                <p className="footer">Last update {new Date().toLocaleTimeString()}</p>
              </section>
              {radarCard}
              </React.Fragment>
            )
        }
        return null;
    }
}

export default LocalInfoCard;


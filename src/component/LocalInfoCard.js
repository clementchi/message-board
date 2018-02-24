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
        let url = `https://api.wunderground.com/api/16bbc144197b4fff/animatedradar/image.gif?centerlat=${lat}&centerlon=${lng}&radius=40&width=570&height=300&newmaps=1&timelabel=1&timelabel.x=10&timelabel.y=290&smooth=1&num=5&bust=${Math.floor(Math.random() * Math.floor(1000))}`;
        return (
            <section id="radar" className="card fill" >     
                <img ref='img' alt="radar" width="100%" src=''></img>
            </section>
        )
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
            let tempStyle = '';
            if (temperature >= 90){
                tempStyle = 'alert-danger';
            }
            else if (temperature >= 80){
                tempStyle = 'alert-warn';
            }
            else if (temperature >= 60){
                tempStyle = 'alert-success';
            }            
            else {
                tempStyle = 'alert-info';
            }

            return (
                <React.Fragment>
                <section className="card">     
                <div className="header">
                    <h3 className="grey8">{localCity} weather</h3>
                </div>
                <div className="body">
                    <div className="row">
                        <div className="col-6">                            
                            <h1 className={tempStyle}>{temperature} F</h1>
                        </div>
                        <div className="col-6">
                            <h4><span className="grey4">{conditionText}</span></h4>
                            <h5 className="grey4 d-none d-block"><span className="d-inline-block">{hi}/{lo} F</span>&nbsp;&nbsp;<span className="d-inline-block">{wind} mph {dirText}</span>&nbsp;&nbsp;<span className="d-inline-block">{humidity} %</span></h5>
                        </div>                                                
                    </div>
                    <div className="d-none d-sm-block">
                        <div className="row">                    
                            <div className="col-sm-6">
                                <h4 className="grey8">{weatherResponse.item.forecast[1].day}</h4>
                                <h5 className="grey6">{weatherResponse.item.forecast[1].text}  {weatherResponse.item.forecast[1].high}/{weatherResponse.item.forecast[1].low} F</h5> 
                            </div>
                            <div className="col-sm-6">
                                <h4 className="grey8">{weatherResponse.item.forecast[2].day}</h4>
                                <h5 className="grey6">{weatherResponse.item.forecast[2].text}  {weatherResponse.item.forecast[2].high}/{weatherResponse.item.forecast[2].low} F</h5> 
                            </div>
                        </div>
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


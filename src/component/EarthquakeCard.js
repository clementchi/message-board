import React, { Component } from 'react';
import './Card.css';

class EarthquakeInfoCard extends Component {
    getMagnitudeColor(magnitude){
        let tempStyle;
        if (magnitude >= 6){
            tempStyle = 'alert-danger';
        }
        else if (magnitude >= 4){
            tempStyle = 'alert-warn';
        }
        else if (magnitude >= 3){
            tempStyle = 'alert-success';
        }            
        else {
            tempStyle = 'alert-info';
        }
        return tempStyle;
    }
    showRecentQuakes(quakes){
        return quakes.map((quake)=>{
            let magnitudeColorStyle = `col-2 ${quake.colorStyle}`;
            return (
                <div className="row">
                    <div className={magnitudeColorStyle}><span className="d-inline-block">{quake.magnitude}M</span></div>
                    <div className="col-6 grep8"><i className="fas fa-map-marker-alt grey8"></i> <a href={quake.url} className="grey8">{quake.location}</a></div>
                    <div className="col-4 grey8">{quake.time}</div>                    
                </div>
            )
        });
    }
    render(){
        if (this.props.data.earthquake.length > 0){
            let recentEarthquakes = this.props.data.earthquake.map((quake)=>{
                let earthquakeInfo = quake.properties;
                let time = new Date();
                time.setTime(earthquakeInfo.time);
                let location = earthquakeInfo.place.substr(0, earthquakeInfo.place.lastIndexOf(','))
                return {
                    magnitude: earthquakeInfo.mag,
                    location: location,
                    colorStyle: this.getMagnitudeColor(earthquakeInfo.magnitude),
                    time: time.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', second:'2-digit'}),
                    url: earthquakeInfo.url
                }
            });

            let latestEarthqukeInfo = recentEarthquakes.shift();

            let latestEarthquakeDisplay = this.showRecentQuakes(recentEarthquakes)

            return (
                <React.Fragment>
                    <section className="card">     
                        <div className="header">
                            <h3 className="grey8"><i className="fas fa-exclamation-circle alert-danger"></i> Earthquake Alert</h3>
                        </div>
                        <div className="row">
                            <div className="col-6">                            
                                <h1 className={latestEarthqukeInfo.colorStyle}>{latestEarthqukeInfo.magnitude} M</h1>
                            </div>
                            <div className="col-6">                            
                                <h6><span className="grey4 d-inline-block"><i className="fas fa-map-marker-alt"></i> <a href={latestEarthqukeInfo.url}>{latestEarthqukeInfo.location}</a></span></h6>
                                <h6 className="grey4 d-none d-block">{latestEarthqukeInfo.time}</h6>
                            </div>                            
                        </div>                       
                        {latestEarthquakeDisplay}                    
                    </section>
              </React.Fragment>
            )
        }
        return null;
    }
}

export default EarthquakeInfoCard;


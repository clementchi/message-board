import React, { Component } from 'react';
import './Card.css';

class CalendarEventCard extends Component {      
    render(){
        let eventInfo = this.props.data.event;
        let duration = '-';
        let trafficDelay = '-';
        let reportTime = new Date().toLocaleTimeString();
        let temperature;
        let conditionText = '-';
        let delayStyle;
        let location = 'Unknown location';
        let startTime = new Date(eventInfo.start.dateTime).toLocaleTimeString();
        let trainInfo = [];
        let mapUrl;
        if (Object.keys(this.props.data.bart).length > 0){
          trainInfo = Object.keys(this.props.data.bart).map((destination)=>{
            return (
              <tr key={destination}>
                <td><i className="fa fa-subway"></i> {destination}</td><td>{this.props.data.bart[destination].toLocaleTimeString()}</td>
              </tr>
            )
          });
        }

        if (eventInfo.location){
          location = eventInfo.location;
          let weatherResponse = this.props.data.weather;
          let tripResponse = this.props.data.trip;
          if (eventInfo && tripResponse && weatherResponse){
              duration = tripResponse.rows[0].elements[0].duration_in_traffic.text;
              trafficDelay = (tripResponse.rows[0].elements[0].duration_in_traffic.value - tripResponse.rows[0].elements[0].duration.value) / 60
              temperature = weatherResponse.item.condition.temp;
              conditionText = weatherResponse.item.condition.text;
              mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${location}`;
              
              if (trafficDelay > 20){
                delayStyle = 'alert-danger';
              }
              else if (trafficDelay > 10){
                delayStyle = 'alert-warn';
              }
              else if (trafficDelay > 5){
                delayStyle = 'alert-info';
              }
              else {
                delayStyle = 'alert-success';
              }
          }  
        }  
        return (
          <section className="card">   
            <h3 className="header">{eventInfo.summary}</h3>
            <p><i className="fa fa-clock-o"></i> {startTime}</p>
            <p><i className="fa fa-map-marker"></i> <a href={mapUrl} target="_map">{location}</a></p>
            <table>
            {trainInfo}
            </table>
            <div className="content">
              <div className="column">
                <h1 className={delayStyle}>{duration}</h1>
              </div>
              <div className="column">
                <h3>{conditionText} {temperature} F</h3>
              </div>                        
            </div>
            <p>{reportTime}</p>     
          </section>
        );              
    }
}

// Use connect to put them together
export default CalendarEventCard;


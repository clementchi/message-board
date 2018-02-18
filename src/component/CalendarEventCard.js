import React, { Component } from 'react';
import './Card.css';

class CalendarEventCard extends Component {      
    render(){
        let eventInfo = this.props.data.event;
        let duration = '-';
        let trafficDelay = '-';
        // let reportTime = new Date().toLocaleTimeString();
        let temperature;
        let conditionText = '-';
        let delayStyle;
        let location = 'Unknown location';
        let startTime = new Date(eventInfo.start.dateTime).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
        let trainInfo = [];
        let mapUrl;
        if (Object.keys(this.props.data.bart).length > 0){
          trainInfo = Object.keys(this.props.data.bart).map((destination)=>{
            return (
              <tr key={destination} className="grey8">
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
            <div className="header">
              <div className="flexContainer">  
                <div className="column">
                  <h3>{eventInfo.summary}</h3>
                </div>
                <div className="column">
                  <h4 className="grey4"><i className="fa fa-clock-o"></i> {startTime}</h4>
                </div>
              </div>
            </div>
            <p className="grey11 gap"><i className="fa fa-map-marker"></i> <a href={mapUrl} target="_map">{location}</a></p>
            <div className="content gap-lg">              
              <div className="column">
                <h1 className={delayStyle}>
                  <span className="v-align">
                    {duration}
                  </span>
                </h1>
              </div>
              <div className="column">
                <h3 className="grey8">
                  <span className="v-align">
                    {temperature} F {conditionText} 
                  </span>
                </h3>
              </div>                        
            </div>
            <table className="content gap-- secondary">
              <tbody>
                {trainInfo}
              </tbody>
            </table>
            {/* <p className="footer">Last update {reportTime}</p>      */}
          </section>
        );              
    }
}

// Use connect to put them together
export default CalendarEventCard;


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
        let startTime = '-';
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
        if (eventInfo.start){
          startTime = new Date(eventInfo.start.dateTime).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})
        }
        if (eventInfo.location){
          location = eventInfo.location;
          let weatherResponse = this.props.data.weather;
          let tripResponse = this.props.data.trip;
          if (tripResponse && weatherResponse){
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
              <div className="row">  
                <div className="card-title col-12 text-truncate">
                  <h3><span className="grey4 d-inline-block"> {startTime}</span>&nbsp;&nbsp;<span className="d-inline-block">{eventInfo.summary}</span></h3>
                </div>
                {/* <div className="card-title col-6">
                  <h4 className="grey4">
                </div> */}
              </div>
            </div>            
            <div className="row gap-lg">              
              <div className="col-6">
                <h1 className={delayStyle}>
                  <span className="v-align">
                    {duration}
                  </span>
                </h1>
              </div>
              <div className="col-6">
                <h3 className="grey8">
                  <span className="v-align">
                    {temperature} F {conditionText} 
                  </span>
                </h3>
              </div>                        
            </div>
            <p className="grey11 gap"><i className="fa fa-map-marker"></i> <a href={mapUrl} target="_map">{location}</a></p>
            <table className="d-none d-sm-block gap--">
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


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
              <div key={destination} className="grey8 col-sm-6">
                <i className="fa fa-subway"></i> {destination} {this.props.data.bart[destination].toLocaleTimeString()}
              </div>
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
              duration = `${Math.round(tripResponse.rows[0].elements[0].duration_in_traffic.value / 60)} mins` ;
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
              <h4 className="text-truncate grey8"><i className="fas fa-clock"></i><span> {startTime}</span>&nbsp;-&nbsp;<span>{eventInfo.summary}</span></h4>
            </div>            
            <div className="row">              
              <div className="col-6">
                <h1 className={delayStyle}>
                    {duration}
                </h1>
              </div>
              <div className="col-6">
                <h4 className="grey8 align-bottom">
                  {temperature} F {conditionText} 
                </h4>
              </div>                        
            </div>
            <p className="grey11 gap"><i className="fas fa-map-marker-alt"></i> <a href={mapUrl} target="_map">{location}</a></p>
            <div className="row" style={{marginBottom:'1rem'}}>
                {trainInfo}
            </div>
            {/* <p className="footer">Last update {reportTime}</p>      */}
          </section>
        );              
    }
}

// Use connect to put them together
export default CalendarEventCard;


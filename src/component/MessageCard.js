import React, { Component } from 'react';
import './MessageCard.css';
import TravelTimeService from '../service/TravelTimeService';
import TravelWeatherService from '../service/TravelWeatherService';
import CalendarEventService from '../service/CalendarEventService';
import ContextService from '../service/ContextService';

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

    // var mapOptions = {
    //   zoom: 13,
    //   center: new window.google.maps.LatLng(51.5,-0.11)
    // }
    
    // var map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
    
    // var cloudLayer = new window.google.maps.weather.CloudLayer();
    // cloudLayer.setMap(map);
    // var transitLayer = new window.google.maps.TransitLayer();
    // transitLayer.setMap(map);  
  }

  initializeMap (){
    let tileNEX, tileNEX5, tileNEX10
    let tileNEX15, tileNEX20, tileNEX25
    let tileNEX30

    var mapOptions = {
      zoom: 5,
      center: new window.google.maps.LatLng(42.5, -95.5),
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    };
    this.map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
  
    //Load Images and add them to imageArray
    tileNEX = new window.google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new window.google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD',
        isPng: true,
    });
    this.map.overlayMapTypes.push(tileNEX);
  
    tileNEX5 = new window.google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m05m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new window.google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD5',
        isPng: true,
    });
    this.map.overlayMapTypes.push(tileNEX5);
  
    tileNEX10 = new window.google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m10m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new window.google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD10',
        isPng: true,
        optimized: false
    });
    this.map.overlayMapTypes.push(tileNEX10);
  
    tileNEX15 = new window.google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m15m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new window.google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD15',
        isPng: true,
    });
    this.map.overlayMapTypes.push(tileNEX15);

    tileNEX20 = new window.google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m20m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new window.google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD20',
        isPng: true,
    });
    this.map.overlayMapTypes.push(tileNEX20);

    tileNEX25 = new window.google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m25m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new window.google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD25',
        isPng: true,
    });
    this.map.overlayMapTypes.push(tileNEX25);
  
    tileNEX30 = new window.google.maps.ImageMapType({
        getTileUrl: function(tile, zoom) {
            return "http://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913-m30m/" + zoom + "/" + tile.x + "/" + tile.y +".png?"+ (new Date()).getTime(); 
        },
        tileSize: new window.google.maps.Size(256, 256),
        opacity:0.00,
        name : 'NEXRAD30',
        isPng: true,
    });
    this.map.overlayMapTypes.push(tileNEX30);
  
    var index = this.map.overlayMapTypes.getLength() - 1;

    window.setInterval(()=>{  
      this.map.overlayMapTypes.getAt(index).setOpacity(0.00);

      index--;
      if(index < 0){
          index = this.map.overlayMapTypes.getLength() - 1;
      }
      this.map.overlayMapTypes.getAt(index).setOpacity(0.60);
    }, 400);
  }
  
  animateRadar() {
    var index = this.map.overlayMapTypes.getLength() - 1;

    window.setInterval(()=>{  
      this.map.overlayMapTypes.getAt(index).setOpacity(0.00);

      index--;
      if(index < 0){
          index = this.map.overlayMapTypes.getLength() - 1;
      }
      this.map.overlayMapTypes.getAt(index).setOpacity(0.60);
    }, 400);
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

  calendarEventResponse = (response) => {

  }

  contextServiceResponse = (response) => {
    console.log(response);
  }

  render(){
    window.google.maps.event.addDomListener(window, 'load', this.initializeMap);

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
        <TravelTimeService context={this.props.context} origin={this.props.origin} destination={this.props.destination} responseCallback={this.travelTimeResponse}/>
        <TravelWeatherService destination={this.props.origin} responseCallback={this.originWeatherResponse}/>
        <TravelWeatherService destination={this.props.destination} responseCallback={this.destinationWeatherResponse}/>
        <CalendarEventService responseCallback={this.calendarEventResponse}/>
        <ContextService responseCallback={this.contextServiceResponse}/>
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

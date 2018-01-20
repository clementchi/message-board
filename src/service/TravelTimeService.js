import { Component } from 'react';

class TravelTimeService extends Component {
  getData(){
    let _this = this;
    var service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [this.props.origin],
      destinations: [this.props.destination],
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false,
      drivingOptions: {
        departureTime: new Date()
      }
    }, function(data){
      _this.props.responseCallback(data);
      window.setTimeout(_this.getData.bind(_this), _this.props.refreshInterval || 300000);
    });
  }
  componentDidMount(){
    this.getData();
  }

  render (){
    return ('');
  }
}

export default TravelTimeService;

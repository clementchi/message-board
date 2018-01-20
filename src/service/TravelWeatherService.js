import { Component } from 'react';

class TravelWeatherService extends Component {
  constructor(){
    super();
    this.state = {};    
  }

  getData(){
    let _this = this;
    fetch(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${this.props.destination}")&format=json&env=store://datatables.org/alltableswithkeys`)
      .then(response => {
        return response.json();
      }).then(data=>{
        _this.props.responseCallback(data);
        window.setTimeout(_this.getData.bind(_this), _this.props.refreshInterval || 300000);       
        return ('')
      });
  }

  componentDidMount(){
    this.getData();
  }

  render (){
    return ('');
  }
}

export default TravelWeatherService;
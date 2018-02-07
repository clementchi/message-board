import { Component } from 'react';

class CalendarEventService extends Component {
  constructor(){
    super();
    this.state = {};    
  }

  getData(){
    let _this = this;
    fetch(`https://www.googleapis.com/calendar/v3/calendars/sanramonrobot@gmail.com/events?key=AIzaSyDWhkvTlg4cP6V1hePNDfwbMhwOlZlrCiU`)
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

export default CalendarEventService;
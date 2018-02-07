import { Component } from 'react';

class ContextService extends Component {
  constructor(){
    super();
    this.state = {};    
  }

  getData(){
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.props.responseCallback(position);
        });
    }
  }

  componentDidMount(){
    this.getData();
  }

  render (){
    return ('');
  }
}

export default ContextService;
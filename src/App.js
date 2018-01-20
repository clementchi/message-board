import React, { Component } from 'react';
import './App.css';
import MessageCard from './component/MessageCard';

class App extends Component {
  render() {
    return (
      <div className="app">
        <MessageCard origin="7085 Briza loop San Ramon,CA" destination="Pleasant Hill, CA" showOrigin={false}/>
        <MessageCard origin="7085 Briza loop San Ramon,CA" destination="Alameda, CA" showOrigin={false}/>
        <MessageCard origin="7085 Briza loop San Ramon,CA" destination="Pinole, CA" showOrigin={false}/>
        <MessageCard origin="7085 Briza loop San Ramon,CA" destination="Walnut Creek, CA" showOrigin={false}/>
        <MessageCard origin="7085 Briza loop San Ramon,CA" destination="Castro Valley, CA" showOrigin={false}/>
        <MessageCard origin="7085 Briza loop San Ramon,CA" destination="Pleasanton, CA" showOrigin={false}/>
      </div>
    );
  }
}

export default App;

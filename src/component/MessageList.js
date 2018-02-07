import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageCard from './MessageCard';

class MessageList extends Component {
  render (){        
    if (!this.props.context.timestamp){     
      return null;
    }
    return (
    <div className="app">
      <MessageCard context={this.props.context} origin="7085 Briza loop San Ramon,CA" destination="Pleasant Hill, CA" showOrigin={false}/>
      <MessageCard context={this.props.context} origin="7085 Briza loop San Ramon,CA" destination="Alameda, CA" showOrigin={false}/>
      <MessageCard context={this.props.context} origin="7085 Briza loop San Ramon,CA" destination="Pinole, CA" showOrigin={false}/>
      <MessageCard context={this.props.context} origin="7085 Briza loop San Ramon,CA" destination="Walnut Creek, CA" showOrigin={false}/>
      <MessageCard context={this.props.context} origin="7085 Briza loop San Ramon,CA" destination="Castro Valley, CA" showOrigin={false}/>
      <MessageCard context={this.props.context} origin="7085 Briza loop San Ramon,CA" destination="Pleasanton, CA" showOrigin={false}/>
    </div>
    )
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
    return {
      // You can now say this.props.books
      context: state.context
    }
  };
  
  // Maps actions to props
  const mapDispatchToProps = (dispatch) => {
    return {}
  };
  
// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);


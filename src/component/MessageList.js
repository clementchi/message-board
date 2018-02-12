import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MessageCard from './MessageCard';
// import LocalInfoCard from './LocalInfoCard';
import TripInfoCard from './TripInfoCard';

class MessageList extends Component {
  render (){        
    // render if context is populated
    if (!this.props.context.timestamp){     
      return null;
    }
    let destinations = [{
      address: 'Pleasant Hill, CA'
    },{
      address: 'Alameda, CA'
    }]

    let destinationCards = destinations.map((destination)=>{
      return (
        <TripInfoCard key={destination.address} context={this.props.context} destination={destination.address}></TripInfoCard>
      )
    })

    return (       
        <div>
          {destinationCards}
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


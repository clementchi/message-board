import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as earthquakeAction from '../reduxActionReducer/earthquakeActionReducer';
import EarthquakeCard from '../component/EarthquakeCard';

class EarthquakeInfoContainer extends Component {
    componentDidMount(){
        //get data for the first time
        this.getData();
    }
    getData(){
        let minTime = new Date();
        let maxTime = new Date();
        minTime.setHours(maxTime.getHours() - 6);        
        this.props.getEarthquake(minTime, maxTime, this.props.context, 2.5, 65);
        this.timeoutRef = window.setTimeout(()=>{
          this.getData();
        }, 300000);
    } 
    componentWillReceiveProps(nextProps){
        if (!nextProps.context.latitude || !nextProps.context.longitude){
            return;
        }
        if (this.props.context.latitude !== nextProps.context.latitude || this.props.context.longitude !== nextProps.context.longitude){
            clearTimeout(this.timeoutRef);
            this.getData();        
        }
    }    
    render(){
        let earthquakeResponse = earthquakeAction.resolveEarthquakeFromProps(this.props, `${this.props.context.latitude}${this.props.context.longitude}`);
        if (earthquakeResponse){
            let data = {
                earthquake: earthquakeResponse
            }

            return (
                <EarthquakeCard data={data}/>
            )
        }
        return null;
    }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    earthquake: state.earthquake
  }
};

// Maps actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        getEarthquake: (minTime, maxTime, context, minMagnitude, maxRadius) => {
            dispatch(earthquakeAction.getEarthquake(minTime, maxTime, context, minMagnitude, maxRadius));
        }
    } 
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(EarthquakeInfoContainer);


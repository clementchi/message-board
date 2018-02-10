// action creator;
export const getTripDuration = (context, destinationAddress) => {
    return (dispatch) => {
        var service = new window.google.maps.DistanceMatrixService();
        var originLatLng = new window.google.maps.LatLng(context.coords.latitude, context.coords.longitude);
        service.getDistanceMatrix({
          origins: [originLatLng],
          destinations: [destinationAddress],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false,
          drivingOptions: {
            departureTime: new Date()
          }
        }, function(tripDurationInfo){
            dispatch(getTripDurationSuccess(getTripKey(context.coords.latitude,context.coords.longitude,destinationAddress), tripDurationInfo));
        });
        }
}

export function getTripDurationSuccess(tripKey, tripDuration) {
    let newState = {}      
    newState[tripKey] = tripDuration;
    return {
        type: 'GET_TRIP_DURATION_SUCCESS',
        state: newState
    };
}

export function getTripKey(latitude, longitude, destinationAddress){
  return `${latitude}${longitude}${destinationAddress}`
}

// reducer to return a state
export default (state = {}, action) => {
    switch (action.type){
      case 'GET_TRIP_DURATION_SUCCESS':
        return Object.assign({}, state, action.state);
      default:
        return state;
    }
  };
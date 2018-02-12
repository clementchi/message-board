// action creator;
export const getAirQuality = (context) => {
    return (dispatch) => {
        let url = '';
        let location = '';
        if (context && context.latitude){
          location = `${context.latitude}${context.longitude}`;
          url = `https://api.openaq.org/v1/latest?country=US&radius=20000&parameter=pm25&coordinates=${context.latitude},${context.longitude}&limit=1&sort=asc`
          fetch(url)
          .then(response => {
            return response.json();
          }).then(airQualityInfo=>{
            dispatch(getAirQualitySuccess(location, airQualityInfo));
            return ('')
          });
        }
    }
}

export function getAirQualitySuccess(location, airQualityInfo) {
    let newState = {};
    newState[location] = airQualityInfo;
    return {
        type: 'GET_AIR_QUALITY_SUCCESS',
        state: newState
    };
}

export function resolveAirQualityFromProps(props){
    let airQualityKey = `${props.context.latitude}${props.context.longitude}`
    let airQualityResponse = props.airQuality[airQualityKey] || null;
    if (airQualityResponse){
      return airQualityResponse.results[0].measurements[0]
    }
    return null;
  }

// reducer to return a state
export default (state = {}, action) => {
  switch (action.type){
    case 'GET_AIR_QUALITY_SUCCESS':
      return Object.assign({}, state, action.state);
    default:
      return state;
  }
};
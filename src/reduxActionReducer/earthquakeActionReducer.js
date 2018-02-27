// action creator;
export const getEarthquake = (minTime, maxTime, location, minMagnitude, maxRadius) => {
    return (dispatch) => {
        let url = '';
        let earthquakeKey = '';
        if (location.latitude){
          earthquakeKey = `${location.latitude}${location.longitude}`;
          url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${minTime.toISOString()}&endtime=${maxTime.toISOString()}&latitude=${location.latitude}&longitude=${location.longitude}&maxradiuskm=${maxRadius}&minmagnitude=${minMagnitude}&orderby=time&limit=6`
        }
        fetch(url)
          .then(response => {
            return response.json();
          }).then(earthquakeInfo=>{
            dispatch(getEarthquakeSuccess(earthquakeKey, earthquakeInfo));
            return ('')
          });
    }
}

export function resolveEarthquakeFromProps(props, earthQuakeKey){
  let earthquakeResponse = props.earthquake[earthQuakeKey] || null;
  if (earthquakeResponse){
    return earthquakeResponse.features;
  }
  return null;
}

export function getEarthquakeSuccess(location, earthquakeInfo) {
    let newState = {};
    newState[location] = earthquakeInfo;
    return {
        type: 'GET_EARTHQUAKE_SUCCESS',
        state: newState
    };
}

// reducer to return a state
export default (state = {}, action) => {
  switch (action.type){
    case 'GET_EARTHQUAKE_SUCCESS':
      return Object.assign({}, state, action.state);
    default:
      return state;
  }
};
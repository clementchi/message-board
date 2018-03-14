import _ from 'lodash';

// action creator;
export const getWeather = (location) => {
    return (dispatch) => {
        let url = '';
        let weatherKey = '';
        if (location.latitude){
          weatherKey = `${location.latitude}${location.longitude}`;
          url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places where text="(${location.latitude}, ${location.longitude})")&format=json&env=store://datatables.org/alltableswithkeys`
        }
        else {
          weatherKey = location.replace(/#/g, '');
          url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${weatherKey}")&format=json&env=store://datatables.org/alltableswithkeys`
        }
        fetch(url)
          .then(response => {
            return response.json();
          }).then(weatherInfo=>{
            dispatch(getWeatherSuccess(weatherKey, weatherInfo));
            return ('')
          });
    }
}

export function resolveWeatherFromProps(props, weatherKey){
  let weatherResponse = props.weather[weatherKey] || null;
  if (weatherResponse){
    return _.get(weatherResponse, 'query.results.channel') || null;
  }
  return null;
}

export function getWeatherSuccess(location, weatherInfo) {
    let newState = {};
    newState[location] = weatherInfo;
    return {
        type: 'GET_WEATHER_SUCCESS',
        state: newState
    };
}

// reducer to return a state
export default (state = {}, action) => {
  switch (action.type){
    case 'GET_WEATHER_SUCCESS':
      return Object.assign({}, state, action.state);
    default:
      return state;
  }
};
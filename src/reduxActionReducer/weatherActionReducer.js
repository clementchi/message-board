// action creator;
export const getWeather = (context) => {
    return (dispatch) => {
        let url = '';
        let location = '';
        if (context && context.coords){
          location = `${context.coords.latitude}${context.coords.longitude}`;
          url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places where text="(${context.coords.latitude}, ${context.coords.longitude})")&format=json&env=store://datatables.org/alltableswithkeys`
        }
        else {
          location = context;
          url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${context}")&format=json&env=store://datatables.org/alltableswithkeys`
        }
        fetch(url)
          .then(response => {
            return response.json();
          }).then(weatherInfo=>{
            dispatch(getWeatherSuccess(location, weatherInfo));
            return ('')
          });
    }
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
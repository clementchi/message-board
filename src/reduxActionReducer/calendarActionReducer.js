// action creator;
export const getCalendarEvents = () => {
    return (dispatch) => {
        fetch(`https://www.googleapis.com/calendar/v3/calendars/sanramonrobot@gmail.com/events?key=AIzaSyDWhkvTlg4cP6V1hePNDfwbMhwOlZlrCiU`)
          .then(response => {
            return response.json();
          }).then(data=>{
            dispatch(getCalendarEventsSuccess(data));
            return ('')
          });
    }
}

export function getCalendarEventsSuccess(events) {
    return {
        type: 'GET_CALENDAR_EVENTS_SUCCESS',
        state: events
    };
}

// reducer to return a state
export default (state = {}, action) => {
    switch (action.type){
      case 'GET_CALENDAR_EVENTS_SUCCESS':
        return action.state;
      default:
        return state;
    }
  };

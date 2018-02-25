// action creator;
export const getCalendarEvents = (calendarId, minTime, maxTime) => {
    return (dispatch) => {
      window.gapi.client.request({
        'path': `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=${minTime.toISOString()}&timeMax=${maxTime.toISOString()}&orderBy=startTime&singleEvents=true`
      }).then(function(response) {
        dispatch(getCalendarEventsSuccess(response.result));
      }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
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

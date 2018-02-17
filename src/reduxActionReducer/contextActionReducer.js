// action creator;
export const getContext = () => {
    return (dispatch) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let pos = {
                    latitude: +parseFloat(position.coords.latitude).toFixed(2),
                    longitude: +parseFloat(position.coords.longitude).toFixed(2),
                    timestamp: position.timestamp
                }
                dispatch(getContextSuccess(pos))
            });
        }
    }
}

export function getContextSuccess(context) {
    return {
        type: 'GET_CONTEXT_SUCCESS',
        state: context
    };
}

export function isContextDefined(props){
    if (!props.context.latitude){
        return;
    }
    return true;    
}

// reducer to return a state
export default (state = {}, action) => {
    switch (action.type){
      case 'GET_CONTEXT_SUCCESS':
        return Object.assign({}, state, action.state);
      default:
        return state;
    }
  };
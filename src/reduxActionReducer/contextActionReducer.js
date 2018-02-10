// action creator;
export const getContext = () => {
    return (dispatch) => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                dispatch(getContextSuccess(position))
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

// reducer to return a state
export default (state = {}, action) => {
    switch (action.type){
      case 'GET_CONTEXT_SUCCESS':
        return action.state;
      default:
        return state;
    }
  };
// action creator;
export const setUser = (user) => {
    return {
        type: 'SET_LOGGED_IN_USER',
        state: user
    };
}

// reducer to return a state
export default (state = {}, action) => {
    switch (action.type){
      case 'SET_LOGGED_IN_USER':
        return action.state;
      default:
        return state;
    }
};
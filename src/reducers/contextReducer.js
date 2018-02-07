// reducer return the state and update the state

export default (state = {}, action) => {
    switch (action.type){
      case 'GET_CONTEXT_SUCCESS':
        return action.state;
      default:
        return state;
    }
  };
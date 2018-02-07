// action creator;
export const getContext = () => {
    return (dispatch) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
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
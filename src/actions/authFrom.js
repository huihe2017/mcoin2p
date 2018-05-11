
export function setAuthFrom(data,callback) {
    return dispatch => {
        dispatch({type: 'SET_AUTH_FROM', data:data})
        callback()
    }
}


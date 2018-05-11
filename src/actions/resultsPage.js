
export function setResultsPage(data,callback) {
    return dispatch => {
        dispatch({type: 'SET_RESULTSPAGE', data:data})
        callback()
    }
}


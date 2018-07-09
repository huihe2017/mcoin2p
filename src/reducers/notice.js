let initialState = {}

export default function notic(state = initialState, action = {}) {

    switch (action.type) {

        case 'GET_NOTIC_DETAILS':

            state.noticeDetails = action.data.data
            return Object.assign({}, state, {})
        default:
            return state
    }

}

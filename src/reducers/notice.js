let initialState = {
    noticeDetails:{}
}

export default function notic(state = initialState, action = {}) {

    switch (action.type) {

        case 'GET_NOTIC_DETAILS':

            state.noticeDetails[action.id] = action.data.data
            return Object.assign({}, state, {})
        default:
            return state
    }

}

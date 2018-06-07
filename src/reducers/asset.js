let initialState = {}

export default function asset(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_ASSET_DETAIL':

            return action.data
        default:
            return state
    }

}

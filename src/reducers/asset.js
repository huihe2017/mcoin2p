let initialState = {}

export default function asset(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_ASSET_DETAIL':

            return Object.assign({}, state, action.data.data)

        case 'GET_FRIEND_WARD':
            state.friendWard = action.data.data
            return Object.assign({}, state, {})

        default:
            return state
    }

}

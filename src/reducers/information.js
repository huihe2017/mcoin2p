let initialState = {}

export default function information(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_INFORMATION_LIST':
            state.infos = action.data.data.infos
            return Object.assign({}, state, {})
        default:
            return state
    }

}

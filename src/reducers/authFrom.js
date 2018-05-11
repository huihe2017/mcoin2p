let initialState = {
    path:''
}

export default function authFrom(state = initialState, action = {}) {

    switch (action.type) {

        case 'SET_AUTH_FROM':
            state.path = action.data
            return Object.assign({}, state, {})


        default:
            return state
    }

}
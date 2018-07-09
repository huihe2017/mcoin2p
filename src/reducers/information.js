let initialState = {}

export default function information(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_INFORMATION_LIST':
            if(state[action.id]){
                let arr = state[action.id].concat(action.data.data.infos)
                state[action.id] = arr
            }else {
                state[action.id] = action.data.data.infos
            }
            state[action.id].page = action.data.data.pager.page


            return Object.assign({}, state, {})
        case 'GET_INFORMATION_TYPE':

            state.infosType = action.data.data.infotypes
            return Object.assign({}, state, {})
        case 'GET_INFORMATION_DETAILS':

            state.infosDetails = action.data.data
            return Object.assign({}, state, {})
        default:
            return state
    }

}

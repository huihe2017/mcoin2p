let initialState = {
}

export default function asset(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_ASSET_DETAIL':

            return Object.assign({}, state, action.data.data)

        case 'GET_FRIEND_WARD':
            state.friendWard = action.data.data
            return Object.assign({}, state, {})
        case 'GET_ACTIVE_COIN':
            if(!state.activeCoin){
                state.activeCoin = action.data.data
            }else {
                let arr = state.activeCoin.list.concat(action.data.data.list)
                state.activeCoin.list = arr
            }
            return Object.assign({}, state, {})
        case 'GET_BILLS_LIST':
            if(!state.bills){
                state.bills = action.data.data
            }else {
                let arr = state.bills.list.concat(action.data.data.list)
                state.bills.list = arr
            }
            return Object.assign({}, state, {})
        case 'GET_AWARD_DETAILS':
            state.awardDetails = action.data.data
            return Object.assign({}, state, {})
        default:
            return state
    }

}

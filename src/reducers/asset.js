let initialState = {
}

export default function asset(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_ASSET_DETAIL':
            return Object.assign({}, state, action.data.data)
        case 'GET_FRIEND_WARD':
            if(!state.friendWard){
                state.friendWard = action.data.data
            }else {
                let arr = state.friendWard.awardList.concat(action.data.data.awardList)
                state.friendWard.awardList = arr
            }
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
            if(!state.awardDetails){
                state.awardDetails = action.data.data
            }else {
                let arr = state.awardDetails.list.concat(action.data.data.list)
                state.awardDetails.list = arr
            }
            return Object.assign({}, state, {})
        default:
            return state
    }

}

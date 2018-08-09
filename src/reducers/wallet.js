let initialState = {
    loading: true,
    commonAddress: {}
}

export default function wallet(state = initialState, action = {}) {

    switch (action.type) {

        case 'NO_SAVE_CODE':

            state.isSetSaveCode = false
            state.loading = false
            return Object.assign({}, state, {})

        case  'GET_WALLET_INDEX_DATA':
            let {totalAmount, list} = action.data.data
            state.loading = false
            state.isSetSaveCode = true
            state.totalAmount = totalAmount
            state.list = list
            return Object.assign({}, state, {})
        case 'GET_WALLET_TRADE_RECORD':
            if (!state.current) {
                state.current = action.data.data
            } else {
                if (action.data.data.pager.page === 1) {
                    state.current = action.data.data
                } else {
                    let arr = state.current.list.concat(action.data.data.list)
                    state.current.list = arr
                }

            }
            return Object.assign({}, state, {})
        case 'GET_MINER_FEE':
            state.minerFeeList = action.data.data.feeList
            return Object.assign({}, state, {})
        case 'GET_COMMON_ADDRESS':

            // if (action.id === '') {
            //     action.id = 'all'
            // }

            if (state.commonAddress[action.id]) {

                if (action.data.data.pager.page === 1) {
                    state.commonAddress[action.id] = action.data.data.list
                } else {
                    debugger
                    let arr = state.commonAddress[action.id].concat(action.data.data.list)
                    state.commonAddress[action.id] = arr
                }
            } else {
                state.commonAddress[action.id] = action.data.data.list
            }
            state.commonAddress[action.id + 'page'] = action.data.data.pager.page
            //
            // if (!state.commonAddress) {
            //     state.commonAddress = action.data.data
            // } else {
            //     let arr = state.commonAddress.list.concat(action.data.data.list)
            //     state.commonAddress.list = arr
            // }
            return Object.assign({}, state, {})
        case 'CONFIRM_WITHDRAW_MSG':
            state.applyId = action.data.data.applyId
            return Object.assign({}, state, {})
        case 'CHECK_SAFE_CODE':
            state.isSaveCodeChecked = true
            return Object.assign({}, state, {})
        case 'CHECK_MOBILE_CODE':
            state.isMobileCodeChecked = true
            return Object.assign({}, state, {})
        case 'GET_RECHARGE_ADDRESS':
            state.current.address = action.data.data.address
            return Object.assign({}, state, {})
        case 'CLEAR_WALLET_INDEX_DATA':
            state.list = undefined
            return Object.assign({}, state, {})
        default:
            return state
    }

}

export function getSignStatus(state) {
    return state.sign.show
}

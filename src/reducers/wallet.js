let initialState = {
    loading: true,
}

export default function wallet(state = initialState, action = {}) {

    switch (action.type) {

        case 'NO_SAVE_CODE':

            state.isSetSaveCode = false
            state.loading = false
            return Object.assign({}, state, {})

        case  'GET_WALLET_INDEX_DATA':
            let {totalAmount,list} = action.data
            state.loading = false
            state.isSetSaveCode = true
            state.totalAmount = totalAmount
            state.list = list
            return Object.assign({}, state, {})
        case 'GET_WALLET_TRADE_RECORD':
            state.current = action.data
            return Object.assign({}, state, {})
        case 'GET_MINER_FEE':
            state.minerFeeList = action.data.feeList
            return Object.assign({}, state, {})
        case 'GET_COMMON_ADDRESS':
            state.commonAddress = action.data.list
            return Object.assign({}, state, {})
        case 'CONFIRM_WITHDRAW_MSG':
            state.applyId = action.data.applyId
            return Object.assign({}, state, {})
        case 'CHECK_SAFE_CODE':
            state.isSaveCodeChecked = true
            return Object.assign({}, state, {})
        case 'CHECK_MOBILE_CODE':
            state.isMobileCodeChecked = true
            return Object.assign({}, state, {})
        default:
            return state
    }

}

export function getSignStatus(state) {
    return state.sign.show
}

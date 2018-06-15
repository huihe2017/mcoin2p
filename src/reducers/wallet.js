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
        default:
            return state
    }

}

export function getSignStatus(state) {
    return state.sign.show
}

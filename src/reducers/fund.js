let initialState = {}

export default function fund(state = initialState, action = {}) {

    switch (action.type) {

        case 'GET_FUND_LIST':
            state.list = action.data.data.funds
            return Object.assign({}, state, {})
        case 'GET_FUND_DETAIL':
            state.detail = action.data.data
            return Object.assign({}, state, {})
        case 'GET_MY_FUND_LIST':
            state.myFund = action.data.data
            return Object.assign({}, state, {})
        case 'GET_MY_FUND_DETAILS':
            state.myFundDetails = action.data.data
            return Object.assign({}, state, {})
        case 'BUY_FUND':
            state.detail.startTime = action.data.data
            return Object.assign({}, state, {})
        case 'GET_FUND_CHART':
            state.detail.chart = action.data.data.list
            return Object.assign({}, state, {})
        case 'SET_AUTO_RENEW':
            let filterData = state.myFundDetails.activeUserOrderInfoList.filter((item) => action.data.orderId == item.orderId)
            console.log(44444444444,filterData);
            filterData.autoRenew = action.data.autoRenew
            console.log(55555555555555,state);
            return Object.assign({}, state, {})
        default:
            return state
    }

}

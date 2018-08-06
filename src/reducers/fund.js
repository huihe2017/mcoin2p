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
            if (!state.myFund) {
                state.myFund = action.data.data
            } else {
                let arr = state.myFund.userProducts.concat(action.data.data.userProducts)
                state.myFund.userProducts = arr
            }
            return Object.assign({}, state, {})
        case 'GET_MY_FUND_DETAILS':
            state.myFundDetails = action.data.data
            return Object.assign({}, state, {})
        case 'BUY_FUND':
            state.detail.startTime = action.data.data
            return Object.assign({}, state, {})
        case 'GET_FUND_CHART':
            state.detail ? (state.detail.chart = action.data.data.list) : (state.myFundDetails.chart = action.data.data.list)
            return Object.assign({}, state, {})
        case 'SET_AUTO_RENEW':
            let filterData = state.myFundDetails.activeUserOrderInfoList.filter((item) => action.data.orderId == item.orderId)
            filterData.autoRenew = action.data.autoRenew
            return Object.assign({}, state, {})
        case 'GET_TRADE_LIST':


            if(state['tradeList'+action.listType]){
                let arr = state['tradeList'+action.listType].concat(action.data.data.list)
                state['tradeList'+action.listType] = arr
            }else {
                state['tradeList'+action.listType] = action.data.data.list
            }
            state['tradeList'+action.listType+'page'] = action.data.data.pager.page




            // let type = action.listType
            // if (type === '') {
            //     state.tradeListAllPage = action.data.data.pager.page
            //     if (!state.tradeListAll) {
            //         state.tradeListAll = action.data.data.list
            //     } else {
            //         let arr = state.tradeListAll.concat(action.data.data.list)
            //         state.tradeListAll = arr
            //     }
            // }
            //
            // if (type === 0) {
            //     state.tradeListBuyPage = action.data.data.pager.page
            //     if (!state.tradeListBuy) {
            //         state.tradeListBuy = action.data.data.list
            //     } else {
            //         let arr = state.tradeListBuy.concat(action.data.data.list)
            //         state.tradeListBuy = arr
            //     }
            // }
            //
            // if (type === 1) {
            //     state.tradeListBackPage = action.data.data.pager.page
            //     if (!state.tradeListBack) {
            //         state.tradeListBack = action.data.data.list
            //     } else {
            //         let arr = state.tradeListBack.concat(action.data.data.list)
            //         state.tradeListBack = arr
            //     }
            // }
            //
            // if (type === 2) {
            //     state.tradeListOnPage = action.data.data.pager.page
            //     if (!state.tradeListOn) {
            //         state.tradeListOn = action.data.data.list
            //     } else {
            //         let arr = state.tradeListOn.concat(action.data.data.list)
            //         state.tradeListOn = arr
            //     }
            // }


            return Object.assign({}, state, {})
        case 'GET_TRADE_LIST_ING':
            state.tradeListIng = action.data.data
            return Object.assign({}, state, {})
        case 'GET_TRADE_DETAILS':
            state.tradeDatails = action.data.data
            return Object.assign({}, state, {})
        case 'GET_PROFIT_LIST':
            if (!state.profitList) {
                state.profitList = action.data.data
            } else {
                let arr = state.profitList.profitList.concat(action.data.data.profitList)
                state.profitList.profitList = arr
            }
            return Object.assign({}, state, {})
        default:
            return state
    }

}

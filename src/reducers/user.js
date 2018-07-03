let initialState = {
    token: localStorage.token
}

export default function sign(state = initialState, action = {}) {

    switch (action.type) {

        case 'LOGIN':

            let {token} = action.data.data
            localStorage.setItem('token', token)
            state.token = token
            return Object.assign({}, state, {})

        case 'LOGOUT':
            localStorage.removeItem('token')
            state.token = ''
            return Object.assign({}, state, {})

        case 'MODIFYPWD':
            return Object.assign({}, state, {})

        case 'REGISTER':
            let {token1} = action.data.data
            localStorage.setItem('token', token1)
            state.token = token
            return Object.assign({}, state, {})

        case 'GET_BASEUSERMSG':
            const {balance, total_withdraw, total_position_profit} = action.data.data
            state.balance = balance
            state.netWorth = total_withdraw
            state.floating = total_position_profit
            return Object.assign({}, state, {})

        case 'GET_DETAILMSG':
            console.log("ttt", action.data)
            const {branch_name, bank_card, real_name, id_card, bank_name} = action.data.data
            state.branch = branch_name
            state.bankNo = bank_card
            state.realName = real_name
            state.id = id_card
            state.bankName = bank_name

            return Object.assign({}, state, {})

        case 'GET_USER_DETAIL_MSG':

            return Object.assign({}, state, action.data.data)
        case 'GET_PROFILE':
            return Object.assign({}, state, {})
        case 'SET_NAME':
            state.userInfo.userName = action.data.userName
            return Object.assign({}, state, {})
        case 'SET_RISK_TYPE':
            state.userInfo.riskType = state.userInfo.ristSelect
            state.userInfo.riskTypeInfo = action.data
            return Object.assign({}, state, {})
        case 'RIST_PAGE':
            state.userInfo.ristPage = action.data.type
            state.userInfo.ristSelect = action.data.value
            return Object.assign({}, state, {})
        default:
            return state
    }

}

export function getSignStatus(state) {
    return state.sign.show
}

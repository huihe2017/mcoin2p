let initialState = {}

export default function indexPage(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_INDEX_DATA':
            state.notices = action.data.notices
            state.funds = action.data.funds
            state.banners = action.data.banners
            return Object.assign({}, state, {})
        default:
            return state
    }

}

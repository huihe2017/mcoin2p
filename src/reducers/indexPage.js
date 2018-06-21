let initialState = {}

export default function indexPage(state = initialState, action = {}) {

    switch (action.type) {
        case 'GET_INDEX_DATA':
            state.notices = action.data.data.notices
            state.funds = action.data.data.funds
            state.banners = action.data.data.banners
            return Object.assign({}, state, {})
        default:
            return state
    }

}

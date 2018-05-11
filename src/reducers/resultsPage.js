let initialState = {
    status:'1',//1成功 2审核 3失败
    title:'111111',
    describe:'222222',
    path:'/'
}

export default function resultsPage(state = initialState, action = {}) {

    switch (action.type) {

        case 'SET_RESULTSPAGE':
            const {status,title,describe,path} = action.data
            state.status = status
            state.title = title
            state.describe = describe
            state.path = path
            return Object.assign({}, state, {})


        default:
            return state
    }

}
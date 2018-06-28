import {combineReducers} from 'redux'

import merge from 'lodash/merge'

import foreignExchange from './foreignExchange'
import user from './user'
import authFrom from './authFrom'
import resultsPage from './resultsPage'
import asset from './asset'
import wallet from './wallet'
import indexPage from './indexPage'
import fund from './fund'
let states = {
    foreignExchange,
    user,
    authFrom,
    resultsPage,
    asset,
    wallet,
    indexPage,
    fund
}

let _states = {}

for (let i in states) {
    _states[i] = states[i]()
}


export default combineReducers(states)

export const getInitialState = () => {
    return merge({}, _states, {})
}

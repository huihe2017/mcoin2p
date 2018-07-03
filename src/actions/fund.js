import axios from '../common/axiosConf'
import config from '../../src/config'
import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'

export function getFundList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/getmorefund',
            success:(response)=>{
                dispatch({type: 'GET_FUND_LIST', data: response.data})
            }

        })
    }
}
export function getFundDetail(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/getdetail',
            success:(response)=>{
                dispatch({type: 'GET_FUND_DETAIL', data: response.data})
            }

        })
    }
}
export function buyFund(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/buy',
            success:(response)=>{
                dispatch({type: 'BUY_FUND', data: response.data})
            }

        })
    }
}
export function getMyFundList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'userfund/index',
            success:(response)=>{
                dispatch({type: 'GET_MY_FUND_LIST', data: response.data})
            }

        })
    }
}

export function getMyFundDetails(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'userfund/detail',
            success:(response)=>{
                dispatch({type: 'GET_MY_FUND_DETAILS', data: response.data})
            }

        })
    }
}

export function getFundChart(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'profit/getrate',
            success:(response)=>{
                dispatch({type: 'GET_FUND_CHART', data: response.data})
            }

        })
    }
}

export function setAutoRenew(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'userfund/setAutoRenew',
            success:(response)=>{
                //dispatch({type: 'SET_AUTO_RENEW', data: data})
            }

        })
    }
}

export function getTradeList(data, callback) {
    debugger
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'order/tradelist',
            success:(response)=>{
                dispatch({type: 'GET_TRADE_LIST', data: response.data})
            }

        })
    }
}

export function getTradeListIng(data, callback) {
    debugger
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'order/inprogress',
            success:(response)=>{
                dispatch({type: 'GET_TRADE_LIST_ING', data: response.data})
            }

        })
    }
}
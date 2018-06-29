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
export function getFundList2(data, callback) {
    return dispatch => {
        axios.post(config.noauth_url + 'fund/getmorefund', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_FUND_LIST', data: response.data})
                    //callback()
                }else if (response.data.code === 500) {
                    Toast.fail(response.data.message, 2, null, false)
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(function (error) {
                Toast.fail('网络错误，请稍后再试')
            });
    }
}

export function getFundDetail2(data, callback) {
    return dispatch => {
        axios.post(config.noauth_url + 'fund/getdetail  ', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_FUND_DETAIL', data: response.data})
                    callback()
                }else if (response.data.code === 500) {
                    Toast.fail(response.data.message, 2, null, false)
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(function (error) {
                Toast.fail('网络错误，请稍后再试')
            });
    }
}

export function buyFund2(data, callback) {
    return dispatch => {
        axios.post(config.noauth_url + 'fund/buy  ', {...data})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'BUY_FUND', data: response.data})
                    callback()
                }else if (response.data.code === 4001) {
                    Toast.fail('购买基金账户余额不足', 2, null, false)
                }else if (response.data.code === 4002) {
                    Toast.fail('购买基金币额错误', 2, null, false)
                }else if (response.data.code === 4003) {
                    Toast.fail('基金产品已经下线', 2, null, false)
                }else if (response.data.code === 500) {
                    Toast.fail(response.data.message, 2, null, false)
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(function (error) {
                Toast.fail('网络错误，请稍后再试')
            });
    }
}

export function getMyFundList2(data, callback) {
    return dispatch => {
        axios.post(config.noauth_url + 'userfund/index  ', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_MY_FUND_LIST', data: response.data})
                    callback()
                }else if (response.data.code === 500) {
                    Toast.fail(response.data.message, 2, null, false)
                } else {
                    Toast.fail(response.data.message)
                }
            })
            .catch(function (error) {
                Toast.fail('网络错误，请稍后再试')
            });
    }
}
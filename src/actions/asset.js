import axios from '../common/axiosConf'
import config from '../../src/config'
import {hashHistory} from "react-router";
import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'


export function getAssetDetail(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/assetdetail',
            success:(response)=>{
                dispatch({type: 'GET_ASSET_DETAIL', data: response.data})
            }

        })
    }
}
export function getFriendAward(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/awardlist',
            success:(response)=>{
                dispatch({type: 'GET_FRIEND_WARD', data: response.data})
            }

        })
    }
}
export function getActiveCoin(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/activelist',
            success:(response)=>{
                dispatch({type: 'GET_ACTIVE_COIN', data: response.data})
            }

        })
    }
}

export function getBillsList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/balancedetail',
            success:(response)=>{
                dispatch({type: 'GET_BILLS_LIST', data: response.data})
            }

        })
    }
}
export function getAwardDetails(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/awarddetail',
            success:(response)=>{
                dispatch({type: 'GET_AWARD_DETAILS', data: response.data})
            }

        })
    }
}
export function getAssetDetail2(step, params) {
    return dispatch => {
        axios.post(config.api_url + 'user/assetdetail', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_ASSET_DETAIL', data: response.data})
                } else if (response.data.code === 500) {
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

export function getFriendAward2(step, callback) {
    return dispatch => {
        axios.post(config.api_url + 'user/awardlist', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_FRIEND_WARD', data: response.data})
                    callback()
                } else if (response.data.code === 500) {
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

export function getActiveCoin2(step, callback) {
    return dispatch => {
        axios.post(config.api_url + 'user/activelist', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_ACTIVE_COIN', data: response.data})
                    callback()
                } else if (response.data.code === 500) {
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

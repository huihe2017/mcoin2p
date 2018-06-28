import axios from '../common/axiosConf'
import config from '../../src/config'
import {hashHistory} from "react-router";
import {Toast} from "antd-mobile/lib/index";

export function getAssetDetail(step, params) {
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

export function getFriendAward(step, callback) {
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

export function getActiveCoin(step, callback) {
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
                debugger
                Toast.fail('网络错误，请稍后再试')
            });
    }
}

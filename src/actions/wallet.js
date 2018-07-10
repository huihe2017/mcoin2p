import axios from '../common/axiosConf'
import config from '../../src/config'
import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'


export function getWalletIndexData(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/index',
            success: (response) => {
                dispatch({type: 'GET_WALLET_INDEX_DATA', data: response.data})
            }

        })
    }
}

export function getWalletTradeRecord(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/balancelist',
            success: (response) => {
                dispatch({type: 'GET_WALLET_TRADE_RECORD', data: response.data})
            }

        })
    }
}

export function getMinerFee(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/minerfee',
            success: (response) => {
                dispatch({type: 'GET_MINER_FEE', data: response.data})
            }

        })
    }
}

export function getCommonAddress(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/addresslist',
            success: (response) => {
                dispatch({type: 'GET_COMMON_ADDRESS', data: response.data,id:data.currency})
            }

        })
    }
}

export function confirmWithdrawMsg(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/withdraw',
            success: (response) => {
                dispatch({type: 'CONFIRM_WITHDRAW_MSG', data: response.data})
            }

        })
    }
}

export function checkSafeCode(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/checksafecode',
            success: (response) => {
                dispatch({type: 'CHECK_SAFE_CODE', data: response.data})
            }

        })
    }
}

export function sentMobileCode(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/sendmobilecode',
            success: (response) => {
                axios.post(config.api_url + 'wallet/sendmobilecode', {...data})
            }

        })
    }
}

export function checkMobileCode(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/checkmobilecode',
            success: (response) => {
                dispatch({type: 'CHECK_MOBILE_CODE', data: response.data})
            }

        })
    }
}

export function setSaveCode(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/setsafecode',
            success: (response) => {
            }

        })
    }
}

export function addOrEditAddress(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/address',
            success: (response) => {
            }

        })
    }
}

export function delAddress(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/deladdress',
            success: (response) => {
            }

        })
    }
}

export function switchSaveCode(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/safecode',
            success: (response) => {
            }

        })
    }
}

export function getRechargeAddress(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'wallet/getaddress',
            success: (response) => {
                dispatch({type: 'GET_RECHARGE_ADDRESS', data: response.data})
            }

        })
    }
}
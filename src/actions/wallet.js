import axios from '../common/axiosConf'
import config from '../../src/config'
import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'


export function getWalletIndexData(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/index',
            success:(response)=>{
                dispatch({type: 'GET_WALLET_INDEX_DATA', data: response.data})
            }

        })
    }
}
export function getWalletTradeRecord(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/balancelist',
            success:(response)=>{
                dispatch({type: 'GET_WALLET_TRADE_RECORD', data: response.data})
            }

        })
    }
}
export function getMinerFee(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/minerfee',
            success:(response)=>{
                dispatch({type: 'GET_MINER_FEE', data: response.data})
            }

        })
    }
}
export function getCommonAddress(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/addresslist',
            success:(response)=>{
                dispatch({type: 'GET_COMMON_ADDRESS', data: response.data})
            }

        })
    }
}
export function confirmWithdrawMsg(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/withdraw',
            success:(response)=>{
                dispatch({type: 'CONFIRM_WITHDRAW_MSG', data: response.data})
            }

        })
    }
}
export function checkSafeCode(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/checksafecode',
            success:(response)=>{
                dispatch({type: 'CHECK_SAFE_CODE', data: response.data})
            }

        })
    }
}
export function sentMobileCode(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/sendmobilecode',
            success:(response)=>{
                axios.post(config.api_url + 'wallet/sendmobilecode', {...data})
            }

        })
    }
}
export function checkMobileCode(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/checkmobilecode',
            success:(response)=>{
                dispatch({type: 'CHECK_MOBILE_CODE', data: response.data})
            }

        })
    }
}
export function setSaveCode(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/setsafecode',
            success:(response)=>{
            }

        })
    }
}
export function addOrEditAddress(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/address',
            success:(response)=>{
            }

        })
    }
}
export function delAddress(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/deladdress',
            success:(response)=>{
            }

        })
    }
}export function switchSaveCode(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'wallet/safecode',
            success:(response)=>{
            }

        })
    }
}
export function getWalletIndexData2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/index', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_WALLET_INDEX_DATA', data: response.data})
                    callback()
                } else if (response.data.code === 3004) {
                    dispatch({type: 'NO_SAVE_CODE'})
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

export function getWalletTradeRecord2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/balancelist', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_WALLET_TRADE_RECORD', data: response.data})
                    //callback()
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

export function getMinerFee2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/minerfee', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_MINER_FEE', data: response.data})
                    //callback()
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

export function getCommonAddress2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/addresslist', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_COMMON_ADDRESS', data: response.data})
                    //callback()
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

export function confirmWithdrawMsg2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/withdraw', {...data})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'CONFIRM_WITHDRAW_MSG', data: response.data})
                    callback()
                } else if (response.data.code === 3001) {
                    Toast.fail("提币账户余额不足", 2, null, false)
                } else if (response.data.code === 3002) {
                    Toast.fail("提币地址不正确", 2, null, false)
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

export function checkSafeCode2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/checksafecode', {...data})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'CHECK_SAFE_CODE', data: response.data})
                    callback()
                }
                else if (response.data.code === 3003) {
                    Toast.fail('钱包安全码错误', 2, null, false)
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

export function sentMobileCode2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/sendmobilecode', {...data})
            .then(function (response) {

                if (response.data.code === 0) {
                    //dispatch({type: 'CHECK_SAFE_CODE', data: response.data})
                    //callback()
                }
                else if (response.data.code === 1006) {
                    Toast.fail('手机号码错误', 2, null, false)
                } else if (response.data.code === 1008) {
                    Toast.fail('验证码发送太频繁了', 2, null, false)
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

export function checkMobileCode2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/checkmobilecode', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'CHECK_MOBILE_CODE', data: response.data})
                    callback()
                }
                else if (response.data.code === 1004) {
                    Toast.fail('验证码错误', 2, null, false)
                } else if (response.data.code === 1006) {
                    Toast.fail('手机号码错误', 2, null, false)
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

export function setSaveCode2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/setsafecode', {...data})
            .then(function (response) {

                if (response.data.code === 0) {
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

export function addOrEditAddress2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/address', {...data})
            .then(function (response) {

                if (response.data.code === 0) {
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

export function delAddress2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/deladdress', {...data})
            .then(function (response) {
                if (response.data.code === 0) {
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

export function switchSaveCode2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/safecode', {...data})
            .then(function (response) {
                if (response.data.code === 0) {
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
import axios from '../common/axiosConf'
import config from '../../src/config'

export function getWalletIndexData(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/index', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_WALLET_INDEX_DATA', data: response.data})
                    //callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else if (response.data.code === 3004) {
                    dispatch({type: 'NO_SAVE_CODE'})
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function getWalletTradeRecord(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/balancelist', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_WALLET_TRADE_RECORD', data: response.data})
                    //callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function getMinerFee(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/minerfee', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_MINER_FEE', data: response.data})
                    //callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function getCommonAddress(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/addresslist', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_COMMON_ADDRESS', data: response.data})
                    //callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function confirmWithdrawMsg(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/withdraw', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'CONFIRM_WITHDRAW_MSG', data: response.data})
                    //callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function checkSafeCode(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/checksafecode', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'CHECK_SAFE_CODE', data: response.data})
                    //callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id

                }
                else if (response.data.code === 3003) {
                    callback('钱包安全码错误')
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function sentMobileCode(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/sendmobilecode', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    //dispatch({type: 'CHECK_SAFE_CODE', data: response.data})
                    //callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id

                }
                else if (response.data.code === 1006) {
                    callback('手机号码错误')
                } else if (response.data.code === 1008) {
                    callback('验证码发送太频繁了')
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function checkMobileCode(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'wallet/checkmobilecode', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'CHECK_MOBILE_CODE', data: response.data})
                    //callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id

                }
                else if (response.data.code === 1004) {
                    callback('验证码错误')
                } else if (response.data.code === 1006) {
                    callback('手机号码错误')
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}
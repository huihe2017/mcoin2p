import axios from '../common/axiosConf'
import config from '../../src/config'
export function login(data, callback) {
    return dispatch => {
        axios.post(config.api_url+'login/userlogin', {
            mobile: data.phone,
            password: data.pwd,
            type:1,
            checkCode: data.picCode

        })
            .then(function (response) {
                debugger
                if (response.data.code === 0) {
                    dispatch({type: 'LOGIN', data: response.data})
                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function logout(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/log-out', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'LOGOUT'})
                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function forgetPwd(data, callback) {
    return dispatch => {

        axios.post(config.api_url+'reg/findpassword', {
            ...data
        })
            .then(function (response) {
                if (response.data.code === 0) {
                    // dispatch({type: 'MODIFYPWD'})
                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    // callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function modifyPwd(data, callback) {
    return dispatch => {
        debugger
        axios.post(config.api_url+'user/updatepassword  ', {
            oldPassword: data.initPwd,
            newPassword1: data.pwd,
            newPassword2: data.confirmPwd
        })
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'MODIFYPWD'})
                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function register(data, callback) {
    return dispatch => {
        axios.post(config.api_url+'reg/reguser', {
            mobile: data.phone,
            password: data.pwd,
            checkCode: data.code,
            userName: '',
            regType: 1
        })
            .then(function (response) {
                debugger
                if (response.data.code === 0) {
                    dispatch({type: 'REGISTER'})
                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    debugger
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function getBaseUserMsg(data, callback) {
    return dispatch => {
        axios.get('http://47.91.236.245:4030/user/customer/trade-info', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_BASEUSERMSG', data: response.data.data[0]})
                    callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function getDetailMsg(data, callback) {
    return dispatch => {
        axios.get('http://47.91.236.245:4030/user/customer/bank-card', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_DETAILMSG', data: response.data.data})
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function getUserDetailMsg(data, callback) {
    return dispatch => {
        axios.post(config.api_url+'user/myinfo', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_USER_DETAIL_MSG', data: response.data})
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

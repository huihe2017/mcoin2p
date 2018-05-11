import axios from '../common/axiosConf'

export function login(data, callback) {
    return dispatch => {
        axios.post('http://47.91.236.245:4030/user/customer/sign-in', {
            phone: data.phone,
            password: data.pwd,
            image_captcha: data.picCode

        })
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'LOGIN', data: response.data.data})
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

export function modifyPwd(data, callback) {
    return dispatch => {
        axios.patch('http://47.91.236.245:4030/user/customer/password', {
            old_password: data.initPwd,
            new_password: data.pwd
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
        axios.post('http://47.91.236.245:4030/user/customer', {
            phone: data.phone,
            password: data.pwd,
            sms_captcha: data.code
        })
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'REGISTER'})
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

export function getBaseUserMsg(data, callback) {
    return dispatch => {
        axios.get('http://47.91.236.245:4030/user/customer/trade-info', {

        })
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_BASEUSERMSG',data:response.data.data[0]})
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
        axios.get('http://47.91.236.245:4030/user/customer/bank-card', {

        })
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_DETAILMSG', data:response.data.data})
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

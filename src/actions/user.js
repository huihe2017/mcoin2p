import axios from '../common/axiosConf'
import {http} from '../common/util'
import config from '../../src/config'
import {hashHistory} from "react-router";
import {Toast} from "antd-mobile/lib/index";



export function login(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'login/userlogin',
            success:(response)=>{
                dispatch({type: 'LOGIN', data: response.data})
            }

        })
    }
}
export function logout(data, callback) {
    debugger
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/logout',
            success:(response)=>{
                dispatch({type: 'LOGOUT'})
            }

        })
    }
}
export function forgetPwd(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'reg/findpassword',
            success:(response)=>{
            }

        })
    }
}
export function modifyPwd(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/updatepassword',
            success:(response)=>{
                dispatch({type: 'MODIFYPWD'})
            }

        })
    }
}
export function register(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'reg/reguser',
            success:(response)=>{
                dispatch({type: 'REGISTER'})
            }

        })
    }
}
export function getUserDetailMsg(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/myinfo',
            success:(response)=>{
                dispatch({type: 'GET_USER_DETAIL_MSG', data: response.data})
            }

        })
    }
}
export function getProfile(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/profile',
            success:(response)=>{
                dispatch({type: 'GET_PROFILE', data: response.data})
            }

        })
    }
}
export function setNickname(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/updateusername',
            success:(response)=>{
                dispatch({type: 'SET_NAME',data})
            }

        })
    }
}

export function setRiskType(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'user/updaterisktype',
            success:(response)=>{
                 dispatch({type: 'SET_RISK_TYPE',data})
            }

        })
    }
}

export function riskPage(type,value) {
    return dispatch => {
        dispatch({type: 'RIST_PAGE', data:{type,value}})
    }
}

export function login2(data, callback) {
    return dispatch => {
        axios.post(config.noauth_url + 'login/userlogin', {
            mobile: data.phone,
            password: data.pwd,
            type: 1,
            checkCode: data.picCode

        })
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'LOGIN', data: response.data})
                    callback()
                } else if (response.data.code === 1001) {
                    Toast.fail('邮箱错误', 2, null, false)
                } else if (response.data.code === 1006) {
                    Toast.fail('手机号码错误', 2, null, false)
                } else if (response.data.code === 1009) {
                    Toast.fail('用户或者密码错误', 2, null, false)
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

export function logout2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'login/logout', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'LOGOUT'})
                    callback()
                } else {
                    callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

export function forgetPwd2(data, callback) {
    return dispatch => {

        axios.post(config.noauth_url + 'reg/findpassword', {
            ...data
        })
            .then(function (response) {
                if (response.data.code === 0) {
                    callback()
                }else if (response.data.code === 1001) {
                    Toast.fail('邮箱错误', 2, null, false)
                }else if (response.data.code === 1006) {
                    Toast.fail('手机号码错误', 2, null, false)
                }else if (response.data.code === 1008) {
                    Toast.fail('验证码发送太频繁了', 2, null, false)
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

export function modifyPwd2(data, callback) {
    return dispatch => {
        debugger
        axios.post(config.api_url + 'user/updatepassword  ', {
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

export function register2(data, callback) {
    return dispatch => {
        axios.post(config.noauth_url + 'reg/reguser', {
            mobile: data.phone,
            password: data.pwd,
            checkCode: data.code,
            userName: data.nickName,
            regType: 1
        })
            .then(function (response) {
                debugger
                if (response.data.code === 0) {
                    dispatch({type: 'REGISTER'})
                    callback()
                } else if (response.data.code === 1001) {
                    Toast.fail('邮箱错误', 2, null, false)
                }else if (response.data.code === 1002) {
                    Toast.fail('密码不符合要求', 2, null, false)
                }else if (response.data.code === 1003) {
                    Toast.fail('两次输入密码不一致', 2, null, false)
                }else if (response.data.code === 1004) {
                    Toast.fail('验证码不正确', 2, null, false)
                }else if (response.data.code === 1005) {
                    Toast.fail('邮箱已经被注册', 2, null, false)
                }else if (response.data.code === 1006) {
                    Toast.fail('手机号码错误', 2, null, false)
                }else if (response.data.code === 1007) {
                    Toast.fail('手机号已经被注册', 2, null, false)
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


export function getUserDetailMsg2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'user/myinfo', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_USER_DETAIL_MSG', data: response.data})
                } else if ((response.data.code === 501)) {
                    Toast.fail(response.data.message, 2, null, false)
                    hashHistory('/auth')
                } else if ((response.data.code === 500)) {
                    Toast.fail(response.data.message, 2, null, false)
                    hashHistory('/auth')
                } else {
                    Toast.fail(response.data.msg)
                }
            })
            .catch(function (error) {
                Toast.fail('网络错误，请稍后再试')
            });
    }
}

export function getProfile2(step, params) {
    return dispatch => {
        axios.post(config.api_url + 'user/profile', {})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_PROFILE', data: response.data})
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

export function setNickname2(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'user/updateusername ', {...data})
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'SET_NAME',data})
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
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

export function inviteRegis(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'share/invite',
            success:(response)=>{
                dispatch({type: 'INVITE_REGIS',data: response.data})
            }

        })
    }
}
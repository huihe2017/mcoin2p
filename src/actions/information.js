import axios from '../common/axiosConf'
import config from '../../src/config'
import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'

export function getInformationList(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data:{typeId:data.typeId==='all'?'':data.typeId,page:data.page},
            callback,
            url: 'info/infos',
            success: (response) => {
                dispatch({type: 'GET_INFORMATION_LIST', data: response.data, id: data.typeId})
            }

        })
    }
}

export function getInformationType(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'info/type',
            success: (response) => {
                response.data.data.infotypes[0].id = 'all'
                dispatch({type: 'GET_INFORMATION_TYPE', data: response.data})
            }

        })
    }
}

export function getInformationDetails(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'info/infodetail',
            success: (response) => {
                dispatch({type: 'GET_INFORMATION_DETAILS', data: response.data,id:data.id})
            }

        })
    }
}

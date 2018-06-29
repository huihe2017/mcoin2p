import axios from '../common/axiosConf'
import config from '../../src/config'
import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'

export function getInformationList(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'info/infos',
            success:(response)=>{
                dispatch({type: 'GET_INFORMATION_LIST', data: response.data})
            }

        })
    }
}



import axios from '../common/axiosConf'
import config from '../../src/config'
import {Toast} from "antd-mobile/lib/index";
import {http} from '../common/util'

export function getIndexData(data, callback) {
    return dispatch => {
        http({
            type:'post',
            data,
            callback,
            url:'fund/index',
            success:(response)=>{
                dispatch({type: 'GET_INDEX_DATA', data: response.data})
            }

        })
    }
}
export function getIndexData2(data, callback) {
    return dispatch => {
        axios.post(config.noauth_url + 'fund/index', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_INDEX_DATA', data: response.data})
                    //callback()
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



import axios from '../common/axiosConf'
import config from '../../src/config'

export function getIndexData(data, callback) {
    alert(333)
    return dispatch => {
        alert(config.noauth_url)
        axios.post(config.noauth_url + 'fund/index', {})
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_INDEX_DATA', data: response.data})
                    //callback()
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}



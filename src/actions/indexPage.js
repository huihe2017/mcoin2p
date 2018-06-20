import axios from '../common/axiosConf'
import config from '../../src/config'

export function getIndexData(data, callback) {
    return dispatch => {
        axios.post(config.api_url + 'fund/index', {})
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



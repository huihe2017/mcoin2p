import axios from '../common/axiosConf'
import config from '../../src/config'
export function getAssetDetail(step, params) {
    return dispatch => {
        axios.post(config.api_url+'user/assetdetail', {

        })
            .then(function (response) {
                if (response.data.code === 0) {
                    dispatch({type: 'GET_ASSET_DETAIL', data:response.data})
                } else {
                    //var ff =1
                    //callback(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}



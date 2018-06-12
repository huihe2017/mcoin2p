import axios from '../common/axiosConf'
import config from '../../src/config'
export function getWalletIndexData(data, callback) {
    return dispatch => {
        axios.post(config.api_url+'wallet/index', {
        })
            .then(function (response) {

                if (response.data.code === 0) {
                    dispatch({type: 'GET_WALLET_INDEX_DATA', data: response.data})
                    //callback()
                    // localStorage.userName = response.data.data.phone
                    // localStorage.token = response.data.data.token
                    // localStorage.id = response.data.data.id
                }else if(response.data.code === 3004){
                    dispatch({type: 'NO_SAVE_CODE'})
                } else {
                    alert(response.data.msg)
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }
}




import axios from '../common/axiosConf'

export function getAssetDetail(step, params) {
    return dispatch => {
        axios.post('https://www.easy-mock.com/mock/5b174f2bcbe2f85929997e75/api/user/assetdetail', {

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



import {http} from '../common/util'




export function getNoticDetails(data, callback) {
    return dispatch => {
        http({
            type: 'post',
            data,
            callback,
            url: 'info/noticedetail',
            success: (response) => {
                dispatch({type: 'GET_NOTIC_DETAILS', data: response.data,id:data.id})
            }

        })
    }
}

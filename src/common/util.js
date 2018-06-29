import {Toast} from 'antd-mobile';
import axios from "./axiosConf";
import config from "../config";
import {hashHistory} from "react-router";

export function checkPhone() {
    if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.state.phone)) {
        Toast.fail('请输入正确的手机格式', 3, null, false)
        return false
    }
    if (!this.state.picCode) {
        Toast.fail('请输入验证码', 3, null, false)
        return false
    }
    return true
}

export function changeJson(json, label, value) {
    json[0].map((obj) => {
        for (var key in obj) {
            if (key === label) {
                obj['label'] = obj[key]
                delete obj[key]
            }
            if (key === value) {
                obj['value'] = obj[key]
                delete obj[key]
            }
        }
    })

    return json
}




export function http(option) {
    let url
    if(option.url==='login/userlogin'||option.url==='reg/findpassword'||option.url==='reg/reguser'||option.url==='fund/getmorefund'||option.url==='fund/getdetail'||option.url==='fund/index'){
        url = config.noauth_url + option.url
    }else {
        url = config.api_url + option.url
    }

    axios({
        url,
        params: {
            ...option.data
        },
        method: 'post'
    })
        .then(function (response) {
            if (response.data.code === 0) {
                option.success(response)
                option.callback && option.callback()
            } else if (response.data.code === 501) {
                Toast.fail(response.data.message, 2, null, false)
                hashHistory.push('/auth')
            } else {
                Toast.fail(response.data.message, 2, null, false)
            }
        })
        .catch(function (error) {
            Toast.fail('网络错误，请稍后再试')
        });
}


//json转url参数
// export function parseParam(param, key) {
//     var paramStr = "";
//     if (param instanceof String || param instanceof Number || param instanceof Boolean) {
//         paramStr += "&" + key + "=" + encodeURIComponent(param);
//     } else {
//         $.each(param, function (i) {
//             var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
//             paramStr += '&' + parseParam(this, k);
//         });
//     }
//     return paramStr.substr(1);
// };
// var obj = {
//     "name": 'tom',
//     "class": {
//         "className": 'class1'
//     },
//     "classMates": [{
//         "name": 'lily'
//     }]
// };
//console.log(parseParam(obj));//name=tom&class.className=class1&classMates[0].name=lily
//console.log(parseParam(obj, 'stu'));//stu.name=tom&stu.class.className=class1&stu.classMates[0].name=lily
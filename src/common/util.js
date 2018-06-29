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

function setUrlK(ojson) {
    var s = '', name, key;
    for (var p in ojson) {
        if (!ojson[p] && ojson[p] !== 0) {
            return null;
        }
        if (ojson.hasOwnProperty(p)) {
            name = p
        }
        ;
        key = ojson[p];
        s += "&" + name + "=" + encodeURIComponent(key);
    }
    ;
    return s.substring(1, s.length);
};


export function http(option) {
    let url
    if (option.url === 'login/userlogin' || option.url === 'reg/findpassword' || option.url === 'reg/reguser' || option.url === 'fund/getmorefund' || option.url === 'fund/getdetail' || option.url === 'fund/index') {
        url = config.noauth_url + option.url
    } else {
        url = config.api_url + option.url
    }
    // let params = new URLSearchParams();
    axios.defaults.headers.common['token'] = localStorage.token;
    axios({
        url,
        data: setUrlK(option.data),
        method: 'post'
    })
        .then(function (response) {
            if (response.data.code === 0) {
                option.success(response)
                option.callback && option.callback()
            } else if (response.data.code === 501) {
                // Toast.fail(response.data.msg, 2, null, false)
                hashHistory.push('/auth')
            }else if (response.data.code === 3004) {
                hashHistory.push('/safeSet')
            }else if (response.data.code === 3008) {
                hashHistory.push('/importSafe')
            } else {
                Toast.fail(response.data.msg, 2, null, false)
            }
        })
        .catch(function (error) {
            debugger
            Toast.fail('网络错误，请稍后再试')
        });
}


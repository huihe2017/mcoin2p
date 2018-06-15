import {Toast} from 'antd-mobile';

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

export function changeJson(json,label,value) {
    json[0].map((obj)=>{
        for(var key in obj){
            if(key===label){
                obj['label'] = obj[key]
                delete obj[key]
            }
            if(key===value){
                obj['value'] = obj[key]
                delete obj[key]
            }
        }
    })

    return json
}
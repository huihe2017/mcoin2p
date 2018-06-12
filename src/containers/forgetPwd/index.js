import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank,Picker} from 'antd-mobile';
import Header from '../../components/header'
import {checkPhone} from '../../common/util'
import {forgetPwd} from '../../actions/user'
import {bindActionCreators} from 'redux'
import Countdown from '../../components/countdown'
import {Toast} from "antd-mobile/lib/index";
import {hashHistory} from "react-router";

class ForgetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areaCode: [86],
            picCode:''
        }
    }
    forgetPwd(){
        if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.state.phone)) {
            Toast.fail('请输入正确的手机格式', 3, null, false)
            return false
        }
        if (!this.state.picCode) {
            Toast.fail('请输入验证码', 3, null, false)
            return false
        }
        if (!this.state.code) {
            Toast.fail('请输入短信验证码', 3, null, false)
            return false
        }

        Toast.loading('提交中', 3, null, false)
        this.props.forgetPwd({
            mobile: this.state.areaCode + " " + this.state.phone,
            regType: 1,
            validateCode: this.state.picCode
        }, (errorText) => {
            Toast.hide()
            debugger
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            } else {
                hashHistory.push('/modifyPwd')
            }
        })
    }
    render() {
        const quhao=[
            {
                value:86,
                label:"中国大陆  +86"
            },{
                value:87,
                label:"中国台湾  +87"
            },{
                value:88,
                label:"中国香港  +88"
            },

        ]
        return (
            <div className={style.wrap}>

                <Header/>
                    <section className={style.content}>
                        <span className={style.title}>
                        忘记密码？
                        </span>
                        <div className={style.selphone}>
                            <div className={style.qh}>
                                <Picker onChange={(value) => {
                                    this.setState({areaCode: value})

                                }} format={(values) => {
                                    console.log(values)
                                    return values.join('').split(' ')[2]
                                }} data={quhao} cols={1} value={this.state.areaCode} defaultValue="1">
                                    <List.Item arrow="horizontal"></List.Item>
                                </Picker>
                            </div>
                            <div className={style.line}></div>
                            <div className={style.phone}>
                                <List>
                                    <InputItem onChange={(value) => {
                                        this.setState({phone: value})
                                    }} placeholder="请输入手机号" type="number"></InputItem>
                                </List>
                            </div>
                        </div>
                        <div className={style.selphone}>
                            <div className={style.tu}>
                                <List>
                                    <InputItem onChange={(value) => {
                                        this.setState({picCode: value})
                                    }} placeholder="请输入图形验证码" type="text"></InputItem>                                </List>

                            </div>
                            <img className={style.tuxing} src="http://reso2.yiihuu.com/1331436-z.jpg" alt=""/>
                        </div>

                        <div className={style.selphone}>
                            <div className={style.tu}>
                                <List>
                                    <Countdown
                                        beforeClick={checkPhone.bind(this)}
                                        phone={this.state.phone}
                                        picCode={this.state.picCode}
                                        business='REGISTER'
                                        failCallback={()=>{this.setState({picImg: this.getPicImg()})}}
                                        onChange={(value) => {this.setState({code: value})}}
                                    />
                                </List>

                            </div>
                            <div className={style.lline}></div>

                        </div>
                        <div className={style.button}>
                            <Button onClick={this.forgetPwd.bind(this)} type="primary">
                                确认修改密码
                            </Button>
                        </div>
                    </section>

            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        forgetPwd:bindActionCreators(forgetPwd,dispatch)
    }
}

ForgetPwd = connect(mapStateToProps, mapDispatchToProps)(ForgetPwd)


export default ForgetPwd;
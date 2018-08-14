import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Button, Picker, Toast} from 'antd-mobile';
import {login, register} from '../../actions/user'
import {setResultsPage} from '../../actions/resultsPage'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router';
import Header from '../../components/header'
import Countdown from '../../components/countdown'
import {checkPhone} from '../../common/util'
import config from '../../config'


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            areaCode: [86],
            picCode: '',
            picImg: this.getPicImg(),
            phone: '',
            pwd: '',
            code: ''
        }
    }

    getPicImg() {
        return <img onClick={(e) => {
            e.target.src = config.noauth_url + 'captcha/getcaptcha?tm=' + Math.random()
        }}
                    className={style.tuxing}
                    src={config.noauth_url + 'captcha/getcaptcha?tm=' + Math.random()}/>
    }

    urlParse() {
        var url = window.location.href;
        var obj = {};
        var reg = /[?&][^?&]+=[^?&]+/g;
        var arr = url.match(reg);

        if (arr) {
            arr.forEach(function (item) {
                var tempArr = item.substring(1).split('=');
                var key = decodeURIComponent(tempArr[0]);
                var val = decodeURIComponent(tempArr[1]);
                obj[key] = val;
            });
        }
        return obj;
    }

    submitFn() {
        if (this.state.login) {
            if (!/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[1-9]{1})|(18[0-9]{1})|(19[8-9]{1}))+\d{8})$/.test(this.state.phone)) {
                Toast.fail('请输入正确的手机格式', 3, null, false)
                return false
            }
            if (!this.state.picCode) {
                Toast.fail('请输入验证码', 3, null, false)
                return false
            }
            //数字+字母
            // if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.state.pwd)) {
            //     Toast.fail('密码格式错误', 3, null, false)
            //     return false
            // }
            if (!/^(?![a-zA-z]+$)(?!\d+$)(?![+=_!@#$%^&*.\- ,[\]{}()|<>;`~]+$)[a-zA-Z\d+=_!@#$%^&*.\- ,[\]{}()|<>;`~\\/]+$/.test(this.state.pwd)) {
                Toast.fail('密码格式错误', 3, null, false)
                return false
            }
            // if (!/((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!.~%^&*]{6,21}/.test(this.state.pwd)) {
            //     alert(222)
            //     Toast.fail('密码格式错误', 3, null, false)
            //     return false
            // }
            Toast.loading('登录中', 3, null, false)
            this.props.login({
                type: 1,
                mobile: this.state.areaCode + this.state.phone,
                password: this.state.pwd,
                checkCode: this.state.picCode
            }, (errorText) => {
                this.setState({picImg: this.getPicImg()})
                Toast.hide()
                if (errorText) {
                    Toast.fail(errorText, 3, null, false)
                } else {
                    if (this.props.authFrom.path) {
                        hashHistory.push(this.props.authFrom.path)
                    } else {
                        hashHistory.push('/')
                    }
                }
            })
        } else {
            if (!/^[a-zA-Z0-9]{6,20}$/.test(this.state.nickName)) {
                Toast.fail('请输入正确的昵称格式', 3, null, false)
                return false
            }
            if (!/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[1-9]{1})|(18[0-9]{1})|(19[8-9]{1}))+\d{8})$/.test(this.state.phone)) {
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

            // if (!/^(?!\d+$)(?![a-zA-Z]+$)(?![+=_!@#$%^&*.\- ,[\]{}()|<>;`]+$)[\da-zA-Z+=_!@#$%^&*.\- ,[\]{}()|<>;`]{6,21}$/.test(this.state.pwd)) {
            //     Toast.fail('密码格式错误', 3, null, false)
            //     return false
            // }
            if (!/^(?![a-zA-z]+$)(?!\d+$)(?![+=_!@#$%^&*.\- ,[\]{}()|<>;`~]+$)[a-zA-Z\d+=_!@#$%^&*.\- ,[\]{}()|<>;`~\\/]+$/.test(this.state.pwd)) {
                Toast.fail('密码格式错误', 3, null, false)
                return false
            }
            if (this.state.pwd !== this.state.repwd) {
                Toast.fail('请再次确认密码', 3, null, false)
                return false
            }
            Toast.loading('注册中', 3, null, false)

            let params = {
                regType: 1,
                mobile: this.state.areaCode + this.state.phone,
                userName: this.state.nickName,
                password: this.state.pwd,
                validateCode: this.state.code
            }
            let inviter = this.urlParse().username

            if(inviter){
                params.inviter = inviter
            }

            this.props.register(params, () => {
                this.setState({picImg: this.getPicImg()})
                Toast.hide()
                this.props.setResultsPage({
                    title: '注册成功',
                    path: '/',
                    status: 1
                }, () => {
                    hashHistory.push('/resultsPage')
                })
            })
        }


    }


    render() {
        const quhao = [
            {
                value: 86,
                label: "中国大陆  +86"
            }, {
                value: 886,
                label: "中国台湾  +886"
            }, {
                value: 852,
                label: "中国香港  +852"
            }, {
                value: 853,
                label: "中国澳门  +853"
            }

        ]
        let show = {
            display: this.state.login ? 'none' : 'block'
        }
        return (
            <div className={style.wrap}>
                <a className={style.toHome} href="javascript:void (0)" onClick={() => hashHistory.push('/')}>
                    返回首页
                </a>
                <div className={style.logo}>

                </div>
                <nav className={style.nav}>
                    <div>
                        <span id={this.state.login ? style.active : ""} onClick={this.toreg.bind(this)}>登录</span>
                    </div>
                    <div>
                        <span id={this.state.login ? "" : style.active} onClick={this.tolog.bind(this)}>注册</span>
                    </div>
                </nav>
                <section className={style.content}>
                    <div className={style.selphone} hidden={this.state.login}>
                        <div className={style.tu}>
                            <List>
                                <InputItem type="text"
                                           onChange={(value) => {
                                               this.setState({nickName: value})
                                           }}
                                           placeholder={'请设置昵称（数字+字母组合）'}></InputItem>
                            </List>

                        </div>
                    </div>
                    <div className={style.selphone}>
                        <div className={style.qh}>
                            <Picker onChange={(value) => {
                                this.setState({areaCode: value})

                            }} format={(values) => {
                                console.log(values)
                                return values.join('').split(' ')[2]
                            }} data={quhao} cols={1} value={this.state.areaCode}>
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
                    <div className={style.selphone} hidden={!this.state.login}>
                        <div className={style.tu}>
                            <List>
                                <InputItem type="password"
                                           onChange={(value) => {
                                               this.setState({pwd: value})
                                           }}
                                           placeholder={this.state.login ? '请输入密码' : '请设置6-20位密码(数字+字母+特殊字符组合)'}></InputItem>
                            </List>

                        </div>
                    </div>
                    <div className={style.selphone}>
                        <div className={style.tu}>
                            <List>
                                <InputItem onChange={(value) => {
                                    this.setState({picCode: value})
                                }} placeholder="请输入图形验证码" type="text"></InputItem>
                            </List>

                        </div>
                        {this.state.picImg}
                    </div>

                    <div className={style.selphone} style={show}>
                        <div className={style.tu}>
                            <List>
                                <Countdown
                                    beforeClick={checkPhone.bind(this)}
                                    phone={this.state.areaCode + this.state.phone}
                                    picCode={this.state.picCode}
                                    business='REGISTER'
                                    failCallback={() => {
                                        this.setState({picImg: this.getPicImg()})
                                    }}
                                    onChange={(value) => {
                                        this.setState({code: value})
                                    }}
                                />
                            </List>

                        </div>
                        <div className={style.lline}></div>

                    </div>
                    <div className={style.selphone} hidden={this.state.login}>
                        <div className={style.tu}>
                            <List>
                                <InputItem type="password"
                                           onChange={(value) => {
                                               this.setState({pwd: value})
                                           }}
                                           placeholder={this.state.login ? '请输入密码' : '请设置6-20位密码（数字+字母+特殊字符组合）'}></InputItem>
                            </List>

                        </div>
                    </div>
                    <div className={style.selphone} hidden={this.state.login}>
                        <div className={style.tu}>
                            <List>
                                <InputItem type="password"
                                           onChange={(value) => {
                                               this.setState({repwd: value})
                                           }}
                                           placeholder={'请确认密码'}></InputItem>
                            </List>

                        </div>
                    </div>
                    <div className={style.button}>
                        <Button onClick={this.submitFn.bind(this)} type="primary">
                            {
                                this.state.login ? '立即登录' : '立即注册'
                            }
                        </Button>

                    </div>
                    <div className={style.fp} hidden={this.state.login ? false : true}>
                        <Link to='/forgetPwd'>
                            忘记密码?
                        </Link>
                    </div>
                </section>
            </div>
        )

    }

    toreg() {
        this.setState({
            login: true
        })
    }

    tolog() {
        this.setState({
            login: false
        })
    }


}

function mapStateToProps(state, props) {
    return {
        authFrom: state.authFrom
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch),
        register: bindActionCreators(register, dispatch),
        setResultsPage: bindActionCreators(setResultsPage, dispatch)
    }
}

Auth = connect(mapStateToProps, mapDispatchToProps)(Auth)


export default Auth;
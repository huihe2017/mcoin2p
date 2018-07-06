import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Picker, Modal, NavBar, Icon} from 'antd-mobile';
import Header from '../../components/header'
import Countdown from '../../components/countdown'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {logout} from '../../actions/user'
import {checkSafeCode, sentMobileCode, checkMobileCode} from '../../actions/wallet'
import {Checkbox} from "antd-mobile/lib/index";
import {checkPhone, setUrlK} from "../../common/util";
import config from "../../config";
import axios from "../../common/axiosConf";

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

const CheckboxItem = Checkbox.CheckboxItem;

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            modal1: false,
            code1: '',
            code2: '',
            code3: '',
            code4: '',
            counting: false,
            extraText: '重新发送',
        }
    }

    onClose() {
        this.setState({
            modal1: false,
        });
    }

    componentDidMount() {
        // this.props.getBaseUserMsg({
        //
        // }, (errorText) => {
        //     Toast.hide()
        //     if (errorText) {
        //         Toast.fail(errorText, 3, null, false)
        //     } else {
        //         //hashHistory.push('/')
        //     }
        // })

    }

    handle() {

        if (this.state.counting) {
            return false
        }

        let _this = this
        alert(1)
        _this.setState({counting: true})
        let seconds = 60
        _this.inter = setInterval(() => {

            _this.setState({extraText: (seconds--) + 's'}, () => {
                if (_this.state.extraText === '-1s') {
                    clearInterval(_this.inter)
                    _this.setState({extraText: '重新发送'})
                    _this.setState({counting: false})
                }
            })

        }, 1000)


    }

    show() {
        if (this.state.show) {
            this.setState({
                show: false
            })
            return
        }
        this.setState({
            show: true
        })
    }

    modalshow() {
        this.setState({modal1: true})

    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }


    submitCode() {
        if (!this.state.safeCode) {
            Toast.fail('安全码不得为空', 2, null, false)
            return false
        }
        this.props.checkSafeCode({
            applyId: this.props.wallet.applyId,
            safeCode: this.state.safeCode,
            type: 1
        }, () => {
            this.props.sentMobileCode()
            this.modalshow()
        })

    }

    reset() {

    }


    render() {
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[]}
                >安全码</NavBar>
                <div>
                    <ul className={style.itemUl}>
                        <span className={style.title}>
                            请输入安全码
                        </span>
                        <li className={style.itemBox}>

                            <InputItem onChange={(value) => {
                                this.setState({safeCode: value})
                            }} placeholder="请输入安全码" type={this.state.show ? "text" : "password"}
                                       extra={<img style={{width: 16, height: 16}} onClick={() => this.show()}
                                                   src={require(`./images/${this.state.show}.png`)}
                                                   alt=""/>}></InputItem>
                        </li>
                    </ul>
                    <div className={style.button} onClick={this.submitCode.bind(this)}>
                        下一步
                    </div>
                    <Modal
                        visible={this.state.modal1}
                        transparent
                        maskClosable={true}
                        onClose={() => this.setState({modal1: false})}
                        title="提示"
                        closable={true}

                        wrapProps={{onTouchStart: this.onWrapTouchStart}}
                    >
                        <div style={{height: 180}}>
                            <span className={style.alTip}>
                                已向 { this.props.user.userInfo.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")} 发送验证码验证码3分钟有效，请注意！
                            </span>
                            <ul className={style.inputUl}>
                                <li className={style.inputLi}>
                                    <InputItem maxLength={1} id={'input1'} autoFocus onChange={(value) => {
                                        this.setState({code1: value}, () => {
                                            if (this.state.code1.length == 1) {
                                                document.querySelector('#input2').focus();
                                            }
                                        })
                                    }} type={"text"}></InputItem>
                                </li>
                                <li className={style.inputLi}>
                                    <InputItem maxLength={1} id={'input2'} onChange={(value) => {
                                        this.setState({code2: value}, () => {
                                            if (this.state.code2.length == 1) {
                                                document.querySelector('#input3').focus();
                                            }
                                        })
                                    }} type={"text"}></InputItem>
                                </li>
                                <li className={style.inputLi}>
                                    <InputItem maxLength={1} id={'input3'} onChange={(value) => {
                                        this.setState({code3: value}, () => {
                                            if (this.state.code3.length == 1) {
                                                document.querySelector('#input4').focus();
                                            }
                                        })
                                    }} type={"text"}></InputItem>
                                </li>
                                <li className={style.inputLi}>
                                    <InputItem maxLength={1} id={'input4'} onChange={(value) => {
                                        this.setState({code4: value}, () => {
                                            if (this.state.code4.length == 1) {
                                                document.querySelector('#input5').focus();
                                            }
                                        })
                                    }} type={"text"}></InputItem>
                                </li>
                                <li className={style.inputLi}>
                                    <InputItem maxLength={1} id={'input5'} onChange={(value) => {
                                        this.setState({code5: value}, () => {
                                            if (this.state.code5.length == 1) {
                                                document.querySelector('#input6').focus();
                                            }
                                        })
                                    }} type={"text"}></InputItem>
                                </li>
                                <li className={style.inputLi}>
                                    <InputItem maxLength={1} id={'input6'} onChange={(value) => {
                                        this.setState({code6: value}, () => {
                                            if (this.state.code6.length == 1) {
                                                this.props.checkMobileCode({
                                                    checkCode: this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4 + this.state.code5 + this.state.code6,
                                                    applyId: this.props.wallet.applyId
                                                }, () => {
                                                    hashHistory.push('/dealDetails/' + this.props.wallet.current.balance.currency)
                                                })
                                            }
                                        })
                                    }} type={"text"}></InputItem>
                                </li>

                            </ul>
                            <button disabled={this.state.counting} className={style.button1} onClick={this.handle.bind(this)} >
                                {/*重新发送*/}
                                {this.state.extraText}
                            </button>
                        </div>
                    </Modal>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        wallet: state.wallet,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkMobileCode: bindActionCreators(checkMobileCode, dispatch),
        sentMobileCode: bindActionCreators(sentMobileCode, dispatch),
        checkSafeCode: bindActionCreators(checkSafeCode, dispatch),
        logout: bindActionCreators(logout, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
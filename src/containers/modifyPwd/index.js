import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Button, WingBlank, Toast} from 'antd-mobile';
import {hashHistory} from 'react-router'
import Header from '../../components/header'
import {modifyPwd} from '../../actions/user'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'

class ModifyPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initPwd: '',
            pwd: '',
            confirmPwd: ''
        }
    }

    componentWillMount() {
        if (!this.props.user.token) {
            this.props.setAuthFrom('/modifyPwd', () => {
                hashHistory.push('/auth')
            })

        }
    }

    submitFn() {
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.state.initPwd)) {
            Toast.fail('初始密码格式不正确', 3, null, false)
            return false
        }
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.state.pwd)) {
            Toast.fail('密码格式不正确', 3, null, false)
            return false
        }
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.state.confirmPwd)) {
            Toast.fail('确认密码格式不正确', 3, null, false)
            return false
        }
        if (this.state.pwd !== this.state.confirmPwd) {
            Toast.fail('再次输入密码不一致', 3, null, false)
            return false
        }
        Toast.loading('', 0)
        this.props.modifyPwd(
            this.state
            , (errorText) => {
                Toast.hide()
                if (errorText) {
                    Toast.fail(errorText, 3, null, false)
                } else {
                    hashHistory.push('/resultsPage')
                }
            })
    }

    render() {
        console.log('2222', this.props.foreignExchange)
        return (
            <div className={style.wrap}>
                <Header/>
                <List>
                    <InputItem
                        style={{textAlign: "right"}}
                        type="password"
                        placeholder="输入初始密码"
                        onChange={(value) => {
                            this.setState({initPwd: value})
                        }}
                    >初始密码</InputItem>
                    <InputItem
                        style={{textAlign: "right"}}
                        type="password"
                        placeholder="密码6-24位数字、字母、字符"
                        onChange={(value) => {
                            this.setState({pwd: value})
                        }}
                    >设置密码</InputItem>
                    <InputItem
                        style={{textAlign: "right"}}
                        type="password"
                        placeholder="请再次输入密码"
                        onChange={(value) => {
                            this.setState({confirmPwd: value})
                        }}
                    >确认密码</InputItem>
                </List>
                <div className={style.button}>
                    <WingBlank size="lg">
                        <Button onClick={this.submitFn.bind(this)} type="primary">确认入金</Button>
                    </WingBlank>
                </div>
            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        modifyPwd: bindActionCreators(modifyPwd, dispatch),
        setAuthFrom: bindActionCreators(setAuthFrom, dispatch)
    }
}

ModifyPwd = connect(mapStateToProps, mapDispatchToProps)(ModifyPwd)


export default ModifyPwd;
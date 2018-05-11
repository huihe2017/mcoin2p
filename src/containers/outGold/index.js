import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Button, WingBlank, Toast} from 'antd-mobile'
import {hashHistory} from 'react-router'
import Header from '../../components/header'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'


class OutGold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outGoldValue:'',
            outGoldPwd:''
        }
    }

    componentWillMount(){
        if(!this.props.user.token){
            this.props.setAuthFrom('/outgold',()=>{
                hashHistory.push('/auth')
            })
        }else{
            if(this.props.user.status==='27'){

            }else {
                hashHistory.push('/getAccount')
            }
        }
    }

    outGold() {
        if(!this.state.outGoldValue){
            Toast.fail("请输入出金金额", 3, null, false)
            return false
        }
        if(!this.state.outGoldPwd){
            Toast.fail("请输入出金密码", 3, null, false)
            return false
        }
        hashHistory.push('/resultsPage')

    }

    render() {
        console.log('2222', this.props.foreignExchange);

        return (
            <div className={style.wrap}>
                <Header/>
                <div className={style.part1}>
                    <List>
                        <InputItem
                            defaultValue={this.props.foreignExchange.bankName + " " + this.props.foreignExchange.bankNo}
                            type="bankCard"
                            editable={false}
                            style={{textAlign: "right"}}
                        >出金账户</InputItem>
                        <InputItem
                            defaultValue={"$ " + this.props.foreignExchange.accountBalance}
                            type="bankCard"
                            editable={false}
                            style={{textAlign: "right"}}
                        >账户余额</InputItem>
                    </List>
                </div>
                <List>
                    <InputItem
                        placeholder="输入金额，最低50美元"
                        extra="$"
                        style={{textAlign: "right"}}
                        value={this.state.outGoldValue}
                        onChange={(value)=>{this.setState({outGoldValue:value})}}
                    >价格</InputItem>
                </List>
                <div className={style.tip}>
                        <span className={style.left}>
                            合人民币：<span></span>
                        </span>
                    <span  className={style.right}>
                            当前汇率：{this.props.foreignExchange.exchangeRate}
                        </span>
                </div>
                <List>
                    <InputItem
                        type="password"
                        placeholder="输入支付密码"
                        style={{textAlign: "right"}}
                        value={this.state.outGoldPwd}
                        onChange={(value)=>{this.setState({outGoldPwd:value})}}
                    >支付密码</InputItem>

                </List>
                <div className={style.tip}>
                        <span className={style.left}>
                            注：支付密码即登录密码
                        </span>
                    <span className={style.right}>
                        <a className={style.forpass} href="javascript:void (0)">
                            忘记密码？
                        </a>
                    </span>
                </div>
                <div className={style.button}>
                    <WingBlank size="lg">
                        <Button onClick={this.outGold.bind(this)} type="primary">确认出金</Button>
                    </WingBlank>
                </div>
            </div>
        )

    }
}

function mapStateToProps(state, props) {
    return {
        foreignExchange: state.foreignExchange,
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthFrom:bindActionCreators(setAuthFrom, dispatch)
    }
}

OutGold = connect(mapStateToProps, mapDispatchToProps)(OutGold)


export default OutGold;
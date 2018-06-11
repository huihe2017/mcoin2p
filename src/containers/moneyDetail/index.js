import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getAssetDetail} from '../../actions/asset'

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logout() {
        Toast.loading('正在退出', 0)
        this.props.logout({

        }, (errorText) => {
            Toast.hide()
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            } else {
                hashHistory.push('/')
            }
        })
    }

    componentDidMount(){
        this.props.getAssetDetail()
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

    render() {
        if(this.props.asset.totalAmount===undefined){
            return null
        }
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                资产明细
                            </span>
                            <a className={style.headerTopR} href="javascript:void (0)">
                                <img className={style.headerTopI} src={require('./images/money.png')} alt=""/>账户安全险保障中
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        总金额 （元）
                                    </span>
                                    <span className={style.userTime}>
                                        {this.props.asset.totalAmount}
                                    </span>
                                </div>
                            </a>
                            <div className={style.userMoney}>
                                <span className={style.userMoneyT}>
                                    昨日收益（元）<span className={style.userMoneyC}> {this.props.asset.yesterdayProfit}</span>
                                </span>
                                <span className={style.userMoneyT}>
                                    累计收益（元）<span className={style.userMoneyC}> {this.props.asset.totalProfit}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.part}>
                        <List>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.ico} src={require('./images/coin.png')} alt=""/>
                                <div className={style.itemWordBox}>
                                    <span className={style.itemWord}>
                                        活动余币额资产
                                    </span>
                                    <span className={style.itemMoney}>
                                        金额 {this.props.asset.activeAmount}
                                    </span>
                                </div>

                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.ico} src={require('./images/people.png')} alt=""/>
                                <div className={style.itemWordBox}>
                                    <span className={style.itemWord}>
                                        累积好友奖励资产
                                    </span>
                                    <span className={style.itemMoney}>
                                        金额 {this.props.asset.totalAward}
                                    </span>
                                </div>

                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.ico} src={require('./images/computer.png')} alt=""/>
                                <div className={style.itemWordBox}>
                                    <span className={style.itemWord}>
                                        活期币额资产
                                    </span>
                                    <span className={style.itemMoney}>
                                        金额 {this.props.asset.currentAmount}
                                    </span>
                                    <span className={style.itemMoney1}>
                                        昨日收益 {this.props.asset.currentProfit}
                                    </span>
                                </div>

                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>

                        </List>
                    </div>
                    <div>
                        <List>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.ico} src={require('./images/line.png')} alt=""/>
                                <div className={style.itemWordBox}>
                                    <span className={style.itemWord}>
                                        基金资产
                                    </span>
                                    <span className={style.itemMoney}>
                                        金额 {this.props.asset.fundAmount}
                                    </span>
                                    <span className={style.itemMoney1}>
                                        昨日收益 {this.props.asset.fundYesterdayProfit}
                                    </span>
                                </div>

                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>

                        </List>
                    </div>
                    <div>
                        <List>
                            {this.props.asset.fundList.map((value)=>{
                                return (
                                    <span className={style.ensure1}>
                                <div className={style.itemWordBox1}>
                                    <span className={style.itemWord1}>
                                        {value.title}
                                    </span>
                                    <span className={style.itemMoney11}>
                                        币额：{value.amount} {value.currency}
                                    </span>
                                    <span className={style.itemMoney111}>
                                        昨日收益：{value.yesterdayProfit} {value.currency}
                                    </span>
                                </div>
                            </span>
                                )
                            })}

                        </List>
                    </div>
                </div>
                {/*<Footer/>*/}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        asset:state.asset
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAssetDetail:bindActionCreators(getAssetDetail,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
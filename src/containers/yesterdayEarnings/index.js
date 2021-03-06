import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,NavBar,Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import {logout} from '../../actions/user'

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
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/baseUserMsg')}
                    rightContent={[
                        <Link to={'/walletSetting'}>
                            <Icon key="1" type="ellipsis"/>
                        </Link>,
                    ]}
                >点点数字基金</NavBar>
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                昨日收益
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
                                        317.556.02
                                    </span>
                                </div>
                            </a>
                            <div className={style.userMoney}>

                                <span className={style.userMoneyT}>
                                    累计收益（元）<span className={style.userMoneyC}> 0.00</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.part}>
                        <List>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.ico} src={require('./images/people.png')} alt=""/>
                                <div className={style.itemWordBox}>
                                    <span className={style.itemWord}>
                                        累积好友奖励资产
                                    </span>
                                    <span className={style.itemMoney}>
                                        金额 0.00
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
                                        金额 0.00
                                    </span>
                                    <span className={style.itemMoney1}>
                                        昨日收益 0.00
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
                                        金额 0.00
                                    </span>
                                    <span className={style.itemMoney1}>
                                        昨日收益 0.00
                                    </span>
                                </div>

                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>

                        </List>
                    </div>
                    <div>
                        <List>
                            <span className={style.ensure1}>
                                <div className={style.itemWordBox1}>
                                    <span className={style.itemWord1}>
                                        XXX基金1期 [BTC]
                                    </span>
                                    <span className={style.itemMoney11}>
                                        币额：0.12546545
                                    </span>
                                    <span className={style.itemMoney111}>
                                        昨日收益：0.12546545
                                    </span>
                                </div>
                            </span>
                            <span className={style.ensure1}>
                                <div className={style.itemWordBox1}>
                                    <span className={style.itemWord1}>
                                        XXX基金1期 [BTC]
                                    </span>
                                    <span className={style.itemMoney11}>
                                        币额：0.12546545
                                    </span>
                                    <span className={style.itemMoney111}>
                                        昨日收益：0.12546545
                                    </span>
                                </div>
                            </span>
                            <span className={style.ensure1}>
                                <div className={style.itemWordBox1}>
                                    <span className={style.itemWord1}>
                                        XXX基金1期 [BTC]
                                    </span>
                                    <span className={style.itemMoney11}>
                                        币额：0.12546545
                                    </span>
                                    <span className={style.itemMoney111}>
                                        昨日收益：0.12546545
                                    </span>
                                </div>
                            </span>

                        </List>
                    </div>
                    {/*<div>*/}
                    {/*<a onTouchEnd={this.logout.bind(this)} className={style.ensure} href="javascript:void(0)">*/}
                    {/*退出登录*/}
                    {/*</a>*/}
                    {/*</div>*/}
                </div>
                <Footer/>
            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
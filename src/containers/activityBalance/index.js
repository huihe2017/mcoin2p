import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {logout,getBaseUserMsg} from '../../actions/user'

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
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                活动余币额
                            </span>
                            <a className={style.headerTopR} href="javascript:void (0)">
                                <img className={style.headerTopI} src={require('./images/money.png')} alt=""/>账户安全险保障中
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        市值 （元）
                                    </span>
                                    <span className={style.userTime}>
                                        317.556.02
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={style.content}>
                        <div className={style.contentHeader}>
                            <span className={style.contentTitle1}>
                                币种
                            </span>
                            <span className={style.contentTitle2}>
                                数量
                            </span>
                            <span className={style.contentTitle3}>
                                市值（CNY）
                            </span>
                        </div>
                        <div className={style.contentContent}>
                            <div className={style.contentPart}>
                                <span className={style.contentPart1}>
                                    <img src={require('./images/BTC.png')} className={style.contentImg} alt=""/>BTC
                                </span>
                                    <span className={style.contentPart2}>
                                    14.2123411231
                                </span>
                                    <span className={style.contentPart3}>
                                    51.000CNY
                                </span>
                            </div>
                            <div className={style.contentPart}>
                                <span className={style.contentPart1}>
                                   <img src={require('./images/BTC.png')} className={style.contentImg} alt=""/>BTC
                                </span>
                                    <span className={style.contentPart2}>
                                    14.2123411231
                                </span>
                                    <span className={style.contentPart3}>
                                    51.000CNY
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*<div>*/}
                    {/*<a onTouchEnd={this.logout.bind(this)} className={style.ensure} href="javascript:void(0)">*/}
                    {/*退出登录*/}
                    {/*</a>*/}
                    {/*</div>*/}
                </div>
                {/*<Footer/>*/}
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
        logout: bindActionCreators(logout, dispatch),
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
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
        this.props.getBaseUserMsg({

        }, (errorText) => {
            Toast.hide()
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            } else {
                //hashHistory.push('/')
            }
        })
    }

    render() {
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                我的账户
                            </span>
                            <a className={style.headerTopI} href="javascript:void (0)">
                                <img className={style.headerTopI} src={require('./images/bell.png')} alt=""/>
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <img className={style.userImg} src="" alt=""/>
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        大大飞机
                                    </span>
                                    <span className={style.userTime}>
                                        2018/05/08
                                    </span>
                                </div>
                                <img className={style.userArrow} src={require('./images/arrowW.png')} alt=""/>
                                <img className={style.userQcode} src={require('./images/qcode.png')} alt=""/>
                            </a>
                        </div>
                    </div>
                    <div className={style.part}>
                        <List>
                            <a className={style.partTotal} href="javascript:void(0)">
                                <div className={style.totalL}>
                                <span className={style.totalLT}>
                                    总金额 （元）<img className={style.see} src={require('./images/see.png')} alt=""/>
                                </span>
                                    <span className={style.totalLB}>
                                    317.556.02
                                </span>
                                </div>
                                <img className={style.totalR} src={require('./images/arrow.png')} alt=""/>
                            </a>
                        </List>
                        <List className={style.partUl}>
                            <a className={style.partLi} href="javascript:void(0)">
                                <span className={style.itemTitle}>活期余币（元</span>
                                <span className={style.itemContent}>0.00</span>
                            </a>
                            <a className={style.partLi} href="javascript:void(0)">
                                <span className={style.itemTitle}>活期币额（元</span>
                                <span className={style.itemContent}>0.00</span>
                            </a>
                            <a className={style.partLi} href="javascript:void(0)">
                                <span className={style.itemTitle}>基金（元）</span>
                                <span className={style.itemContent}>0.00</span>
                            </a>
                            <a className={style.partLi} href="javascript:void(0)">
                                <span className={style.itemTitle}>累计好友奖励（元）</span>
                                <span className={style.itemContent}>0.00</span>
                            </a>
                        </List>
                    </div>
                    <div className={style.part}>
                        <List>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/list.png')} alt=""/><span className={style.itemWord}>账单</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/out.png')} alt=""/><span className={style.itemWord}>转入与转出</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/lock.png')} alt=""/><span className={style.itemWord}>安全设置</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                        </List>
                    </div>
                    <div className={style.part}>
                        <List>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/hear.png')} alt=""/><span className={style.itemWord}>帮助中心</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/home.png')} alt=""/><span className={style.itemWord}>公众号</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                        </List>
                    </div>
                    <div className={style.part}>
                        <List>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/enter.png')} alt=""/><span className={style.itemWord}>APP下载与入口找回
</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/set.png')} alt=""/><span className={style.itemWord}>系统设置
</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
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
        logout: bindActionCreators(logout, dispatch),
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
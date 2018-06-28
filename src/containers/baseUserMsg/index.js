import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import {logout,getUserDetailMsg} from '../../actions/user'

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
        if(this.props.user.token){
            this.props.getUserDetailMsg({},()=>{

            })
        }

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
        if(!this.props.user.token){
            hashHistory.push('/auth')
            return null
        }
        if(!this.props.user.userInfo){
            return null
        }
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
                            <Link to={'/setPerson'}>
                                <a className={style.user}  href="javascript:void (0)">
                                    <img className={style.userImg} src={this.props.user.userInfo.portraitUrl} alt=""/>
                                    <div className={style.userData}>
                                        <span className={style.userName}>
                                            {this.props.user.userInfo.userName}
                                        </span>
                                        <span className={style.userTime}>
                                            上次登录时间：{this.props.user.userInfo.loginTime}
                                        </span>
                                    </div>
                                    <img className={style.userArrow} src={require('./images/arrowW.png')} alt=""/>
                                    <img className={style.userQcode} src={require('./images/qcode.png')} alt=""/>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={style.part}>
                        <List>
                            <a className={style.partTotal} href="javascript:void(0)">

                                    <div className={style.totalL}>
                                        <Link to={'/moneyDetail'}>
                                        <span className={style.totalLT}>
                                            总金额 （元）<img className={style.see} src={require('./images/wen.png')} alt=""/>
                                        </span>
                                            <span className={style.totalLB}>
                                            {this.props.user.totalAmount}
                                        </span>
                                        </Link>
                                    </div>


                                    {/*<div className={style.totalL1}>*/}
                                        {/*<Link to={'/yesterdayEarnings'}>*/}
                                        {/*<span className={style.totalLT}>*/}
                                            {/*昨日收益 （元）*/}
                                        {/*</span>*/}
                                        {/*<span className={style.totalLB1}>*/}
                                            {/*+{this.props.user.yesterdayProfit}*/}
                                        {/*</span>*/}
                                        {/*</Link>*/}
                                    {/*</div>*/}

                                <img className={style.totalR} src={require('./images/arrow.png')} alt=""/>
                            </a>
                        </List>
                        <List className={style.partUl}>

                                <a className={style.partLi} href="javascript:void(0)">
                                    <Link to={'/activityBalance'}>
                                    <span className={style.itemTitle}>活动余币（元）</span>
                                    <span className={style.itemContent}>{this.props.user.activeAmount}</span>
                                    </Link>
                            </a>

                            <a className={style.partLi} href="javascript:void(0)">
                                <span className={style.itemTitle}>活期存币（元）</span>
                                <span className={style.itemContent}>{this.props.user.currentAmount}</span>
                            </a>
                            <a className={style.partLi} href="javascript:void(0)">
                                <Link to={'/fundIndex'}>
                                <span className={style.itemTitle}>基金（元）</span>
                                <span className={style.itemContent}>{this.props.user.fundAmount}</span>
                                </Link>
                            </a>

                                <a className={style.partLi} href="javascript:void(0)">
                                    <Link to={'/friendAward'}>
                                    <span className={style.itemTitle}>累计好友奖励（元）</span>
                                    <span className={style.itemContent}>{this.props.user.totalAward}</span>
                                    </Link>
                                </a>

                        </List>
                    </div>
                    <div className={style.part}>
                        <List>
                            <Link to={'/bill'}>
                                <a className={style.ensure} href="javascript:void(0)">

                                    <img className={style.itemEmoji} src={require('./images/list.png')} alt=""/><span className={style.itemWord}>账单</span>
                                    <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                                </a>
                            </Link>
                            <Link to={'/walletIndex'}>
                                <a className={style.ensure} href="javascript:void(0)">
                                    <img className={style.itemEmoji} src={require('./images/wallet.png')} alt=""/><span className={style.itemWord}>点点钱包</span>
                                    <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                                </a>
                            </Link>
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
                            {/*<a className={style.ensure} href="javascript:void(0)">*/}
                                {/*<img className={style.itemEmoji} src={require('./images/set.png')} alt=""/><span className={style.itemWord}>系统设置*/}
{/*</span>*/}
                                {/*<img className={style.arrow} src={require('./images/arrow.png')} alt=""/>*/}
                            {/*</a>*/}
                        </List>
                    </div>

                </div>
                <Footer person={true}/>
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
        getUserDetailMsg:bindActionCreators(getUserDetailMsg,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
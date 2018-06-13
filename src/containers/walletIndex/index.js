import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, NavBar, Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {logout, getBaseUserMsg} from '../../actions/user'
import {getWalletIndexData} from '../../actions/wallet'
import SafeSet from '../../containers/safeSet'

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logout() {
        Toast.loading('正在退出', 0)
        this.props.logout({}, (errorText) => {
            Toast.hide()
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            } else {
                hashHistory.push('/')
            }
        })
    }

    componentDidMount() {
        this.props.getWalletIndexData()
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
        if (this.props.wallet.loading) {
            return null
        }
        if (!this.props.wallet.isSetSaveCode) {
            return <SafeSet></SafeSet>
        }
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Link to={'/walletSetting'}>
                            <Icon key="1" type="ellipsis"/>
                        </Link>,
                    ]}
                >点点数字基金</NavBar>
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <div className={style.headerTopW}>

                            </div>
                            <a className={style.headerTopR} href="javascript:void (0)">
                                <img className={style.headerTopI} src={require('./images/money.png')} alt=""/>账户安全险保障中
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        可活动资产
                                    </span>
                                    <span className={style.userTime}>
                                        {this.props.wallet.totalAmount}
                                    </span>
                                </div>
                            </a>

                            <a href="javascript:void (0)" className={style.user1}>
                                <img src={require('./images/add.png')} alt=""/>
                            </a>

                            <Link to={'/outAddressList'}>
                                <a href="javascript:void (0)" className={style.user1}>
                                    <img src={require('./images/fadd.png')} alt=""/>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={style.content}>
                        <div className={style.contentHeader}>
                            <span className={style.contentTitle1}>
                                币种
                            </span>
                            <span className={style.contentTitle2}>
                                可活动币量 <img className={style.contentTitleIMG} src={require('./images/wen.png')} alt=""/>
                            </span>
                            <span className={style.contentTitle3}>
                                市值
                            </span>
                        </div>
                        <div className={style.contentContent}>
                            {
                                this.props.wallet.list.map((value,index)=>{
                                    return <Link to={'/dealDetails/'+value.currency}>
                                        <div className={style.contentPart}>
                                            <span className={style.contentPart1}>
                                                <img src={require('./images/BTC.png')} className={style.contentImg}
                                                     alt=""/>{value.currency}
                                            </span>
                                            <span className={style.contentPart2}>
                                                {value.amount}
                                            </span>
                                            <span className={style.contentPart3}>
                                                {value.realAmount}
                                                    <span className={style.contentPartTip}>
                                                       市场价：￥{value.marketPrice}
                                                    </span>
                                            </span>
                                        </div>
                                    </Link>
                                })
                            }
                        </div>
                    </div>

                </div>
                {/*<Footer/>*/}
            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {
        user: state.user,
        wallet: state.wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch),
        getWalletIndexData: bindActionCreators(getWalletIndexData, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,NavBar,Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import {logout,getBaseUserMsg,getUserDetailMsg} from '../../actions/user'

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
        this.props.getUserDetailMsg()
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
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[

                        <Link to={'/addAddress'}>+
                        </Link>,
                    ]}
                >添加常用地址</NavBar>
                <div>

                    <div className={style.part}>
                        <List>
                            <Link to={'/addressList'}>
                                <a className={style.ensure} href="javascript:void(0)">
                                    <img className={style.itemEmoji} src={require('./images/address.png')} alt=""/><span className={style.itemWord}>常用地址</span>
                                    <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                                </a>
                            </Link>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/coin.png')} alt=""/><span className={style.itemWord}>币种设置</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>

                        </List>
                    </div>
                    <div className={style.part}>
                        <List>
                            <Link to={'/safeCenter'}>
                                <a className={style.ensure} href="javascript:void(0)">
                                    <img className={style.itemEmoji} src={require('./images/locked.png')} alt=""/><span className={style.itemWord}>安全中心</span>
                                    <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                                </a>
                            </Link>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/safe.png')} alt=""/><span className={style.itemWord}>安全保障</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                        </List>
                    </div>
                    <div className={style.part}>
                        <List>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/help.png')} alt=""/><span className={style.itemWord}>帮助中心
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
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch),
        getUserDetailMsg:bindActionCreators(getUserDetailMsg,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
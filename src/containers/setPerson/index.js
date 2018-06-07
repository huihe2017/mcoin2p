import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
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

                    <div className={style.part}>
                        <List>
                            <a className={style.ensureH} href="javascript:void(0)">
                               <span className={style.itemWordH}>我的头像</span>
                                <img className={style.arrowH} src={require('./images/arrow.png')} alt=""/>
                                <img src={this.props.user.userInfo.portraitUrl} className={style.avator} alt=""/>
                            </a>

                        </List>
                    </div>
                    <div className={style.part}>
                        <List>
                            <Link to={'/qcode'}>
                                <a className={style.ensure} href="javascript:void(0)">
                                    <span className={style.itemWord}>邀请好友</span>
                                        <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                                    <img className={style.qcpde} src={require('./images/qcode.png')} alt=""/>
                                </a>
                            </Link>
                            <Link to={'/setName'}>
                                <a className={style.ensure} href="javascript:void(0)">
                                    <span className={style.itemWord}>昵称设置</span>
                                    <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                                    <span className={style.itemWordR}>{this.props.user.userInfo.userName}</span>
                                </a>
                            </Link>
                            <a className={style.ensure} href="javascript:void(0)">
                                <span className={style.itemWord}>绑定手机</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                        </List>
                    </div>
                    <div className={style.part}>
                        <List>
                            <Link to={'/riskType'}>
                                <a className={style.ensure} href="javascript:void(0)">
                                    <span className={style.itemWord}>风险选择
    </span>
                                    <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                                    <span className={style.itemWordR}>{this.props.user.userInfo.riskType}</span>
                                </a>
                            </Link>
                            <a className={style.ensure} href="javascript:void(0)">
                                <span className={style.itemWord}>我的客服
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
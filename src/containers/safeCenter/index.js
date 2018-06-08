import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Switch} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import {logout,getBaseUserMsg,getUserDetailMsg} from '../../actions/user'
import { createForm } from 'rc-form';

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
        const { getFieldProps } = this.props.form;
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <div>

                    <div className={style.part}>
                        <List>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/synthesize.png')} alt=""/><span className={style.itemWord}>安全码登录钱包设置</span>
                                <div className={style.arrow1}>
                                    <Switch
                                        {...getFieldProps('Switch2', {
                                            initialValue: false,
                                            valuePropName: 'checked',
                                        })}
                                        onClick={(checked) => { console.log(checked); }}
                                    />
                                </div>

                            </a>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/code.png')} alt=""/><span className={style.itemWord}>安全码更改</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                            <a className={style.ensure} href="javascript:void(0)">
                                <img className={style.itemEmoji} src={require('./images/know.png')} alt=""/><span className={style.itemWord}>安全知识百科</span>
                                <img className={style.arrow} src={require('./images/arrow.png')} alt=""/>
                            </a>
                        </List>
                    </div>
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
BaseUserMsg = createForm()(BaseUserMsg);

export default BaseUserMsg;
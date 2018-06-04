import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Picker} from 'antd-mobile';
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
        const seasons = [
            [
                {
                    label: '2013',
                    value: '2013',
                },
                {
                    label: '2014',
                    value: '2014',
                },
            ],

        ];
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <div>
                    <ul className={style.itemUl}>
                        <span className={style.title}>
                            安全码设置
                        </span>
                        <li className={style.itemBox}>

                            <InputItem onChange={(value) => {
                                this.setState({classNumber: value})
                            }} placeholder="安全码设置（6位数字）" type="text"></InputItem>
                        </li>
                        <li className={style.itemBox}>
                            <InputItem onChange={(value) => {
                                this.setState({classNumber: value})
                            }} placeholder="请再次输入" type="text" ></InputItem>
                        </li>
                    </ul>

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
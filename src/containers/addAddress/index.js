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
                        <li className={style.itemBox}>
                            <span className={style.itemBoxT}>
                                币种
                            </span>
                            <Picker
                                data={seasons}
                                title="选择币种"
                                cascade={false}
                                extra=" "
                                value={this.state.sValue}
                                onChange={v => this.setState({ sValue: v })}
                                onOk={v => this.setState({ sValue: v })}
                            >
                                <List.Item arrow="horizontal"><span className={style.itemBoxC}>
                                请选择币种
                            </span></List.Item>
                            </Picker>
                        </li>
                        <li className={style.itemBox}>
                            <span className={style.itemBoxT}>
                                地址
                            </span>
                            <InputItem onChange={(value) => {
                                this.setState({classNumber: value})
                            }} placeholder="请输入或者粘贴地址" type="text"></InputItem>
                        </li>
                        <li className={style.itemBox}>
                            <span className={style.itemBoxT}>
                                备注
                            </span>
                            <InputItem onChange={(value) => {
                                this.setState({classNumber: value})
                            }} placeholder="请输入备注信息以便区分" type="text"></InputItem>
                        </li>
                        <span className={style.tip}>
                            提示：1至20个字符，支持中英文以常见标点符号
                        </span>
                    </ul>
                    <div className={style.button}>
                        保存地址
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
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
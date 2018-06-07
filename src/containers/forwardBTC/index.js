import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Picker,Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {logout,getBaseUserMsg} from '../../actions/user'

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sValue:['0.002']
        }
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
                    label: '0.002(推荐)',
                    value: '0.002',
                },
                {
                    label: '0.001',
                    value: '0.001',
                },
                {
                    label: '0.007',
                    value: '0.007',
                },
                {
                    label: 'custom',
                    value: 'custom',
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
                                对方地址<span className={style.itemBoxTT}>（转出地址）</span>
                            </span>
                            <InputItem onChange={(value) => {
                                this.setState({classNumber: value})
                            }} placeholder="安全码设置（6位数字）" type="text" extra={<a href=""><img className={style.img} src={require('./images/add.png')} alt=""/></a>}></InputItem>
                        </li>
                        <li className={style.itemBox}>
                            <div className={style.itemB}>
                                <span className={style.itemBoxT1}>
                                    填写数额
                                </span>
                                <span className={style.itemBoxTT1}>
                                    可转 <span style={{color:'#5262FF'}}>0 BTC</span>
                                </span>
                            </div>

                            <InputItem onChange={(value) => {
                                this.setState({classNumber: value})
                            }} placeholder="请填写数额" type="text" extra="BTC"></InputItem>
                        </li>
                        <li className={style.itemBox}>
                            <span className={style.itemBoxT}>
                                矿工费
                            </span>
                            <Picker
                                data={seasons}
                                title="选择矿工费"
                                cascade={false}
                                extra=" "
                                value={this.state.sValue}
                                onChange={v => this.setState({ sValue: v })}
                                onOk={v => this.setState({ sValue: v },()=>{
                                    if(this.state.sValue=='custom'){hashHistory.push('/safeSet')}})}
                                okText={<Icon type={'check'} />}
                                dismissText={<Icon type={'cross'} />}
                            >
                                <List.Item arrow="horizontal"><span className={style.itemBoxC}>
                                请选择币种
                            </span></List.Item>
                            </Picker>
                        </li>
                    </ul>
                    <div className={style.button}>
                        下一步
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
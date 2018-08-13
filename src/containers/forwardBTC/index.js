import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Picker, Icon, Modal, NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {logout} from '../../actions/user'
import {getMinerFee, confirmWithdrawMsg} from '../../actions/wallet'
import {changeJson} from '../../common/util'

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            can: false,
            classNumber: '',
            amount: '',
            sValue: [],
        }
    }


    componentDidMount() {

        if (this.props.wallet.current) {
            this.props.getMinerFee({currency: this.props.wallet.current.balance.currency})
        }
        if (this.props.params.address !== 'null') {
            this.setState({classNumber: this.props.params.address})
        }
    }

    submit = key => () => {
        if (!this.state.can) {
            Toast.fail('阅读后方可', 3, null, false)
            return
        }
        this.props.confirmWithdrawMsg({
            currency: this.props.wallet.current.balance.currency,
            amount: this.state.amount,
            minerFee: this.state.sValue,
            address: this.state.classNumber
        }, () => {
            hashHistory.push('/inputSafe')
        })

    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    can() {
        if (this.state.can) {
            this.setState({
                can: false
            })
            return false
        }
        this.setState({
            can: true
        })
    }

    next() {
        console.log(this.state.classNumber);
        if (this.state.classNumber && this.state.amount && this.state.sValue.length) {
            this.setState({
                modal1: true,
            })
        } else {
            Toast.fail('请完善资料', 3, null, false);
        }

    }


    render() {
        if (!this.props.wallet.current) {
            hashHistory.push('/walletIndex')
        }
        if (!this.props.wallet.minerFeeList) {
            return null
        }

        return (

            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[]}
                >转账</NavBar>
                <div>
                    <ul className={style.itemUl}>

                        <li className={style.itemBox}>
                            <span className={style.itemBoxT}>
                                对方地址<span className={style.itemBoxTT}>（转出地址）</span>
                            </span>
                            <InputItem onChange={(value) => {
                                this.setState({classNumber: value})
                            }} placeholder="输入或双击粘贴地址" type="text"
                                       extra={<Link to={'/commonAddress'}><img className={style.img}
                                                                               src={require('./images/add.png')}
                                                                               alt=""/></Link>}
                                       value={this.state.classNumber}
                            >
                            </InputItem>

                        </li>
                        <li className={style.itemBox}>
                            <div className={style.itemB}>
                                <span className={style.itemBoxT1}>
                                    填写数额
                                </span>
                                <span className={style.itemBoxTT1}>
                                    可转 <span
                                    style={{color: '#5262FF'}}>{this.props.wallet.current.balance.amount} {this.props.wallet.current.balance.currency}</span>
                                </span>
                            </div>

                            <InputItem onChange={(value) => {
                                this.setState({amount: value})
                            }} placeholder="请填写数额" type="text"
                                       extra={this.props.wallet.current.balance.currency}></InputItem>
                        </li>
                        {/*<li className={style.itemBox}>*/}
                        {/*<span className={style.itemBoxT}>*/}
                        {/*矿工费*/}
                        {/*</span>*/}
                        {/*<Picker*/}
                        {/*data={changeJson(this.props.wallet.minerFeeList, 'tips', 'minerFee')}*/}
                        {/*title="选择矿工费"*/}
                        {/*cascade={false}*/}
                        {/*extra=" "*/}
                        {/*cols={1}*/}
                        {/*value={this.state.sValue}*/}
                        {/*onChange={v => this.setState({sValue: v})}*/}
                        {/*onOk={v => this.setState({sValue: v}, () => {*/}
                        {/*if (this.state.sValue == 'custom') {*/}
                        {/*hashHistory.push('/customCost')*/}
                        {/*}*/}
                        {/*})}*/}
                        {/*okText={<Icon type={'check'}/>}*/}
                        {/*dismissText={<Icon type={'cross'}/>}*/}
                        {/*>*/}
                        {/*<List.Item arrow="horizontal">矿工费</List.Item>*/}
                        {/*</Picker>*/}
                        {/*</li>*/}
                        <li  className={style.itemBox}>
                            <span className={style.itemBoxT1}>
                                    转出手续费 0.00010000
                                </span>
                        </li>
                    </ul>
                    <div className={style.button} onClick={() => this.next()}>
                        下一步
                    </div>
                    <Modal
                        visible={this.state.modal1}
                        transparent
                        maskClosable={true}
                        onClose={() => this.setState({modal1: false})}
                        title="提示"
                        closable={true}
                        footer={[
                            {
                                text: '取消', onPress: () => {
                                    this.setState({modal1: false})
                                }
                            }
                            , {
                                text: '完成', onPress: () => {
                                    this.submit('modal1')();
                                }
                            }
                        ]}
                        wrapProps={{onTouchStart: this.onWrapTouchStart}}
                    >
                        <div style={{height: 256}}>
                            <span className={style.alTip}>
                                请再次确认消息
                            </span>
                            <span className={style.alTip}>
                                确认无误，请点击完成
                            </span>
                            <span className={style.alTip} style={{marginTop: 12}}>
                                转出币种：
                                <span style={{color: '#3B3D40'}}>
                                    {this.props.wallet.current.balance.currency}                                </span>
                            </span>
                            <span className={style.alTip}>
                                转出币量：
                                <span style={{color: '#3B3D40'}}>
                                    {this.state.amount}
                                </span>
                            </span>
                            <span className={style.alTip}>
                                &nbsp;&nbsp; 矿工费：
                                <span style={{color: '#3B3D40'}}>
                                    {this.state.sValue}
                                </span>
                            </span>
                            {/*<span className={style.alTip}>*/}
                            {/*备注名称：*/}
                            {/*<span style={{color:'#3B3D40'}}>*/}
                            {/*飞机*/}
                            {/*</span>*/}
                            {/*</span>*/}
                            <span className={style.alTip}>
                                <span className={style.alTip1}>钱包地址：</span>
                                <span className={style.alTip2} style={{color: '#3B3D40'}}>
                                    {this.state.classNumber}
                                </span>
                            </span>

                            <div className={style.checkTip}>
                                <span className={style.alertTip}>
                                    <img className={style.footerI} onClick={() => {
                                        this.can()
                                    }} src={require(`../productBuying/images/${this.state.can}.png`)} alt=""/>数字货币转入其他地址后，将无法取消和追回，请保证目标地址的安全性与正确性
                                </span>
                            </div>
                        </div>
                    </Modal>
                </div>
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
        confirmWithdrawMsg: bindActionCreators(confirmWithdrawMsg, dispatch),
        getMinerFee: bindActionCreators(getMinerFee, dispatch),
        logout: bindActionCreators(logout, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Picker, Modal, Checkbox, NavBar, Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {logout} from '../../actions/user'
import {addOrEditAddress} from '../../actions/wallet'

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

const CheckboxItem = Checkbox.CheckboxItem;

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            can: false,
            currency: []
        }
    }


    componentDidMount() {
        let id = this.props.params.id
        let filterData
        if (id !== 'null') {
            filterData = this.props.wallet.commonAddress[this.props.params.currency].filter((item) => id == item.id);
            filterData = filterData[0]
            this.setState({currency: [filterData.currency]})
            this.setState({address: filterData.address})
            this.setState({tag: filterData.tag})
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

    submit = key => () => {
        if (!this.state.can) {
            alert('勾选阅读后才可提交')
            return
        }
        this.props.addOrEditAddress({
            currency: this.state.currency[0],
            address: this.state.address,
            tag: this.state.tag
        }, () => {
            this.props.history.goBack()
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
        if (this.state.tag && this.state.address && this.state.currency.length) {
            this.setState({
                modal1: true,
            })
        } else {
            Toast.fail('请完善资料', 3, null, false);
        }

    }

    render() {
        const seasons = [
            [
                {
                    label: 'BTC',
                    value: 'BTC',
                },
                {
                    label: 'ETH',
                    value: 'ETH',
                },
            ],

        ];
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        hashHistory.push('addressList')
                    }}
                    rightContent={[]}
                >添加转出地址</NavBar>
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
                                value={this.state.currency}
                                onChange={v => {
                                    this.setState({currency: v})
                                }}
                                onOk={v => this.setState({currency: v})}
                            >
                                <List.Item  arrow="horizontal"><span className={style.itemBoxC}>
                                请选择币种
                            </span></List.Item>
                            </Picker>
                        </li>
                        <li className={style.itemBox}>
                            <span className={style.itemBoxT}>
                                地址
                            </span>
                            <InputItem onChange={(value) => {


                                this.setState({address: value})
                            }} placeholder="请输入或者粘贴地址"
                                       value={this.state.address}
                                       type="text"></InputItem>
                        </li>
                        <li className={style.itemBox}>
                            <span className={style.itemBoxT}>
                                备注
                            </span>
                            <InputItem onChange={(value) => {
                                this.setState({tag: value})
                            }}
                                       value={this.state.tag}
                                       placeholder="请输入备注信息以便区分" type="text"></InputItem>
                        </li>
                        <span className={style.tip}>
                            提示：1至20个字符，支持中英文以常见标点符号
                        </span>
                    </ul>
                    <div className={style.button} onClick={() => this.next()}>
                        {this.props.params.id === 'null' ? '保存地址' : '修改地址'}

                    </div>
                    <Modal
                        visible={this.state.modal1}
                        transparent
                        maskClosable={true}
                        onClose={() => this.setState({modal1: false})}
                        title="地址确认"
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
                        <div style={{height: 130}}>
                            <span className={style.alTip} style={{marginTop: 12}}>
                                备注名称：
                                <span style={{color: '#3B3D40'}}>
                                    {this.state.tag}
                                </span>
                            </span>
                            <span className={style.alTip}>
                                货币类型：
                                <span style={{color: '#3B3D40'}}>
                                    {this.state.currency}
                                </span>
                            </span>
                            <span className={style.alTip}>
                                <span className={style.alTip1}>钱包地址：</span>
                                <span className={style.alTip2} style={{color: '#3B3D40'}}>
                                    {this.state.address}
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
        wallet: state.wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addOrEditAddress: bindActionCreators(addOrEditAddress, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
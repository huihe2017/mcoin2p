import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,RefreshControl, Tabs,Carousel,Modal,Button,NavBar,Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {buyFund} from '../../actions/fund'
import ReactDOM from "react-dom";

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal2: false,
            modal3:false,
            can:false,
            xu:true,
            xu1:true
        };
    }

    componentDidMount(){
    }

    componentWillMount(){
        // if(!this.props.user.token){
        //     this.props.setAuthFrom('/history',()=>{
        //         hashHistory.push('/auth')
        //     })
        // }
    }

    can(){
        if(this.state.can){
            this.setState({
                can:false
            })
            return false
        }
        this.setState({
            can:true
        })
    }

    render() {
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[


                    ]}
                >产品买入</NavBar>
                <div className={style.wrapContent}>
                    <div className={style.title}>
                        {this.props.fund.detail.title}
                    </div>
                    <div className={style.input}>
                        买入币额
                        <span className={style.extra}>
                           {this.props.fund.detail.currency}
                        </span>
                        <InputItem
                            placeholder=""
                            clear
                            style={{paddingLeft:40}}
                            onChange={(v) => { this.setState({amount:v}) }}
                            onBlur={(v) => { console.log('onBlur', v); }}
                        ></InputItem>
                    </div>
                    <div className={style.inputTip}>
                        预计{this.props.fund.detail.profitTime}产生收益，具体确认时间以买入时间为准，到期前不能赎回。 基金交易规则请查看 <a href="javascript:void (0)">交易规则</a>
                    </div>
                    <div className={style.expire} onClick={()=>this.setState({
                        modal2: true,
                    })}>
                        到期后
                        <div className={style.expireA}>
                            {this.state.xu1?'自动续期':'自动赎回'} <img className={style.expireI} src={require('./images/arrow.png')} alt=""/>
                        </div>
                        <Modal
                            popup
                            visible={this.state.modal2}
                            onClose={()=>this.setState({
                                modal2: false,
                            })}
                            animationType="slide-up"
                        >
                            <List className="popup-list">
                                {[<div onClick={()=>{this.setState({xu:true
                                })}}><div className={style.ititle}>自动续期 <span hidden={!this.state.xu} className={style.ititle1}>当前选择</span></div><div className={style.icontent}>到期后本金及收益自动买入下一期，收益不间断。到期前一天15：00前均可更改。</div></div>, <div onClick={()=>{this.setState({xu:false})}}><div className={style.ititle}>自动续回 <span hidden={this.state.xu} className={style.ititle1}>当前选择</span></div><div className={style.icontent}>到期后本金及收益回到活动余币。到期前一天15：00前均可改。</div></div>].map((i, index) => (
                                    <List.Item key={index}>{i}</List.Item>
                                ))}
                                <List.Item>
                                    <div className={style.button}>
                                        <Button type="primary" onClick={()=>this.setState({
                                            modal2: false,
                                            xu1:this.state.xu
                                        })}>确认</Button>
                                    </div>

                                </List.Item>
                            </List>
                        </Modal>
                    </div>
                    <div className={style.footer}>
                        <div className={style.footerBox}>
                            <img className={style.footerI} onClick={()=>{this.can()}} src={require(`./images/${this.state.can}.png`)} alt=""/>
                            <span className={style.footerS}>
                            我同意<a href="javascript:void (0)">相关协议</a>，并知晓七日年化收益率不代表任何收益承诺，本产品可能存在资金损失风险。
                        </span>
                        </div>

                        <Button type="primary" disabled={!this.state.can} onClick={()=>this.setState({
                            modal3: true,
                        })}>确认买入</Button>
                        <Modal
                            popup
                            visible={this.state.modal3}
                            onClose={()=>this.setState({
                                modal3: false,
                            })}
                            animationType="slide-up"
                        >
                            <List className="popup-list">
                                {[<div><div className={style.ititle}>风险确认</div><div className={style.icontent}>您当前买入的基金已经超过您个人的风险承受范围【保守型】，
                                    请充分考虑后继续买入</div></div>].map((i, index) => (
                                    <List.Item key={index}>{i}</List.Item>
                                ))}
                                <List.Item>
                                    <div className={style.button1} style={{marginBottom:10}}>
                                        <Button type="primary" onClick={()=>this.setState({
                                            modal3: false,
                                        })}>再考虑一下</Button>
                                    </div>
                                    <div className={style.button}>
                                        <Button type="primary" onClick={()=>{this.setState({
                                            modal3: false,
                                        },()=>{
                                            if(this.state.amount>this.props.fund.detail.limitHighAmount){
                                                Toast.fail('超出最大购买额度', 3, null, false)
                                                return false
                                            }

                                            this.props.buyFund({
                                                productId:this.props.fund.detail.id,
                                                amount:this.state.amount,
                                                autoRenew:this.state.autoRenew?1:0

                                            },()=>{
                                                hashHistory.push('/buyResult')

                                            })

                                        });
                                        }}>继续买入</Button>
                                    </div>

                                </List.Item>
                            </List>
                        </Modal>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        fund:state.fund
    }
}

function mapDispatchToProps(dispatch) {
    return {
        buyFund:bindActionCreators(buyFund,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
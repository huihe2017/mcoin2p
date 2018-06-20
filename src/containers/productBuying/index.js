import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Icon,RefreshControl, Tabs,Carousel,Modal,Button} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getAssetDetail} from '../../actions/asset'
import ReactDOM from "react-dom";

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal2: false,
            modal3:false,
            can:false
        };
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
                {/*<Header/>*/}
                <div className={style.wrapContent}>
                    <div className={style.title}>
                        基金名额
                    </div>
                    <div className={style.input}>
                        基金名额
                        <span className={style.extra}>
                           ￥
                        </span>
                        <InputItem
                            type={'number'}
                            placeholder=""
                            clear
                            onChange={(v) => { console.log('onChange', v); }}
                            onBlur={(v) => { console.log('onBlur', v); }}
                        ></InputItem>
                    </div>
                    <div className={style.inputTip}>
                        5月31日（星期一）产生收益，到期前不能赎回<br/>
                        基金交易规则请查看 <a href="javascript:void (0)">交易规则</a>
                    </div>
                    <div className={style.expire} onClick={()=>this.setState({
                        modal2: true,
                    })}>
                        到期后
                        <div className={style.expireA}>
                            自动续期 <img className={style.expireI} src={require('./images/arrow.png')} alt=""/>
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
                                {[<div onClick={()=>{alert(1)}}><div className={style.ititle}>自动续期</div><div className={style.icontent}>到期后本金及收益自动买入下一期，收益不间断。到期前一天15：00前均可更改。</div></div>, <div onClick={()=>{alert(3)}}><div className={style.ititle}>自动续回</div><div className={style.icontent}>到期后本金及收益回到活动余币。到期前一天15：00前均可改。</div></div>].map((i, index) => (
                                    <List.Item key={index}>{i}</List.Item>
                                ))}
                                <List.Item>
                                    <div className={style.button}>
                                        <Button type="primary" onClick={()=>this.setState({
                                            modal2: false,
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
                                        <Button type="primary" onClick={()=>this.setState({
                                            modal3: false,
                                        })}>继续买入</Button>
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
        asset:state.asset
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAssetDetail:bindActionCreators(getAssetDetail,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
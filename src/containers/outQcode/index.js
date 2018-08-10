import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Button, NavBar, Icon, Modal} from 'antd-mobile';
import {getRechargeAddress} from '../../actions/wallet'
import {bindActionCreators} from "redux";
import QRCode from 'qrcode.react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Toast} from "antd-mobile/lib/index";

const prompt = Modal.prompt;

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sum: '',
            address: ''
        }
    }

    componentDidMount() {
        this.props.getRechargeAddress({
            currency: this.props.wallet.current.balance.currency
        }, () => {
            this.setState({address:this.props.wallet.current.address})
        })
    }

    render() {
        if(!this.state.address){
            return null
        }
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}

                >{this.props.wallet.current.balance.currency}</NavBar>
                <div className={style.content}>
                    <div className={style.qcodeBox}>
                        <div className={style.header}>

                            <a className={style.nameA} href="javascript:void (0)" onClick={() => prompt('金额', '', [
                                {text: '取消'},
                                {
                                    text: '确定',
                                    onPress: value => this.setState({sum: value,address:this.props.wallet.current.address+'?amount='+value}, () => console.log(`输入的内容:${value}`))
                                },
                            ])}>
                                <span className={style.name}>{this.state.sum == '' ? '设置金额' : this.state.sum}</span>
                                <img className={style.nameImg} src={require('./images/edit.png')} alt=""/>

                            </a>
                        </div>
                        <div className={style.qcode}>
                            <QRCode renderAs={'svg'} size={'100%'} value={this.state.address}/>
                        </div>
                        {/*<div className={style.footer}>*/}
                            {/*186****0031*/}
                        {/*</div>*/}
                        <div className={style.footer1}>
                            <span className={style.address}>
                                {this.props.wallet.current.address}
                            </span>
                            <span className={style.addressDo}>

                                <CopyToClipboard onCopy={()=>{ Toast.info('复制成功', 2, null, false)}} text={this.state.address}
                                >
                                                {/*<button className={style.but}>复制地址并关闭*/}
                                                {/*</button>*/}
                                    <span>复制</span>
                                            </CopyToClipboard>



                            </span>

                        </div>
                    </div>
                    <div className={style.save}>
                        保存到相册
                    </div>
                </div>

            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {
        wallet: state.wallet,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRechargeAddress: bindActionCreators(getRechargeAddress, dispatch)
    }
}

AboutUs = connect(mapStateToProps, mapDispatchToProps)(AboutUs)


export default AboutUs;
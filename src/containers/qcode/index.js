import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Button, NavBar, Icon} from 'antd-mobile';
import {inviteRegis} from '../../actions/user'
import {hashHistory} from "react-router";
import QRCode from 'qrcode.react';
import {bindActionCreators} from 'redux';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.inviteRegis()
    }

    render() {
        debugger
        if(!this.props.user.userInfo.shareUrl){
            return null
        }
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/setPerson')}

                >我的二维码</NavBar>
                <div className={style.content}>
                    <div className={style.qcodeBox}>
                        <div className={style.header}>
                            <img src="" className={style.avator} alt=""/>
                            <span className={style.name}>{this.props.user.userInfo.userName}</span>
                        </div>
                        <div className={style.qcode}>
                            <QRCode renderAs={'svg'} size={'100%'} value={'http://fund.coin2p.com/#/auth?_k='+this.props.user.userInfo.shareUrl}/>
                        </div>
                        <div className={style.footer}>
                            扫一扫二维码图案，在点点数字基金关注我
                        </div>
                    </div>
                </div>
            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        inviteRegis: bindActionCreators(inviteRegis, dispatch)
    }
}

AboutUs = connect(mapStateToProps, mapDispatchToProps)(AboutUs)


export default AboutUs;
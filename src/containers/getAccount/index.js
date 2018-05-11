import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux';
import BankCardMsg from '../../components/bankCardMsg';
import PersonalMsg from '../../components/personalMsg';
import PhoneConfirm from '../../components/phoneConfirm';
import {Steps} from "antd-mobile"
import Header from '../../components/header'

const Step = Steps.Step;

const steps = [{
    title: '手机号验证'
}, {
    title: '联络人信息'
}, {
    title: '银行卡信息'
}].map((s, i) => <Step key={i} title={s.title} description={s.description}/>);


class GetAccount extends React.Component {

    render() {
        let step = this.props.foreignExchange.getAccountStep
        return (
            <div className={style.wrap}>
                <Header/>
                <Steps current={step} direction="horizontal">{steps}</Steps>
                {this.showtab()}
            </div>
        )
    }

    showtab() {
        let step = this.props.foreignExchange.getAccountStep
        if (step == '0') {
            return <PhoneConfirm/>
        } else if (step == '1') {
            return <PersonalMsg/>
        } else if (step == '2') {
            return <BankCardMsg/>
        }
    }
}

function mapStateToProps(state, props) {
    return {
        foreignExchange:state.foreignExchange
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

GetAccount = connect(mapStateToProps, mapDispatchToProps)(GetAccount)


export default GetAccount;
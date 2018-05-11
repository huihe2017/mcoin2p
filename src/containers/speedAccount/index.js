import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { Steps } from 'antd-mobile';
import SpeedBankCard from '../../components/speedBankCard';
import SpeedID from '../../components/speedID';
import Header from '../../components/header'

const Step = Steps.Step;

const steps = [{
    title: '上传身份证'
}, {
    title: '上传银行卡'
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);

class SpeedAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state:1
        }
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header/>
                <Steps current={this.state.state} direction="horizontal">{steps}</Steps>
                {this.showtab()}
            </div>
        )

    }
    showtab(){
        if(this.state.state=='0'){
            return <SpeedID/>
        }else if(this.state.state=='1'){
            return <SpeedBankCard/>
        }
    }

}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

SpeedAccount = connect(mapStateToProps, mapDispatchToProps)(SpeedAccount)


export default SpeedAccount;
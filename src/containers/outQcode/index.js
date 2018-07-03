import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { List,InputItem,Button,NavBar,Icon,Modal} from 'antd-mobile';
import Header from '../../components/header'
import {hashHistory} from "react-router";

const prompt = Modal.prompt;

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sum:''
        }
    }

    render() {
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}

                >BTC</NavBar>
                <div className={style.content}>
                    <div className={style.qcodeBox}>
                        <div className={style.header}>

                            <a className={style.nameA} href="javascript:void (0)" onClick={()=> prompt('金额', '', [
                                { text: '取消' },
                                { text: '确定', onPress: value => this.setState({sum:value},()=>console.log(`输入的内容:${value}`)) },
                            ])}>
                                <span className={style.name}>{this.state.sum==''?'设置金额':this.state.sum}</span>
                                <img className={style.nameImg} src={require('./images/edit.png')} alt=""/>
                            </a>
                        </div>
                        <div className={style.qcode}>

                        </div>
                        <div className={style.footer}>
                            186****0031
                        </div>
                        <div className={style.footer1}>
                            <span className={style.address}>
                                1LezCq1NAfdsfbsdkjfksdsasdddddddddsdddsadfsafsadasdasdas
                            </span>
                            <span className={style.addressDo}>
                                复制
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
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

AboutUs = connect(mapStateToProps, mapDispatchToProps)(AboutUs)


export default AboutUs;
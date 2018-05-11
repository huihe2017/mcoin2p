import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { List,InputItem,WingBlank,Button,Toast} from "antd-mobile"
import { getAccountStep } from '../../actions/foreignExchange'
import { bindActionCreators } from 'redux'
import axios from '../../common/axiosConf'


class PhoneConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code:''
        }
    }
    getCode(){
        axios.post('http://47.91.236.245:4030/user/sms-captcha', {
            phone: '13725503790',
            business:'VERIFICATION'

        })
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    submitFn(){

        // axios.post('http://47.91.236.245:4030/user/customer/bank-card', {
        //     sms_captcha: "9140",
        //     email: 'egwg@qq.com',
        //     bank_code: 'ABC',
        //     bank_card: '6228480402564890018',
        //     bank_card_face: '/uploads/2017/10/d95879d3ad964ca51b27c14371ee540e.jpeg',
        //     id_card: '440307197311242392',
        //     id_card_face: '/uploads/2017/10/d95879d3ad964ca51b27c14371ee540e.jpeg',
        //     id_card_back: '/uploads/2017/10/d95879d3ad964ca51b27c14371ee540e.jpeg',
        //     real_name: "张山"
        // })
        //     .then(function (response) {
        //         if (response.data.code === 0) {
        //
        //         } else {
        //
        //         }
        //     })
        //     .catch(function (error) {
        //         alert(error);
        //     });
        //
        //
        // return false





        if(!this.state.code){
            Toast.fail("请输入验证码", 3, null, false)
            return false
        }
        this.props.getAccountStep(1,this.state)

    }
    render() {
        console.log('2222', this.props.foreignExchange)
        return (
            <div className={style.wrap}>
                <List >
                    <InputItem
                        placeholder={this.props.userName}
                        editable={false}
                        style={{textAlign:"right"}}
                    >绑定手机号</InputItem>
                    <InputItem
                        extra="获取验证码"
                        placeholder="输入验证码"
                        value={this.state.code}
                        onChange={(value)=>{this.setState({code:value})}}
                        onExtraClick={this.getCode}
                    />
                </List>
                <div className={style.button}>
                    <WingBlank size="lg">
                        <Button onClick={this.submitFn.bind(this)} type="primary">下一步</Button>
                    </WingBlank>
                </div>
            </div>
        )

    }
}

function mapStateToProps(state, props) {
    return {
        userName:state.user.userName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAccountStep: bindActionCreators(getAccountStep, dispatch)

    }
}

PhoneConfirm = connect(mapStateToProps, mapDispatchToProps)(PhoneConfirm)


export default PhoneConfirm;
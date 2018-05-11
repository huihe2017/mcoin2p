import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux';
import {List, InputItem, Button, WingBlank, NoticeBar, Picker, Toast} from 'antd-mobile';
import {hashHistory} from 'react-router'
import Header from '../../components/header'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'

class InGold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inGoldValue: '',
            bankCode: 0
        };
    }

    inGold() {
        if (!this.state.inGoldValue) {
            Toast.fail("请输入入金金额", 3, null, false)
            return false
        }
        if (!this.state.bankCode) {
            Toast.fail("请选择支付网银", 3, null, false)
            return false
        }
        hashHistory.push('/resultsPage')

    }

    render() {
        console.log('2222', this.props.foreignExchange.inGoldBanks);

        return (
            <div className={style.wrap}>
                <Header/>
                <NoticeBar icon={null} style={{textAlign: "center", backgroundColor: "#f39392", color: "#fff"}}
                >尚未开户，当前可入金额：美元$5000</NoticeBar>
                <List>
                    <InputItem
                        placeholder="输入金额，最低50美元"
                        extra="$"
                        style={{textAlign: "right"}}
                        value={this.state.inGoldValue}
                        onChange={(value) => {
                            this.setState({inGoldValue: value})
                        }}
                    >入金金额</InputItem>
                </List>
                <div className={style.tip}>
                        <span className={style.left}>
                            合人民币：<span></span>
                        </span>
                    <span className={style.right}>
                            当前汇率：{this.props.foreignExchange.exchangeRate}
                        </span>
                </div>
                <List>
                    <Picker onChange={(value) => {
                        this.setState({bankCode: (value - 0)})
                    }} value={[this.state.bankCode]} data={this.props.foreignExchange.inGoldBanks} cols={1}>
                        <List.Item arrow="horizontal">选择银行网银支付</List.Item>
                    </Picker>

                </List>
                <div className={style.button}>
                    <WingBlank size="lg">
                        <Button onClick={this.inGold.bind(this)} type="primary">确认入金</Button>
                    </WingBlank>
                </div>
            </div>
        )

    }
    componentWillMount(){
        if(!this.props.user.token){
            this.props.setAuthFrom('/ingold',()=>{
                hashHistory.push('/auth')
            })
        }
    }
    onPickerChange = (val) => {
        console.log(val);
        let colNum = 1;
        const d = [...this.state.data];
        const asyncValue = [...val];
        this.setState({
            data: d,
            cols: colNum,
            asyncValue,
        });
    };
    // onClick = () => {
    //     setTimeout(() => {
    //         this.setState({
    //             data: province,
    //         });
    //     }, 120);
    // };
}

function mapStateToProps(state, props) {
    return {
        foreignExchange: state.foreignExchange,
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthFrom:bindActionCreators(setAuthFrom, dispatch)
    }
}

InGold = connect(mapStateToProps, mapDispatchToProps)(InGold)


export default InGold;
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {getWalletTradeRecord} from '../../actions/wallet'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import {logout,getBaseUserMsg} from '../../actions/user'

const data = [
    {
        num:1,
        out: false,
        number: '14.2123411231',
        do: '操作完成 ',
        time: '2018/05/23  23:52',
        address: '1LezCq1NAfdsfbsdkjfksdsasdddddddddsddddddddddsadfsafsadasdasdas',
    },
    {
        num:2,
        out: true,
        number: '14.2123411231',
        do: '操作完成 ',
        time: '2018/05/23  23:52',
        time1: '2018/05/23  23:52',
        commission:0.02,
        address: '1LezCq1NAfdsfbsdkjfksdsasdddddddddsddddddddddsadfsafsadasdasdas',

    },




];

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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

    componentDidMount(){
        this.props.getWalletTradeRecord()
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

    show(){
        let data = this.props.wallet.current
        if(data.list.length==0){
            return(
                <div>
                    <img className={style.showImg} src={require('../addressList/images/zero.png')} alt=""/>
                    <span className={style.showTip}>
                        暂无数据
                    </span>
                </div>
            )
        }else {
            return(
                data.list.map((i,index) => (

                    <div className={style.item} key={index} >
                        <div className={style.itemH}>
                            <div className={style.itemHead}>
                                <div className={style.itemCoin}>
                                    {i.type==='转出'?<div  className={style.itemT}>
                                        <img className={style.itemImg} src={require('./images/out.png')} alt=""/>转入
                                    </div>:<div style={{color:'#5262ff'}} className={style.itemT}>
                                        <img  className={style.itemImg} src={require('./images/in.png')} alt=""/>转出
                                    </div>}
                                    {i.minerFee?
                                        <span className={style.commission}>
                                    手续费：{i.minerFee}BTC
                                </span>:''
                                    }
                                </div>
                            </div>
                            <div className={style.itemDataBox}>
                                <div className={style.itemLeft}>
                                    数量 {i.type==='转出'?<span style={{color: '#3B3D40',marginLeft:10}}>-{i.amount}</span>:<span style={{color: '#3B3D40',marginLeft:10}}>+{i.amount}</span>}
                                </div>
                                <div className={style.itemRight}>
                                    <span className={style.itemLeftC}>状态</span> {i.out?<span className={style.itemRightC}>{i.status}</span>:<span className={style.itemRightC}>{i.status}</span>}
                                </div>
                                <div className={style.itemLeft}>
                                    {i.type==='转出'?'发起':''}{i.type==='转出'?<span style={{color: '#3B3D40',marginLeft:10}}>{i.beginTime}</span>:<span style={{color: '#3B3D40',marginLeft:10}}></span>}
                                </div>
                                <div className={style.itemRight}>
                                    <span className={style.itemLeftC}>完成</span> <span className={style.itemRightC}>{i.completeTime}</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.itemAdressBox}>
                            <div className={style.itemAdressT}>
                                地址
                            </div>
                            <div className={style.itemAdress}>
                                {i.fromAddress}
                            </div>
                        </div>

                    </div>
                ))
            )
        }


    }

    render() {
        if(!this.props.wallet.current){
            return null
        }
        let data = this.props.wallet.current.balance
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <div>

                    <div className={style.header}>

                        <div className={style.contentContent}>
                            <div className={style.contentPart}>
                                <span className={style.contentPart1}>
                                    <img src={require('./images/BTC.png')} className={style.contentImg} alt=""/>BTC
                                </span>
                                    <span className={style.contentPart2}>
                                        {data.amount}
                                </span>
                                    <span className={style.contentPart3}>
                                    {data.realAmount}CNY
                                        <span className={style.contentPartTip}>
                                           市场价：￥{data.marketPrice}
                                        </span>
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className={style.content}>
                        <div className={style.contentHead}>
                            交易记录
                        </div>
                        <div>
                            {this.show()}
                        </div>
                    </div>
                    <div className={style.footer}>
                        <div className={style.footerL} onClick={()=>hashHistory.push('/forwardBTC/null')}>

                            <img  className={style.itemImg1} src={require('./images/ino.png')} alt=""/>转出

                        </div>
                        <div className={style.footerR} onClick={()=>hashHistory.push('/outQcode')}>

                            <img  className={style.itemImg1} src={require('./images/outi.png')} alt=""/>转入

                        </div>

                    </div>
                </div>

            </div>
        )
    }


}

function mapStateToProps(state, props) {
    return {
        wallet:state.wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
        getWalletTradeRecord: bindActionCreators(getWalletTradeRecord, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
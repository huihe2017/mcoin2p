import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
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
        if(data.length==0){
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
                data.map(i => (

                    <div className={style.item} key={i.num} >
                        <div className={style.itemH}>
                            <div className={style.itemHead}>
                                <div className={style.itemCoin}>
                                    {i.out?<div  className={style.itemT}>
                                        <img className={style.itemImg} src={require('./images/out.png')} alt=""/>转入
                                    </div>:<div style={{color:'#5262ff'}} className={style.itemT}>
                                        <img  className={style.itemImg} src={require('./images/in.png')} alt=""/>转出
                                    </div>}
                                    {i.commission?
                                        <span className={style.commission}>
                                    手续费：{i.commission}BTC
                                </span>:''
                                    }
                                </div>
                            </div>
                            <div className={style.itemDataBox}>
                                <div className={style.itemLeft}>
                                    数量 {i.out?<span style={{color: '#3B3D40',marginLeft:10}}>-{i.number}</span>:<span style={{color: '#3B3D40',marginLeft:10}}>+{i.number}</span>}
                                </div>
                                <div className={style.itemRight}>
                                    <span className={style.itemLeftC}>状态</span> {i.out?<span className={style.itemRightC}>{i.do}</span>:<span className={style.itemRightC}>{i.do}</span>}
                                </div>
                                <div className={style.itemLeft}>
                                    {i.out?'发起':''}{i.out?<span style={{color: '#3B3D40',marginLeft:10}}>{i.time1}</span>:<span style={{color: '#3B3D40',marginLeft:10}}></span>}
                                </div>
                                <div className={style.itemRight}>
                                    <span className={style.itemLeftC}>完成</span> <span className={style.itemRightC}>{i.time}</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.itemAdressBox}>
                            <div className={style.itemAdressT}>
                                地址
                            </div>
                            <div className={style.itemAdress}>
                                {i.address}
                            </div>
                        </div>

                    </div>
                ))
            )
        }


    }

    render() {
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
                                    14.2123411231
                                </span>
                                    <span className={style.contentPart3}>
                                    51.000CNY
                                        <span className={style.contentPartTip}>
                                           市场价：￥51.000
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
                        <div className={style.footerL} onClick={()=>alert('转出')}>
                            <img  className={style.itemImg1} src={require('./images/ino.png')} alt=""/>转出
                        </div>
                        <div className={style.footerR} onClick={()=>alert('转入')}>
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
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
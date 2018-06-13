import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {Progress, InputItem, Toast,Icon,RefreshControl, ListView} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getAssetDetail} from '../../actions/asset'
import ReactDOM from "react-dom";

const data = [
    // {
    //     title: '基金A',
    //     time: 'Meet hotel',
    //     number: '1860684651644',
    //     state:'入金失败',
    //     way:'网银支付'
    // },
    // {
    //     title: '基金B',
    //     time: 'Meet hotel',
    //     number: '1.000000',
    //     state:'+0.000003',
    //     way:'4.23%'
    // },
    // {
    //     title: '基金C',
    //     time: 'Meet hotel',
    //     number: '1.000000',
    //     state:'+0.000003',
    //     way:'4.23%'
    // },{
    //     title: '基金D',
    //     time: 'Meet hotel',
    //     number: '1.000000',
    //     state:'+0.000003',
    //     way:'4.23%'
    // }
];


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 50,
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

    render() {
        const { percent } = this.state;
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <div className={style.header}>
                    <div className={style.headerTop}>
                        <span className={style.headerTopW}>
                            基金名称
                        </span>
                    </div>
                    <div className={style.headerBottom}>
                        <a className={style.user} href="javascript:void (0)">
                            <div className={style.userData}>
                                <span className={style.userName}>
                                    成功买入
                                </span>
                                <span className={style.userTime}>
                                    ￥3.556123
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.plan}>
                        <Progress style={{height:2}} barStyle={{border:'1px solid #5262FF'}} percent={percent} position="normal" />
                    </div>
                    <div className={style.contentC}>
                        <div className={style.contentItem1}>
                            <span className={style.itemTitle}>
                                成交
                            </span>
                            <div className={style.itemCircle}></div>
                            <span className={style.itemTime}>
                                预期时间 06/01
                            </span>
                        </div>
                        <div className={style.contentItem2}>
                            <span className={style.itemTitle}>
                                产生收益
                            </span>
                            <div className={style.itemCircle1}></div>
                            <span className={style.itemTime}>
                                06/01
                            </span>
                        </div>
                        <div className={style.contentItem3}>
                            <span className={style.itemTitle2}>
                                到期
                            </span>
                            <div style={{height:10}}>
                                <div className={style.itemCircle2}></div>
                            </div>
                            <span className={style.itemTime}>
                                07/01
                            </span>
                        </div>
                    </div>
                    <div className={style.button}>
                        查看基金明细
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
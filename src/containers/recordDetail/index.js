import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Icon,RefreshControl, ListView} from 'antd-mobile';
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
                                        买入成功
                                    </span>
                                    <span className={style.userTime}>
                                        ￥122321.0
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                <div className={style.content}>
                        <div className={style.contentItem}>
                            <span className={style.contentItemT}>
                                买入信息
                            </span>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    产品名称
                                </span>
                                <span className={style.contentItemBoxC}>
                                    产品名称>
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    买入币额
                                </span>
                                <span className={style.contentItemBoxC}>
                                    1.0000 BTC
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    买入时间
                                </span>
                                <span className={style.contentItemBoxC}>
                                    2018/12/12  12:00
                                </span>
                            </div>
                        </div>
                        <div className={style.contentItem}>
                            <span className={style.contentItemT}>
                                确认消息
                            </span>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    基金管理费
                                </span>
                                <span className={style.contentItemBoxC}>
                                    1.0000 BTC
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    托管费
                                </span>
                                <span className={style.contentItemBoxC}>
                                    1.0000 BTC
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    销售服务费
                                </span>
                                <span className={style.contentItemBoxC}>
                                    1.0000 BTC
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    确认时间
                                </span>
                                <span className={style.contentItemBoxC}>
                                    2018/12/12  12:00
                                </span>
                            </div>
                        </div>
                        <div className={style.contentItem}>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    订单号
                                </span>
                                <span className={style.contentItemBoxC}>
                                    12813246451684135486461654
                                </span>
                            </div>
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
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Icon, RefreshControl, ListView, NavBar} from 'antd-mobile';
import {bindActionCreators} from 'redux'
import {getTradeDetails} from '../../actions/fund'


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);


        this.state = {};
    }

    componentDidMount() {
        this.props.getTradeDetails({orderId: this.props.params.id})
    }

    getOrderStatus = (num) => {
        if (num === 0) {
            return '待确认'
        }
        if (num === 1) {
            return '正常收益'
        }
        if (num === 2) {
            return '到期待赎回'
        }
        if (num === 3) {
            return '已经赎回'
        }

    }

    render() {

        if (!this.props.fund.tradeDatails) {
            return null
        }
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[]}
                >记录详情</NavBar>
                <div className={style.header}>
                    <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                {this.props.fund.tradeDatails.title}
                            </span>
                    </div>
                    <div className={style.headerBottom}>
                        <a className={style.user} href="javascript:void (0)">
                            <div className={style.userData}>
                                <span className={style.userName}>
                                    {this.getOrderStatus(this.props.fund.tradeDatails.status)}
                                </span>
                                <span className={style.userTime}>
                                    {this.props.fund.tradeDatails.currency} {this.props.fund.tradeDatails.realAmount}
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
                                    {this.props.fund.tradeDatails.title} <img className={style.contentItemBoxCI}
                                                                              src={require('./images/arrow.png')}
                                                                              alt=""/>
                                </span>
                        </div>
                        <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    买入币额
                                </span>
                            <span className={style.contentItemBoxC}>
                                {this.props.fund.tradeDatails.amount} {this.props.fund.tradeDatails.currency}
                                </span>
                        </div>
                        <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    买入时间
                                </span>
                            <span className={style.contentItemBoxC}>
                                    {this.props.fund.tradeDatails.createTime}
                                </span>
                        </div>
                    </div>
                    <div className={style.contentItem}>
                            <span className={style.contentItemT}>
                                确认信息
                            </span>
                        <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    基金管理费
                                </span>
                            <span className={style.contentItemBoxC}>
                                    {this.props.fund.tradeDatails.adminFee} {this.props.fund.tradeDatails.currency}
                                </span>
                        </div>
                        <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    托管费
                                </span>
                            <span className={style.contentItemBoxC}>
                                    {this.props.fund.tradeDatails.trusteeFee} {this.props.fund.tradeDatails.currency}
                                </span>
                        </div>
                        <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    销售服务费
                                </span>
                            <span className={style.contentItemBoxC}>
                                    {this.props.fund.tradeDatails.shoppingFee} {this.props.fund.tradeDatails.currency}
                                </span>
                        </div>
                        <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    确认时间
                                </span>
                            <span className={style.contentItemBoxC}>
                                    {this.props.fund.tradeDatails.confirmTime}
                                </span>
                        </div>
                    </div>
                    <div className={style.contentItem}>
                        <div className={style.contentItemBox}>
                            <span className={style.contentItemBoxT}>
                                订单号
                            </span>
                            <span className={style.contentItemBoxC}>
                                {this.props.fund.tradeDatails.id}
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
        fund: state.fund
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTradeDetails: bindActionCreators(getTradeDetails, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
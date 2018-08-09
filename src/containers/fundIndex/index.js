import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Icon, RefreshControl, ListView, NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getMyFundList} from '../../actions/fund'
import ReactDOM from "react-dom";

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }


    componentDidMount() {
        if (this.props.fund.myFund) {
            return null
        }
        this.props.getMyFundList({
            page: this.state.page,
            // uid: this.props.user.userInfo.uid,
            currency: 'BTC'
        }, () => {

        })
    }


    render() {
        if (!this.props.fund.myFund) {
            return null
        }
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/baseUserMsg')}
                >基金</NavBar>
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                总币额
                            </span>
                            <a className={style.headerTopR} href="javascript:void (0)"
                               onClick={() => Toast.info('敬请期待', 2, null, false)}>
                                切换币种 >
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        {this.props.fund.myFund && this.props.fund.myFund.currency}
                                    </span>
                                    <span className={style.userTime}>
                                        {this.props.fund.myFund && this.props.fund.myFund.userTotalCoin}
                                    </span>
                                </div>
                            </a>
                            <div className={style.userMoney}>
                                <span className={style.userMoneyT}>
                                    昨日收益（{this.props.fund.myFund && this.props.fund.myFund.currency}）<span
                                    className={style.userMoneyC}>+{this.props.fund.myFund && this.props.fund.myFund.userYesterdayProfit}</span>
                                </span>
                                <span className={style.userMoneyT}>
                                    累计收益（{this.props.fund.myFund && this.props.fund.myFund.currency}）<span
                                    className={style.userMoneyC}>+{this.props.fund.myFund && this.props.fund.myFund.userTotalProfit}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.partHeader}>

                        <a className={style.partA} href="javascript:void(0)"
                           onClick={() => hashHistory.push('/earningsDetail/null')}>
                            <img className={style.partImg} src={require('./images/list.png')} alt=""/>
                            收益明细
                        </a>
                        <div className={style.line}>
                        </div>
                        <a className={style.partA} href="javascript:void(0)"
                           onClick={() => hashHistory.push('/dealRecord')}>
                            <img className={style.partImg} src={require('./images/record.png')} alt=""/>
                            交易记录
                        </a>
                    </div>
                    <div hidden={this.props.fund.myFund && this.props.fund.myFund.userProducts.length > 0}>
                        <img className={style.z} src={require('../addressList/images/zero.png')} alt=""/>
                        <span className={style.s}>
                            快去 <Link to={'/selectedFunds'}>基金市场</Link> 挑一下吧
                        </span>
                    </div>
                    <div hidden={!(this.props.fund.myFund && this.props.fund.myFund.userProducts.length) > 0}>
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={(() => {
                                const dataSource = new ListView.DataSource({
                                    rowHasChanged: (row1, row2) => row1 !== row2
                                });
                                return dataSource.cloneWithRows(this.props.fund.myFund.userProducts)
                            })()}
                            renderRow={(rowData, sectionID, rowID) => {

                                const obj = rowData;
                                return (
                                    <div className={style.item} key={rowID}
                                         onClick={() => hashHistory.push('/fundName/' + obj.productId)}>
                    <span className={style.title}>
                        {obj.title}
                        <div className={style.time}>

                        </div>
                    </span>
                                        <div className={style.icontent}>

                                            <div className={style.state}>
                                                <span>币额</span>
                                                <span style={{color: '#3b3d40'}}>{obj.coinCount}</span>
                                            </div>
                                            <div className={style.number}>
                                                <span>昨日收益</span>
                                                <span style={{color: '#F49193'}}>{obj.yesterdayProfit}</span>
                                            </div>
                                            <div className={style.way}>
                                                <span>七日年化</span>
                                                <span style={{color: '#F49193'}}>{obj.rateSeven}%</span>
                                            </div>
                                            <img className={style.arrImg} src={require('./images/arrow.png')} alt=""/>
                                        </div>
                                    </div>
                                );
                            }}
                            renderSeparator={(sectionID, rowID) => (
                                <div
                                    key={`${sectionID}-${rowID}`}
                                    style={{
                                        backgroundColor: '#F5F5F9',
                                        height: 0,
                                        borderTop: '1px solid #ECECED',
                                        borderBottom: '1px solid #ECECED',
                                    }}
                                />
                            )}
                            style={{
                                height: document.documentElement.clientHeight - 201,
                            }}
                            refreshControl={<RefreshControl
                                onRefresh={() => {
                                    // this.props.getBillsList({page: 1}, () => {
                                    //     this.setState({
                                    //         dataSource: this.state.dataSource.cloneWithRows(this.props.asset.bills.list),
                                    //         refreshing: false,
                                    //         showFinishTxt: true,
                                    //     });
                                    // })
                                }}

                            />}
                            onEndReached={() => {
                                if (this.lv.getInnerViewNode().offsetHeight < (document.documentElement.clientHeight + 150)) {
                                    return false
                                }
                                this.setState({page: ++this.state.page}, () => {
                                    this.props.getMyFundList({
                                        page: this.state.page,
                                        currency: 'BTC',
                                        // uid: this.props.user.userInfo.uid
                                    }, () => {
                                    })
                                })

                            }}
                            onEndReachedThreshold={10}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        fund: state.fund,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMyFundList: bindActionCreators(getMyFundList, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
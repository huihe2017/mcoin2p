import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Icon, RefreshControl, ListView, NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getProfitList} from '../../actions/fund'
import ReactDOM from "react-dom";


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }


    componentDidMount() {
        this.props.getProfitList({page: this.state.page,currency: 'BTC', uid: this.props.user.userInfo.uid}, () => {

        })
    }


    render() {
        if (!this.props.fund.profitList) {
            return null
        }
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[]}
                >收益明细</NavBar>
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                累计收益
                            </span>
                            <a className={style.headerTopR} href="javascript:void (0)">
                                <img className={style.headerTopI} src={require('../moneyDetail/images/money.png')}
                                     alt=""/>账户安全险保障中
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        {this.props.fund.profitList && this.props.fund.profitList.currency}
                                    </span>
                                    <span className={style.userTime}>
                                        {this.props.fund.profitList && this.props.fund.profitList.totalProfit}
                                    </span>
                                </div>
                            </a>

                        </div>
                    </div>

                        <div className={style.contentContent}>
                            {this.props.fund.profitList.profitList.length === 0 ? <div>
                                    <img className={style.showImg} src={require('../outAddressList/images/zero.png')}
                                         alt=""/>
                                    <span className={style.showTip}>
                                    暂无数据
                                </span>
                                </div> :
                                <ListView
                                    ref={el => this.lv = el}
                                    dataSource={(() => {
                                        const dataSource = new ListView.DataSource({
                                            rowHasChanged: (row1, row2) => row1 !== row2
                                        });
                                        return dataSource.cloneWithRows(this.props.fund.profitList.profitList)
                                    })()}
                                    renderRow={(rowData, sectionID, rowID) => {
                                        const obj = rowData;
                                        return (
                                            <div className={style.item} key={rowID}>
                                                <div className={style.icontent}>
                                                    <div className={style.state}>
                                                        <span style={{color: '#3b3d40'}}>{obj.profit}</span>
                                                    </div>
                                                    <div className={style.number}>
                            <span
                                style={obj.state > 0 ? {color: '#5262FF'} : {color: '#3B3D40'}}>{obj.profitDate}</span>
                                                    </div>

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
                                        height: document.documentElement.clientHeight,
                                        margin: '0.05rem 0'
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

                                        this.setState({page: ++this.state.page}, () => {
                                            this.props.getProfitList({page: this.state.page,currency: 'BTC', uid: this.props.user.userInfo.uid}, () => {
                                            })
                                        })

                                    }}
                                    onEndReachedThreshold={10}
                                />}
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
        getProfitList: bindActionCreators(getProfitList, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
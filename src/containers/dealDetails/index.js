import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, RefreshControl, NavBar, Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {getWalletTradeRecord} from '../../actions/wallet'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {logout} from '../../actions/user'
import ReactDOM from "react-dom";
import {ListView} from "antd-mobile/lib/index";

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }


    componentDidMount() {
        this.props.getWalletTradeRecord({page: this.state.page, currency: 'BTC'}, () => {

        })
    }


    render() {
        if (!this.props.wallet.current) {
            return null
        }
        return (
            <div className={style.wrap}>

                <div>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => hashHistory.push('/walletIndex')}
                        rightContent={[]}
                    >交易记录</NavBar>
                    <div className={style.header}>

                        <div className={style.contentContent}>
                            <div className={style.contentPart}>
                                <span className={style.contentPart1}>
                                    <img src={require('./images/BTC.png')} className={style.contentImg}
                                         alt=""/>{this.props.wallet.current.balance.currency}
                                </span>
                                <span className={style.contentPart2}>
                                        {this.props.wallet.current.balance.amount}
                                </span>
                                <span className={style.contentPart3}>
                                    {this.props.wallet.current.balance.realAmount}CNY
                                        <span className={style.contentPartTip}>
                                           市场价：￥{this.props.wallet.current.balance.marketPrice}
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

                            {this.props.wallet.current.list.length === 0 ? <div>
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
                                        return dataSource.cloneWithRows(this.props.wallet.current.list)
                                    })()}
                                    renderRow={(rowData, sectionID, rowID) => {
                                        const obj = rowData;

                                        return (
                                            <div className={style.item} key={rowID}>
                                                <div className={style.itemH}>
                                                    <div className={style.itemHead}>
                                                        <div className={style.itemCoin}>
                                                            {obj.type === '转入' ?
                                                                <div style={{color: '#5262ff'}} className={style.itemT}>
                                                                    <img className={style.itemImg}
                                                                         src={require('./images/in.png')} alt=""/>转入
                                                                </div> : <div className={style.itemT}>
                                                                    <img className={style.itemImg}
                                                                         src={require('./images/out.png')} alt=""/>转出
                                                                </div>}
                                                            {obj.minerFee ?
                                                                <span className={style.commission}>
                手续费：{obj.minerFee}BTC
                            </span> : ''
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className={style.itemDataBox}>
                                                        <div className={style.itemLeft}>
                                                            数量 {obj.type === '转出' ?
                                                            <span style={{
                                                                color: '#3B3D40',
                                                                marginLeft: 10
                                                            }}>{obj.amount}</span> :
                                                            <span style={{
                                                                color: '#3B3D40',
                                                                marginLeft: 10
                                                            }}>{obj.amount}</span>}
                                                        </div>
                                                        <div className={style.itemRight}>
                                                            <span className={style.itemLeftC}>状态</span> {obj.out ?
                                                            <span className={style.itemRightC1}>{obj.status}</span> :
                                                            <span className={style.itemRightC1}>{obj.status}</span>}
                                                        </div>
                                                        <div className={style.itemLeft}>
                                                            {obj.type === '转出' ? '发起' : ''}
                                                            {obj.type === '转出' ?
                                                                <span style={{
                                                                    color: '#3B3D40',
                                                                    marginLeft: 10
                                                                }}>{obj.beginTime}</span> :
                                                                <span
                                                                    style={{color: '#3B3D40', marginLeft: 10}}></span>}
                                                        </div>
                                                        <div className={style.itemRight}>
                                                            <span className={style.itemLeftC}>完成</span> <span
                                                            className={style.itemRightC}>{obj.completeTime}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.itemAdressBox}>
                                                    <div className={style.itemAdressT}>
                                                        地址
                                                    </div>
                                                    <div className={style.itemAdress}>
                                                        {obj.fromAddress}
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
                                            this.props.getWalletTradeRecord({
                                                page: this.state.page,
                                                currency: 'BTC'
                                            }, () => {
                                            })
                                        })

                                    }}
                                    onEndReachedThreshold={10}
                                />}
                        </div>
                    </div>
                    <div className={style.footer}>
                        <div className={style.footerL} onClick={() => hashHistory.push('/forwardBTC/null')}>

                            <img className={style.itemImg1} src={require('./images/ino.png')} alt=""/>转出

                        </div>
                        <div className={style.footerR} onClick={() => hashHistory.push('/outQcode')}>

                            <img className={style.itemImg1} src={require('./images/outi.png')} alt=""/>转入

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        wallet: state.wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getWalletTradeRecord: bindActionCreators(getWalletTradeRecord, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
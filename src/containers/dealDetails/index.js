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
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            height: document.documentElement.clientHeight,
        };
    }


    componentDidMount() {

        if (this.lv) {

            setTimeout(() => this.setState({
                height: this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop,
            }), 0);

            // handle https://github.com/ant-design/ant-design-mobile/issues/1588

            this.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
                this.tsPageY = e.touches[0].pageY;
            });
            // In chrome61 `document.body.scrollTop` is invalid
            const scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
            this.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
                this.tmPageY = e.touches[0].pageY;
                if (this.tmPageY > this.tsPageY && this.scrollerTop <= 0 && scrollNode.scrollTop > 0) {
                    console.log('start pull to refresh');
                    this.domScroller.options.preventDefaultOnTouchMove = false;
                } else {
                    this.domScroller.options.preventDefaultOnTouchMove = undefined;
                }
            });
        }
    }

    componentWillUnmount() {
        if (this.lv) {
            this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
            this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
        }

    }

    onScroll = (e) => {
        this.scrollerTop = e.scroller.getValues().top;
        this.domScroller = e;
    };

    genData(pIndex = 0) {
        return this.props.wallet.current.list;
    }

    onRefresh = () => {

        console.log('onRefresh');
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
        } else {
            this.manuallyRefresh = false;
        }

        // simulate initial Ajax

        this.props.getWalletTradeRecord({currency: 'BTC', page: 1}, () => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                showFinishTxt: true,
            });
            if (this.domScroller) {
                this.domScroller.scroller.options.animationDuration = 500;
            }
        })
    };

    onEndReached = (event) => {

        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            console.log(33)
            return;
        }
        console.log('reach end', event);
        this.setState({isLoading: true});
        this.props.getWalletTradeRecord({currency: 'BTC', page: 1}, () => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.genData()),
                isLoading: false,
            });
            if (this.domScroller) {
                this.domScroller.scroller.options.animationDuration = 500;
            }
        })
    };

    scrollingComplete = () => {
        // In general, this.scrollerTop should be 0 at the end, but it may be -0.000051 in chrome61.
        if (this.scrollerTop >= -1) {
            this.setState({showFinishTxt: false});
        }
    }

    renderCustomIcon() {
        return [
            <div key="0" className="am-refresh-control-pull">
                <span>{this.state.showFinishTxt ? '刷新完毕' : '下拉可以刷新'}</span>
            </div>,
            <div key="1" className="am-refresh-control-release">
                <span>松开立即刷新</span>
            </div>,
        ];
    }


    render() {

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 10,
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            const obj = rowData;

            return (
                <div className={style.item} key={rowID}>
                    <div className={style.itemH}>
                        <div className={style.itemHead}>
                            <div className={style.itemCoin}>
                                {obj.type === '转出' ? <div style={{color: '#5262ff'}} className={style.itemT}>
                                    <img className={style.itemImg} src={require('./images/in.png')} alt=""/>转入
                                </div> : <div className={style.itemT}>
                                    <img className={style.itemImg} src={require('./images/out.png')} alt=""/>转出
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
                                <span style={{color: '#3B3D40', marginLeft: 10}}>-{obj.amount}</span> :
                                <span style={{color: '#3B3D40', marginLeft: 10}}>+{obj.amount}</span>}
                            </div>
                            <div className={style.itemRight}>
                                <span className={style.itemLeftC}>状态</span> {obj.out ?
                                <span className={style.itemRightC1}>{obj.status}</span> :
                                <span className={style.itemRightC1}>{obj.status}</span>}
                            </div>
                            <div className={style.itemLeft}>
                                {obj.type === '转出' ? '发起' : ''}{obj.type === '转出' ?
                                <span style={{color: '#3B3D40', marginLeft: 10}}>{obj.beginTime}</span> :
                                <span style={{color: '#3B3D40', marginLeft: 10}}></span>}
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
        };
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
                                         alt=""/>{this.props.wallet.current && this.props.wallet.current.balance.currency}
                                </span>
                                <span className={style.contentPart2}>
                                        {this.props.wallet.current && this.props.wallet.current.balance.amount}
                                </span>
                                <span className={style.contentPart3}>
                                    {this.props.wallet.current && this.props.wallet.current.balance.realAmount}CNY
                                        <span className={style.contentPartTip}>
                                           市场价：￥{this.props.wallet.current && this.props.wallet.current.balance.marketPrice}
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

                            {this.props.wallet.current && this.props.wallet.current.list.length === 0 ? <div>
                                    <img className={style.showImg} src={require('../outAddressList/images/zero.png')}
                                         alt=""/>
                                    <span className={style.showTip}>
                                    暂无数据
                                </span>
                                </div> :


                                <ListView
                                    ref={el => this.lv = el}
                                    dataSource={this.state.dataSource}
                                    renderFooter={() => (<div style={{padding: '0.3rem', textAlign: 'center'}}>
                                        {this.state.isLoading ? '' : ''}
                                    </div>)}
                                    renderRow={row}
                                    renderSeparator={separator}
                                    initialListSize={5}
                                    pageSize={5}
                                    style={{
                                        height: this.state.height,
                                        margin: '0.05rem 0',
                                    }}
                                    scrollerOptions={{scrollbars: true, scrollingComplete: this.scrollingComplete}}
                                    refreshControl={<RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.onRefresh}
                                        icon={this.renderCustomIcon()}
                                    />}
                                    onScroll={this.onScroll}
                                    scrollRenderAheadDistance={200}
                                    scrollEventThrottle={20}
                                    onEndReached={this.onEndReached}
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
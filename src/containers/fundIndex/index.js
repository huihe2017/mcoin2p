import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Icon,RefreshControl, ListView, NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getMyFundList} from '../../actions/fund'
import ReactDOM from "react-dom";


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
        return this.props.fund.myFund.userProducts;
    }

    onRefresh = () => {

        console.log('onRefresh');
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
        } else {
            this.manuallyRefresh = false;
        }

        // simulate initial Ajax

        this.props.getMyFundList({page: 1,uid:this.props.user.userInfo.uid,currency:'BTC'}, () => {
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
        this.props.getMyFundList({page: 1,uid:this.props.user.userInfo.uid,currency:'BTC'}, () => {
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
        let index = this.props.fund.myFund&&this.props.fund.myFund.userProducts.length - 1;

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 10,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {

            const obj = rowData;
            return (
                <div className={style.item} key={rowID} onClick={()=>hashHistory.push('/fundName/'+obj.productId)}>
                    <span className={style.title} >
                        {obj.title}
                        <div className={style.time}>

                        </div>
                    </span>
                    <div className={style.icontent}>

                        <div className={style.state}>
                            <span>币额</span>
                            <span style={{color:'#3b3d40'}}>{obj.coinCount}</span>
                        </div>
                        <div className={style.number}>
                            <span>昨日收益</span>
                            <span style={{color:'#F49193'}}>{obj.yesterdayProfit}</span>
                        </div>
                        <div className={style.way}>
                            <span>七日年化</span>
                            <span style={{color:'#F49193'}}>{obj.rateSeven}</span>
                        </div>
                        <img className={style.arrImg} src={require('./images/arrow.png')} alt=""/>
                    </div>
                </div>
            );
        };
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
                            <a className={style.headerTopR} href="javascript:void (0)">
                                切换币种 >
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        {this.props.fund.myFund&&this.props.fund.myFund.currency}
                                    </span>
                                    <span className={style.userTime}>
                                        {this.props.fund.myFund&&this.props.fund.myFund.userTotalCoin}
                                    </span>
                                </div>
                            </a>
                            <div className={style.userMoney}>
                                <span className={style.userMoneyT}>
                                    昨日收益（{this.props.fund.myFund&&this.props.fund.myFund.currency}）<span className={style.userMoneyC}>+{this.props.fund.myFund&&this.props.fund.myFund.userYesterdayProfit}</span>
                                </span>
                                <span className={style.userMoneyT}>
                                    累计收益（{this.props.fund.myFund&&this.props.fund.myFund.currency}）<span className={style.userMoneyC}>+{this.props.fund.myFund&&this.props.fund.myFund.userTotalProfit}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.partHeader}>

                        <a className={style.partA} href="javascript:void(0)" onClick={()=>hashHistory.push('/recordDetail')}>
                            <img className={style.partImg} src={require('./images/list.png')} alt=""/>
                            收益明细
                        </a>
                        <div className={style.line}>
                        </div>
                        <a className={style.partA} href="javascript:void(0)" onClick={()=>hashHistory.push('/dealRecord')}>
                            <img className={style.partImg} src={require('./images/record.png')} alt=""/>
                            交易记录
                        </a>
                    </div>
                    <div hidden={this.props.fund.myFund&&this.props.fund.myFund.userProducts.length>0}>
                        <img className={style.z} src={require('../addressList/images/zero.png')} alt=""/>
                        <span className={style.s} >
                            快去 <Link to={'/selectedFunds'}>基金市场</Link> 挑一下吧
                        </span>
                    </div>
                    <div hidden={!(this.props.fund.myFund&&this.props.fund.myFund.userProducts.length)>0}>
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource}

                            renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
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
                            scrollerOptions={{ scrollbars: true, scrollingComplete: this.scrollingComplete }}
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
                        />
                    </div>

                </div>
                {/*<Footer/>*/}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        fund:state.fund,
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMyFundList:bindActionCreators(getMyFundList,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
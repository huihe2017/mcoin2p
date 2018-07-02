import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, ListView, RefreshControl, NavBar, Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getFriendAward} from '../../actions/asset'
import {logout} from '../../actions/user'
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
        return this.props.asset.friendWard.awardList;
    }

    onRefresh = () => {

        console.log('onRefresh');
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
        } else {
            this.manuallyRefresh = false;
        }

        // simulate initial Ajax

        this.props.getFriendAward({page: 1}, () => {
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
        this.props.getFriendAward({page: 1}, () => {
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
        let index = this.props.asset.friendWard&&this.props.asset.friendWard.awardList.length - 1;

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 0,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            const obj = rowData;
            return (
                <div className={style.item} key={rowID}>
                    <div className={style.contentPart} onClick={() => hashHistory.push('/friendAwardDetail')}>
                                <span className={style.contentPart1}>
                                    <img src={require('./images/BTC.png')} className={style.contentImg}
                                         alt=""/>{obj.currency}
                                </span>
                        <span className={style.contentPart2}>
                                    {obj.amount}
                                </span>
                        <span className={style.contentPart3}>
                                    ￥{obj.marketValue}
                            <span className={style.contentPart4}>
                                            市场价:￥{obj.marketPrice}
                                        </span>
                                </span>
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

                >点点数字基金</NavBar>
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                累计好友奖励
                            </span>
                            <a className={style.headerTopR} href="javascript:void (0)">
                                <img className={style.headerTopI} src={require('./images/money.png')} alt=""/>账户安全险保障中
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        累计市值 （元）
                                    </span>
                                    <span className={style.userTime}>
                                        {this.props.asset.friendWard && this.props.asset.friendWard.totalAmount}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={style.content}>
                        <div className={style.contentHeader}>
                            <span className={style.contentTitle1}>
                                币种
                            </span>
                            <span className={style.contentTitle2}>
                                数量
                            </span>
                            <span className={style.contentTitle3}>
                                市值
                            </span>
                        </div>
                        <div className={style.contentContent}>
                            {this.props.asset.friendWard && this.props.asset.friendWard.awardList.length === 0 ? <div>
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
                </div>
                {/*<Footer/>*/}
            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {
        asset: state.asset
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFriendAward: bindActionCreators(getFriendAward, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
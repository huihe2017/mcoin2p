import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, RefreshControl, Toast, Tabs, Tag, NavBar, Icon} from 'antd-mobile';
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getTradeListIng} from '../../actions/fund'
// import {StickyContainer, Sticky} from 'react-sticky';
import {ListView} from "antd-mobile/lib/index";
import ReactDOM from "react-dom";
import TradeIng from "../../containers/tradeIng";


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
        return this.props.fund.tradeListIng.list;
    }

    onRefresh = () => {

        console.log('onRefresh');
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
        } else {
            this.manuallyRefresh = false;
        }

        // simulate initial Ajax

        let params = {page: 1}
        if (this.props.id !== 'null') {
            params.productId = this.props.id
        }

        this.props.getTradeListIng(params, () => {
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

        let params = {page: 1}
        if (this.props.id !== 'null') {
            params.productId = this.props.id
        }
        this.props.getTradeListIng(params, () => {
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
                    height: 0,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            const obj = rowData;
            return (
                <Link to={'/recordDetail/' + obj.orderId+'?'+obj.id}>
                    <div key={rowID} style={{padding: '0 15px'}} onClick={() => hashHistory.push('/recordDetail')}>
                        <div className={style.item} key={obj.amount}>
                            <div className={style.itemLeft}>
                                <div className={style.itemLeftH}>
                                <span className={style.itemLeftTime}>
                                    {obj.createDate}
                                </span>
                                    {/*<span style={obj.type == '1' ? {color: '#F49193'} : {color: '#5262ff'}}>*/}
                                    {/*{obj.type}*/}
                                {/*</span>*/}
                                </div>
                                <div className={style.itemLeftB}>
                                <span>
                                    {obj.productTitle}
                                </span>
                                </div>
                            </div>
                            <div className={style.itemRight}>
                            <span className={style.itemRightT}>
                                币额
                            </span>
                                <span className={style.itemRightC}>
                                {obj.amount}
                            </span>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        };
        return (
            <div className={style.wrap}>
                <div>
                    <div className={style.content}>
                        {this.props.fund.tradeListIng && this.props.fund.tradeListIng.length === 0 ? <div>
                                <img className={style.showImg} src={require('../outAddressList/images/zero.png')} alt=""/>
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
                                initialListSize={2}
                                pageSize={5}
                                style={{
                                    height: this.state.height,
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
        getTradeListIng: bindActionCreators(getTradeListIng, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
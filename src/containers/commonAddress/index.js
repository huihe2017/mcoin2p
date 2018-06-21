import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, RefreshControl, Toast, Tabs, WhiteSpace} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getBaseUserMsg} from '../../actions/user'
import {getCommonAddress} from '../../actions/wallet'
import {createForm} from 'rc-form';
import {StickyContainer, Sticky} from 'react-sticky';
import {ListView} from "antd-mobile/lib/index";
import ReactDOM from "react-dom";

const data = [
    {
        num: 1,
        title: 'BTC',
        name: '大大大飞机111',
        address: '1LezCq1NAfdsfbsdkjfksdsasdddddddddsddddddddddsadfsafsadasdasdas',
    },
];

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
        }

    }

    componentDidMount() {
        // if(!this.props.user.token){
        //     return false
        // }
        this.props.getCommonAddress()
        // this.props.getBaseUserMsg({
        //
        // }, (errorText) => {
        //     Toast.hide()
        //     if (errorText) {
        //         Toast.fail(errorText, 3, null, false)
        //     } else {
        //         //hashHistory.push('/')
        //     }
        // })
        // Set the appropriate height
        if(!this.lv){
            return false
        }
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

    componentWillUnmount() {
        this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
        this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
    }

    onScroll = (e) => {
        this.scrollerTop = e.scroller.getValues().top;
        this.domScroller = e;
    };

    onRefresh = () => {
        console.log('onRefresh');
        if (!this.manuallyRefresh) {
            this.setState({ refreshing: true });
        } else {
            this.manuallyRefresh = false;
        }

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                showFinishTxt: true,
            });
            if (this.domScroller) {
                this.domScroller.scroller.options.animationDuration = 500;
            }
        }, 600);
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.rData = [...this.rData,];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1000);
    };

    scrollingComplete = () => {
        // In general, this.scrollerTop should be 0 at the end, but it may be -0.000051 in chrome61.
        if (this.scrollerTop >= -1) {
            this.setState({ showFinishTxt: false });
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

    renderTabBar(props) {
        return (<Sticky>
            {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }
    genData(pIndex = 0) {
        const NUM_ROWS = this.props.wallet.commonAddress.length;
        const dataArr = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
        }
        console.log(dataArr);
        return dataArr;
    }

    render() {
        if (!this.props.wallet.commonAddress) {
            return null
        }



        let pageIndex = 0;

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#f5f4f7',
                    height: 10,
                }}
            />
        );
        let index = this.props.wallet.commonAddress.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = this.props.wallet.commonAddress.length - 1;
            }
            const obj = this.props.wallet.commonAddress[index--];
            return (
                <div className={style.item} key={rowID}>
                    <Link to={'/forwardBTC/'+obj.address}>
                            <div className={style.item1}>
                                <div className={style.itemContent}>
                                    <div className={style.itemCoin}>
                                        <img className={style.itemImg}
                                             src={require('../activityBalance/images/BTC.png')}
                                             alt=""/>{obj.currency}
                                    </div>
                                    <div className={style.itemName}>
                                        {obj.tag}
                                    </div>
                                </div>
                                <div className={style.itemAdressBox}>
                                    <div className={style.itemAdressT}>
                                        地址
                                    </div>
                                    <div className={style.itemAdress}>
                                        {obj.address}
                                    </div>
                                </div>
                            </div>


                    </Link>
                </div>
            );
        };
        return (
            <div className={style.wrap}>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}

                    renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                        {this.state.isLoading ? '加载中...' : ''}
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
        getCommonAddress: bindActionCreators(getCommonAddress, dispatch),
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)
export default BaseUserMsg;
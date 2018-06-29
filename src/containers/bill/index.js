import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Icon,RefreshControl, ListView,NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import {getBillsList} from '../../actions/asset'
import ReactDOM from "react-dom";

const data = [
    {
        number: '2018/01/01',
        state:'+0.000003',
    },
    {
        number: '2018/01/02',
        state:'-0.000003',
    },
    {
        number: '2018/01/03',
        state:'-0.000003',
    },{
        number: '2018/01/04',
        state:'+0.000003',
    }
];
let index = data.length - 1;

const NUM_ROWS = data.length;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    console.log(dataArr);
    return dataArr;
}

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

    componentWillMount(){
        // if(!this.props.user.token){
        //     this.props.setAuthFrom('/history',()=>{
        //         hashHistory.push('/auth')
        //     })
        // }
    }
    componentDidMount() {
        // if(!this.props.user.token){
        //     return false
        // }

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
    genData(pIndex = 0) {
        const NUM_ROWS = this.props.asset.bills && this.props.asset.bills.list.length;
        const dataArr = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
        }
        console.log(dataArr);
        return dataArr;
    }
    onRefresh = () => {
        console.log('onRefresh');
        if (!this.manuallyRefresh) {
            this.setState({ refreshing: true });
        } else {
            this.manuallyRefresh = false;
        }

        // simulate initial Ajax

            this.rData = genData();
            this.props.getBillsList({page: 1}, () => {
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
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        this.props.getBillsList({page: 1}, () => {
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


    render() {
        let index = this.props.asset.bills&&this.props.asset.bills.list.length - 1;

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
            if (index < 0) {
                index = this.props.asset.bills.list.length - 1;
            }
            const obj = this.props.asset.bills.list[index--];
            return (
                <div className={style.item} key={rowID}>
                    
                    <div className={style.contentPart} >
                        <span className={style.contentPart1}>
                            <img src={require('../friendAward/images/BTC.png')} className={style.contentImg} alt=""/>{obj.currency}
                        </span>
                        <span className={style.contentPart2}>
                            <span className={style.contentPart31}>
                                {obj.createDate}
                            </span>
                            <span className={style.contentPart32}>
                                {obj.createDate}
                            </span>
                        </span>
                        <div className={style.contentPart3}>
                            <span className={style.contentPart5}>
                                -{obj.amount}
                            </span>
                            <span className={style.contentPart4}>
                                {obj.remark}
                            </span>
                        </div>
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
                >账单</NavBar>
                <div>
                    <div className={style.content}>
                        <ListView
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource}

                            renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                                {this.state.isLoading ? '加载中...' : '加载完成'}
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
        getBillsList:bindActionCreators(getBillsList,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
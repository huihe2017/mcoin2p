import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { RefreshControl, ListView } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'

const data = [
    {
        title: '入金 +$1000',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'入金失败',
        way:'网银支付'
    },
    {
        title: '出金 -$100',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'出金失败',
        way:'网银支付'
    },
    {
        title: '出金 -$200',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'正在进行',
        way:'网银支付'
    },{
        title: '入金 +$1000',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'入金失败',
        way:'网银支付'
    },
    {
        title: '出金 -$200',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'正在进行',
        way:'网银支付'
    },
    {
        title: '出金 -$100',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'出金失败',
        way:'网银支付'
    },{
        title: '入金 +$1000',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'入金失败',
        way:'网银支付'
    },
    {
        title: '出金 -$100',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'出金失败',
        way:'网银支付'
    },
    {
        title: '出金 -$200',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'正在进行',
        way:'网银支付'
    },{
        title: '入金 +$1000',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'入金失败',
        way:'网银支付'
    },
    {
        title: '出金 -$200',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'正在进行',
        way:'网银支付'
    },
    {
        title: '出金 -$500',
        time: 'Meet hotel',
        number: '1860684651644',
        state:'出金失败',
        way:'网银支付'
    },


];
let index = data.length - 1;

const NUM_ROWS = 10;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    console.log(dataArr);
    return dataArr;
}

class History extends React.Component {

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
    componentWillMount(){
        if(!this.props.user.token){
            this.props.setAuthFrom('/history',()=>{
                hashHistory.push('/auth')
            })
        }
    }
    componentDidMount() {
        if(!this.props.user.token){
            return false
        }
        // Set the appropriate height
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
            this.rData = genData();
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
            this.rData = [...this.rData, ...genData(++pageIndex)];
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

    render() {

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div className={style.item} key={rowID}>
                    <span className={style.title} >
                        {obj.title}
                    </span>
                    <div className={style.icontent}>
                        <div className={style.time}>
                            时间
                            <span>{obj.time}</span>
                        </div>
                        <div className={style.state}>
                            状态
                            <span>{obj.state}</span>
                        </div>
                        <div className={style.number}>
                            单号
                            <span>{obj.number}</span>
                        </div>
                        <div className={style.way}>
                            途径
                            <span>{obj.way}</span>
                        </div>

                    </div>
                </div>
            );
        };
        return (
            <div className={style.wrap}>
                <Header/>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}

                    renderFooter={() => (<div style={{ padding: '0.3rem', textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    initialListSize={5}
                    pageSize={5}
                    style={{
                        height: this.state.height,
                        border: '1px solid #ddd',
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

        );
    }


}

function mapStateToProps(state, props) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthFrom:bindActionCreators(setAuthFrom, dispatch)
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, RefreshControl, Toast,Tabs,Tag,NavBar,Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import {logout} from '../../actions/user'
import { StickyContainer,Sticky } from 'react-sticky';
import {ListView} from "antd-mobile/lib/index";
import ReactDOM from "react-dom";

const data = [
    {
        num:1,
        name: '基金名称A',
        do: '买入',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:2,
        name: '基金名称B',
        do: '自动赎回',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:3,
        name: '基金名称C',
        do: '自动续期',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:3,
        name: '基金名称C',
        do: '自动续期',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:3,
        name: '基金名称C',
        do: '自动续期',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:3,
        name: '基金名称C',
        do: '自动续期',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:3,
        name: '基金名称C',
        do: '自动续期',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:3,
        name: '基金名称C',
        do: '自动续期',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:3,
        name: '基金名称C',
        do: '自动续期',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:3,
        name: '基金名称C',
        do: '自动续期',
        time: '2018/05/23',
        coin:'1.000000'
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

    genData(pIndex = 0) {
        const NUM_ROWS = data.length;
        const dataArr = [];
        for (let i = 0; i < NUM_ROWS; i++) {
            dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
        }
        console.log(dataArr);
        return dataArr;
    }

    render() {
        function  renderTabBar(props) {
            return (<Sticky>
                {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }
        const tabs = [
            { title: '全部' },
            { title: '进行中' },
        ];

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
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID} style={{ padding: '0 15px' }} onClick={()=>hashHistory.push('/recordDetail')}>
                    <div className={style.item} key={obj.num} >
                        <div className={style.itemLeft}>
                            <div className={style.itemLeftH}>
                                <span className={style.itemLeftTime}>
                                    {obj.time}
                                </span>
                                <span style={ obj.do=='自动赎回'?{color:'#F49193'}:{color:'#5262ff'}}>
                                    {obj.do}
                                </span>
                            </div>
                            <div className={style.itemLeftB}>
                                <span>
                                    {obj.name}
                                </span>
                            </div>
                        </div>
                        <div className={style.itemRight}>
                            <span className={style.itemRightT}>
                                币额
                            </span>
                            <span className={style.itemRightC}>
                                {obj.coin}
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
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[


                    ]}
                >交易记录</NavBar>
                <StickyContainer>
                    <Tabs tabs={tabs} initalPage={'t2'} renderTabBar={renderTabBar}
                    >

                        <div className={style.content}>
                            <div className={style.tagBox}>
                                <Tag data-seed="logId">买入</Tag>
                                <Tag data-seed="logId">赎回</Tag>
                                <Tag data-seed="logId">续期</Tag>
                                <Tag data-seed="logId">其他</Tag>
                            </div>
                            <div >
                                {data.length==0?<div>
                                    <img className={style.showImg} src={require('../outAddressList/images/zero.png')} alt=""/>
                                    <span className={style.showTip}>
                        暂无数据
                    </span>
                                </div>:<ListView
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
                                />}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            Content of second tab
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            Content of third tab
                        </div>
                    </Tabs>
                    </StickyContainer>

            </div>
        )
    }


}

function mapStateToProps(state, props) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
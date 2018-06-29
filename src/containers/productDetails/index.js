import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Icon, NavBar, RefreshControl, Tabs, Carousel, Modal, Button} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getAssetDetail} from '../../actions/asset'
import {getFundDetail} from '../../actions/fund'
import ReactDOM from "react-dom";
import {StickyContainer, Sticky} from 'react-sticky';
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


let option = {
    title: {
        text: '',
        subtext: `2018/03/24                   近七日年化：${'+4.7720%'}`
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['最高气温', '最低气温']
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['05-01', '05-05', '05-10', '05-15', '05-20']
    },
    yAxis: {
        type: 'value',
        boundaryGap: false,

    },
    series: [
        {
            name: '买入价格',
            type: 'line',
            data: [11, 13, 13.5, 14, 14.5],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },

    ]
}


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            modal2: false,
        };
    }

    logout() {
        Toast.loading('正在退出', 0)
        this.props.logout({}, (errorText) => {
            Toast.hide()
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            } else {
                hashHistory.push('/')
            }
        })
    }

    componentWillMount() {
        // if(!this.props.user.token){
        //     this.props.setAuthFrom('/history',()=>{
        //         hashHistory.push('/auth')
        //     })
        // }
    }

    renderChat = () => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption(option);
    }

    componentDidMount() {


        this.props.getFundDetail({
            productId: this.props.params.id
        }, () => {
            this.renderChat()
        })

    }


    render() {

        const dataTabs = [
            {title: '近1月'},
            {title: '近2月'},
            {title: '近3月'},
            {title: '近4月'},
            {title: '近5月'},

        ];
        const tabs = [
            {title: '七日年化收益走势'},
            {title: '万分收益'},
        ];

        function renderTabBar(props) {
            return (<Sticky>
                {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }

        if (!this.props.fund.detail) {
            return null
        }
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/selectedFunds')}
                    rightContent={[]}
                >基金详情</NavBar>
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                {this.props.fund.detail.title}
                            </span>
                            <span className={style.headerTopR}>
                                {this.props.fund.detail.period}天期限
                            </span>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                         七日年化收益率
                                    </span>
                                    <span className={style.userTime}>
                                        {this.props.fund.detail.rateSeven}%
                                    </span>
                                </div>
                            </a>
                            <div className={style.userMoney}>

                                <span className={style.userMoneyT}>
                                    万分收益<span className={style.userMoneyC}>{this.props.fund.detail.profitWan}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.chart}>

                        <StickyContainer>
                            <Tabs tabs={tabs}
                                  initalPage={1}
                                  renderTabBar={renderTabBar}
                                  useOnPan={false}
                                  swipeable={false}
                            >
                                <div className={style.box}>
                                    <StickyContainer>
                                        <Tabs tabs={dataTabs}
                                              initalPage={1}
                                              tabBarPosition="bottom" renderTabBar={renderTabBar} useOnPan={false}
                                              swipeable={false}
                                        >
                                            <div id="main" style={{
                                                width: '100%',
                                                height: 240,
                                                padding: '0 16px',
                                                marginBottom: 0,
                                                paddingTop: 10
                                            }}></div>
                                            <div id="main2" style={{
                                                width: '100%',
                                                height: 240,
                                                padding: '0 16px',
                                                marginBottom: 0,
                                                paddingTop: 10
                                            }}></div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '240px',
                                                backgroundColor: '#fff'
                                            }}>
                                                Content of second tab3
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '240px',
                                                backgroundColor: '#fff'
                                            }}>
                                                Content of second tab4
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '240px',
                                                backgroundColor: '#fff'
                                            }}>
                                                Content of second tab5
                                            </div>
                                        </Tabs>
                                    </StickyContainer>


                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '250px',
                                    backgroundColor: '#fff'
                                }}>
                                    Content of second tab
                                </div>
                            </Tabs>
                        </StickyContainer>

                    </div>
                    <div className={style.content}>
                        <div className={style.contentItem}>
                            <span className={style.contentItemT}>
                                买入信息
                            </span>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    起购份额
                                </span>
                                <span className={style.contentItemBoxC}>
                                    {this.props.fund.detail.limitLowAmount}
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    申购费率
                                </span>
                                <span className={style.contentItemBoxC}>
                                    {this.props.fund.detail.shoppingFeeRate}%
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    封闭天数
                                </span>
                                <span className={style.contentItemBoxC}>
                                    {this.props.fund.detail.rateSeven}天
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    订单确认
                                </span>
                                <span className={style.contentItemBoxC}>
                                    {this.props.fund.detail.confirmDesc}
                                </span>
                            </div>
                            {/*<div className={style.contentItemBox}>*/}
                                {/*<span className={style.contentItemBoxT}>*/}
                                    {/*净值确认*/}
                                {/*</span>*/}
                                {/*<span className={style.contentItemBoxC}>*/}
                                    {/*{this.props.fund.detail.confirmDesc}*/}
                                {/*</span>*/}
                            {/*</div>*/}
                        </div>
                        <div className={style.contentItem}>
                            <span className={style.contentItemT}>
                                赎回信息
                            </span>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    赎回费率
                                </span>
                                <span className={style.contentItemBoxC}>
                                    {this.props.fund.detail.redeemFeeRate}%
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    到账时间
                                </span>
                                <span className={style.contentItemBoxC}>
                                    {this.props.fund.detail.redeemDesc}
                                </span>
                            </div>

                        </div>

                    </div>
                </div>
                <div className={style.button} onClick={() => hashHistory.push('/productBuying')}>
                    立即申购
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
        getFundDetail: bindActionCreators(getFundDetail, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
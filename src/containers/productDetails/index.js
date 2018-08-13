import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Icon, NavBar, RefreshControl, Tabs, Carousel, Modal, Button} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {toChartData} from '../../common/util'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getAssetDetail} from '../../actions/asset'
import {getFundDetail, getFundChart} from '../../actions/fund'
import ReactDOM from "react-dom";
import {StickyContainer, Sticky} from 'react-sticky';
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            modal2: false,
            option: {
                productId: this.props.params.id,
                unit: 'month',
                n: 1,
                type: 1,
            }
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

        let option = {
            title: {
                text: '',
                subtext: `2018/03/24                   近七日年化：${'+4.7720%'}`
            },
            tooltip: {
                trigger: 'axis',
                formatter:this.state.option.type === 1 ?'{b}<br />{c}%':'{b}<br />{c}'
            },
            legend: {
                data: ['最高价格', '最低价格'],
                formatter: function (name) {
                    return  name+'%';
                }
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
                data: toChartData(this.props.fund.detail.chart).profitDate
                // data: ['05-01', '05-05', '05-10', '09-15', '05-20']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: this.state.option.type === 1 ?'{value}%':'{value}'
                },
                boundaryGap: false,

            },
            lineStyle:{
                color:'#5262ff'
            },
            series: [
                {
                    // name: '买入价格',
                    type: 'line',
                    // itemStyle: {
                    //     normal: {
                    //         label: {
                    //             show: true,
                    //             // position: 'top',
                    //             formatter: '{c}%'
                    //         }
                    //     }
                    // },

                    itemStyle:{
                        borderColor:'#5262ff'
                    },

                    // data: [0.11, 0.13, 0.135, 0.14, 0.1405],
                    data: this.state.option.type === 1 ? toChartData(this.props.fund.detail.chart).rateSeven: toChartData(this.props.fund.detail.chart).profitWan,
                },

            ]
        }

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption(option);
    }

    getChart = () => {
        this.props.getFundChart({
            ...this.state.option
        }, () => {
            this.renderChat()
        })
    }

    componentDidMount() {
        this.props.getFundDetail({
            productId: this.props.params.id
        }, () => {
            this.getChart()
        })

    }


    render() {

        const dataTabs = [
            {title: '近1月'},
            {title: '近3月'},
            {title: '近6月'},
            {title: '1年'},
            {title: '3年'},

        ];
        const tabs = [
            {title: '七日年化收益走势'},
            {title: '万份收益'},
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
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
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
                                    万份收益 <span className={style.userMoneyC}> {this.props.fund.detail.currency} {this.props.fund.detail.profitWan}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={style.chart}>

                        <StickyContainer>
                            <Tabs tabs={tabs}
                                  onChange={(tab, index) => {
                                      this.setState({option: {...this.state.option, ...{type: index === 0 ? 1 : 2}}}, () => {
                                          this.getChart()
                                      })

                                  }}
                                  initalPage={1}
                                  renderTabBar={renderTabBar}
                                  useOnPan={false}
                                  swipeable={false}
                            >
                                {/*<div className={style.box}>*/}
                                {/*<StickyContainer>*/}
                                {/*<Tabs tabs={dataTabs}*/}
                                {/*initalPage={1}*/}
                                {/*tabBarPosition="bottom" renderTabBar={renderTabBar} useOnPan={false}*/}
                                {/*swipeable={false}*/}
                                {/*>*/}
                                {/*<div id="main" style={{*/}
                                {/*width: '100%',*/}
                                {/*height: 240,*/}
                                {/*padding: '0 16px',*/}
                                {/*marginBottom: 0,*/}
                                {/*paddingTop: 10*/}
                                {/*}}></div>*/}
                                {/*<div id="main2" style={{*/}
                                {/*width: '100%',*/}
                                {/*height: 240,*/}
                                {/*padding: '0 16px',*/}
                                {/*marginBottom: 0,*/}
                                {/*paddingTop: 10*/}
                                {/*}}></div>*/}
                                {/*<div style={{*/}
                                {/*display: 'flex',*/}
                                {/*alignItems: 'center',*/}
                                {/*justifyContent: 'center',*/}
                                {/*height: '240px',*/}
                                {/*backgroundColor: '#fff'*/}
                                {/*}}>*/}
                                {/*Content of second tab3*/}
                                {/*</div>*/}
                                {/*<div style={{*/}
                                {/*display: 'flex',*/}
                                {/*alignItems: 'center',*/}
                                {/*justifyContent: 'center',*/}
                                {/*height: '240px',*/}
                                {/*backgroundColor: '#fff'*/}
                                {/*}}>*/}
                                {/*Content of second tab4*/}
                                {/*</div>*/}
                                {/*<div style={{*/}
                                {/*display: 'flex',*/}
                                {/*alignItems: 'center',*/}
                                {/*justifyContent: 'center',*/}
                                {/*height: '240px',*/}
                                {/*backgroundColor: '#fff'*/}
                                {/*}}>*/}
                                {/*Content of second tab5*/}
                                {/*</div>*/}
                                {/*</Tabs>*/}
                                {/*</StickyContainer>*/}
                                {/*</div>*/}

                                {/*<div style={{*/}
                                {/*display: 'flex',*/}
                                {/*alignItems: 'center',*/}
                                {/*justifyContent: 'center',*/}
                                {/*height: '250px',*/}
                                {/*backgroundColor: '#fff'*/}
                                {/*}}>*/}
                                {/*Content of second tab*/}
                                {/*</div>*/}
                            </Tabs>
                        </StickyContainer>

                        <div id="main" style={{
                            width: '100%',
                            height: 240,
                            padding: '0 16px',
                            marginBottom: 0,
                            paddingTop: 10
                        }}></div>


                        <div className={style.box}>
                            <StickyContainer>
                                <Tabs tabs={dataTabs}
                                      onChange={(tab, index) => {
                                          let n, unit
                                          if (index === 0) {
                                              n = 1
                                              unit = 'month'
                                          }
                                          if (index === 1) {
                                              n = 3
                                              unit = 'month'
                                          }
                                          if (index === 2) {
                                              n = 6
                                              unit = 'month'
                                          }
                                          if (index === 3) {
                                              n = 1
                                              unit = 'year'
                                          }
                                          if (index === 4) {
                                              n = 3
                                              unit = 'year'
                                          }
                                          this.setState({option: {...this.state.option, ...{n, unit}}}, () => {
                                              this.getChart()
                                          })

                                      }}
                                      initalPage={1}
                                      tabBarPosition="bottom" renderTabBar={renderTabBar} useOnPan={false}
                                      swipeable={false}
                                >
                                    {/*<div id="main" style={{*/}
                                    {/*width: '100%',*/}
                                    {/*height: 240,*/}
                                    {/*padding: '0 16px',*/}
                                    {/*marginBottom: 0,*/}
                                    {/*paddingTop: 10*/}
                                    {/*}}></div>*/}
                                    {/*<div id="main2" style={{*/}
                                    {/*width: '100%',*/}
                                    {/*height: 240,*/}
                                    {/*padding: '0 16px',*/}
                                    {/*marginBottom: 0,*/}
                                    {/*paddingTop: 10*/}
                                    {/*}}></div>*/}
                                    {/*<div style={{*/}
                                    {/*display: 'flex',*/}
                                    {/*alignItems: 'center',*/}
                                    {/*justifyContent: 'center',*/}
                                    {/*height: '240px',*/}
                                    {/*backgroundColor: '#fff'*/}
                                    {/*}}>*/}
                                    {/*Content of second tab3*/}
                                    {/*</div>*/}
                                    {/*<div style={{*/}
                                    {/*display: 'flex',*/}
                                    {/*alignItems: 'center',*/}
                                    {/*justifyContent: 'center',*/}
                                    {/*height: '240px',*/}
                                    {/*backgroundColor: '#fff'*/}
                                    {/*}}>*/}
                                    {/*Content of second tab4*/}
                                    {/*</div>*/}
                                    {/*<div style={{*/}
                                    {/*display: 'flex',*/}
                                    {/*alignItems: 'center',*/}
                                    {/*justifyContent: 'center',*/}
                                    {/*height: '240px',*/}
                                    {/*backgroundColor: '#fff'*/}
                                    {/*}}>*/}
                                    {/*Content of second tab5*/}
                                    {/*</div>*/}
                                </Tabs>
                            </StickyContainer>
                        </div>

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
                                    {this.props.fund.detail.limitLowAmount} {this.props.fund.detail.currency}
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
                                    {this.props.fund.detail.period}天
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    购买信息
                                </span>
                                <span className={style.contentItemBoxC}>
                                    <pre>{this.props.fund.detail.confirmDesc}</pre>
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
                                    赎回信息
                                </span>
                                <span className={style.contentItemBoxC}>
                                    <pre>{this.props.fund.detail.redeemDesc}</pre>
                                </span>
                            </div>

                        </div>

                    </div>
                </div>
                <div className={style.button} onClick={() => {
                    if(this.props.user.token){
                        hashHistory.push('/productBuying')
                    }else {
                        hashHistory.push('/auth')
                    }

                }}>
                    立即申购
                </div>

            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        fund: state.fund,
        user: state.user

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getFundDetail: bindActionCreators(getFundDetail, dispatch),
        getFundChart: bindActionCreators(getFundChart, dispatch)

    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, NavBar, Toast, Icon, RefreshControl, Tabs, Carousel, Modal, Button} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getMyFundDetails, setAutoRenew, getFundChart} from '../../actions/fund'
import ReactDOM from "react-dom";
import {StickyContainer, Sticky} from 'react-sticky';
import echarts from 'echarts/lib/echarts';
import {filter} from "../../common/util";

import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {toChartData} from "../../common/util";

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            modal2: false,
            xu: true,
            xu1: true
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

    componentDidMount() {

        this.props.getMyFundDetails({productId: this.props.params.id}, () => {
// 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '累计盈亏',
                    subtext: `累计收益：` + this.props.fund.myFundDetails.totalProfit
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
                    data:toChartData(this.props.fund.myFundDetails.userProfitChartList).profitDate.map(function (str) {
                        return str
                        //return str.slice(5)
                    })
                    // data: ['05-01', '05-05', '05-10', '05-15', '05-20']
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: false,

                },
                series: [
                    {
                        name: '买入价格',
                        type: 'line',
                        // data: [11, 13, 13.5, 14, 14.5],
                        data:toChartData(this.props.fund.myFundDetails.userProfitChartList).totalProfit,
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
            });
        })


    }

    getarr(e) {
        let subArrayNum = 3;
        var dataArr = new Array(Math.ceil(e.length / subArrayNum));
        for (let i = 0; i < dataArr.length; i++) {
            dataArr[i] = new Array();
            for (let j = 0; j < subArrayNum; j++) {
                dataArr[i][j] = '';
            }
        }
        for (let i = 0; i < e.length; i++) {
            dataArr[parseInt(i / subArrayNum)][i % subArrayNum] = e[i];
        }
        console.log(dataArr);

        return dataArr
    }

    renderChat = () => {

        let option = {

            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['最高价格', '最低价格']
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
                data: toChartData(this.props.fund.myFundDetails.chart).profitDate
                // data: ['05-01', '05-05', '05-10', '09-15', '05-20']
            },
            yAxis: {
                type: 'value',
                boundaryGap: false,

            },
            series: [
                {
                    name: '买入价格',
                    type: 'line',
                    // data: [11, 13, 13.5, 14, 140.5],
                    data:toChartData(this.props.fund.myFundDetails.chart).rateSeven,
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

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main2'));
        // 绘制图表
        myChart.setOption(option);
    }

    render() {
        if (!this.props.fund.myFundDetails) {
            return null
        }
        const tabs = [
            {title: '累计盈亏'},
            {title: '七日年化收益走势'},
        ];

        function renderTabBar(props) {
            return (<Sticky>
                {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }
        // let filterData = filter(this.props.fund.myFund.userProducts, this.props.fund.myFundDetails.productId,'productId')
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}

                >{this.props.fund.myFundDetails.title}</NavBar>
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                持有币额
                            </span>
                            <span className={style.headerTopR}>
                                收益率 {this.props.fund.myFundDetails.rateSeven}%
                            </span>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                         BTC
                                    </span>
                                    <span className={style.userTime}>
                                        {this.props.fund.myFundDetails.coinCount}
                                    </span>
                                </div>
                            </a>
                            <div className={style.userMoney}>

                                <span className={style.userMoneyT}>
                                    昨日收益 (BTC)    <span
                                    className={style.userMoneyC}> +{this.props.fund.myFundDetails.yesterdayProfit}</span>
                                </span>
                                <span className={style.userMoneyT}>
                                    持有收益 (BTC)   <span
                                    className={style.userMoneyC}> +{this.props.fund.myFundDetails.totalProfit}</span>
                                </span>

                            </div>
                        </div>
                    </div>
                    <div className={style.partHeader}>

                        <a className={style.partA} href="javascript:void(0)"
                           onClick={() => hashHistory.push('/earningsDetail/'+this.props.params.id)}><img className={style.partImg}
                                                                                    src={require('./images/list.png')}
                                                                                    alt=""/>
                            收益明细
                        </a>
                        <div className={style.line}>
                        </div>
                        <a className={style.partA} href="javascript:void(0)"
                           onClick={() => hashHistory.push('/dealRecord/'+this.props.params.id)}>
                            <img className={style.partImg} src={require('./images/record.png')} alt=""/>
                            交易记录
                        </a>
                    </div>
                    <div className={this.props.fund.myFundDetails.activeUserOrderInfoList.length<3?(style.banner + ' '+style.list):(style.banner)}>
                        <Carousel
                            autoplay={false}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >


                            {
                                this.getarr(this.props.fund.myFundDetails.activeUserOrderInfoList).map((v) => {
                                    return <div className={style.bannerItem}
                                                key={2}
                                                style={{display: 'inline-block', width: '100%', height: 117}}
                                    >

                                        {v.map((o) => {

                                            if (o != '') {
                                                return <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                            {o.orderDesc}
                                        </span>
                                                    <span className={style.bannerAR} style={o.status === 0 ? {
                                                        color: '#989898',
                                                        cursor: 'not-allowed'
                                                    } : {}} onClick={() => o.status === 0 ? '' : this.setState({
                                                        modal2: true,
                                                        current: {orderId: o.orderId, autoRenew: o.autoRenew}
                                                    })}>
                                                        {/*{o.status}*/}
                                                        {/*{this.state.xu1?'自动续期':'自动赎回'}*/}
                                                        {o.autoRenew === 1 ? '自动续期' : '自动赎回'}
                                                        <img src={require('./images/arrow.png')}
                                                             className={style.bannerARI}
                                                             alt=""/>
                                        </span>
                                                </a>
                                            }

                                        })}


                                    </div>
                                })
                            }


                        </Carousel>
                    </div>
                    <div className={style.chart}>
                        <div className={style.chartBox}>
                            <StickyContainer>
                                <Tabs tabs={tabs}
                                      initalPage={'t2'}
                                      renderTabBar={renderTabBar}
                                      onChange={(v, i) => {
                                          if (i === 1) {
                                              let option = {
                                                  productId: this.props.params.id,
                                                  unit: 'month',
                                                  n: 1,
                                                  type: 1,
                                              }
                                              this.props.getFundChart({...option}, () => {
                                                  this.renderChat()
                                              })
                                          }
                                      }}
                                >
                                    <div className={style.box}>
                                        <div id="main" style={{
                                            width: '100%',
                                            height: 230,
                                            padding: '0 16px',
                                            marginBottom: '-20px',
                                            paddingTop: 10
                                        }}></div>

                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '250px',
                                        backgroundColor: '#fff'
                                    }}>
                                        <div id="main2" style={{
                                            width: '100%',
                                            height: 230,
                                            padding: '0 16px',
                                            marginBottom: '-20px',
                                            paddingTop: 10
                                        }}></div>
                                    </div>
                                </Tabs>
                            </StickyContainer>
                        </div>

                        <div className={style.bottomA}>
                            <Link to={'/productDetails/' + this.props.fund.myFundDetails.productId}>
                                查看基金详情
                            </Link>
                        </div>

                    </div>
                </div>

                {this.state.current ? <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={() => this.setState({
                        modal2: false,
                    })}
                    animationType="slide-up"
                >
                    <List className="popup-list">
                        {[<div onClick={() => {
                            this.setState({
                                current: {autoRenew: 1, orderId: this.state.current.orderId}
                            })
                        }}>
                            <div className={style.ititle}>自动续期 <span
                                hidden={this.state.current.autoRenew === 1 ? false : true}
                                className={style.ititle1}>当前选择</span></div>
                            <div
                                className={style.icontent}>到期后本金及收益自动买入下一期，收益不间断。到期前一天15：00前均可更改。
                            </div>
                        </div>, <div onClick={() => {
                            this.setState({
                                current: {
                                    autoRenew: 0,
                                    orderId: this.state.current.orderId
                                }
                            })
                        }}>
                            <div className={style.ititle}>自动赎回 <span
                                hidden={(this.state.current.autoRenew === 0 ? false : true)}
                                className={style.ititle1}>当前选择</span></div>
                            <div className={style.icontent}>到期后本金及收益回到活动余币。到期前一天15：00前均可改。</div>
                        </div>].map((i, index) => (
                            <List.Item key={index}>{i}</List.Item>
                        ))}
                        <List.Item>
                            <div className={style.button}>
                                <Button type="primary" onClick={() => {

                                    this.props.setAutoRenew({
                                        ...this.state.current
                                    }, () => {
                                        this.props.getMyFundDetails({productId: this.props.params.id})
                                    })

                                    this.setState({
                                        modal2: false
                                    })
                                }}>确认</Button>
                            </div>

                        </List.Item>
                    </List>
                </Modal> : null}


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
        getMyFundDetails: bindActionCreators(getMyFundDetails, dispatch),
        getFundChart: bindActionCreators(getFundChart, dispatch),
        setAutoRenew: bindActionCreators(setAutoRenew, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
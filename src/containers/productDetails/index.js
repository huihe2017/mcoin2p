import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Icon,RefreshControl, Tabs,Carousel,Modal,Button} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getAssetDetail} from '../../actions/asset'
import ReactDOM from "react-dom";
import { StickyContainer, Sticky } from 'react-sticky';
import echarts from 'echarts/lib/echarts';

import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

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
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '',
                subtext: `2018/03/24                   近七日年化：${'+4.7720%'}`
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['最高气温','最低气温']
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
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['05-01','05-05','05-10','05-15','05-20']
            },
            yAxis: {
                type: 'value',
                boundaryGap: false,

            },
            series: [
                {
                    name:'买入价格',
                    type:'line',
                    data:[11, 13, 13.5, 14, 14.5],
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
    }


    render() {

        const dataTabs = [
            { title: '近1月' },
            { title: '近2月' },
            { title: '近3月' },
            { title: '近4月' },
            { title: '近5月' },

        ];
        const tabs = [
            { title: '七日年化收益走势' },
            { title: '千分收益' },
        ];
        function renderTabBar(props) {
            return (<Sticky>
                {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                持有币额
                            </span>
                            <span className={style.headerTopR}>
                                收益率 3.43%
                            </span>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        BTC
                                    </span>
                                    <span className={style.userTime}>
                                        3.556123
                                    </span>
                                </div>
                            </a>
                            <div className={style.userMoney}>
                                <span className={style.userMoneyT}>
                                    昨日收益（BTC）<span className={style.userMoneyC}>+0.00004</span>
                                </span>
                                <span className={style.userMoneyT}>
                                    累计收益（BTC）<span className={style.userMoneyC}>+0.00004</span>
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
                                              tabBarPosition="bottom" renderTabBar={renderTabBar} useOnPan={false} swipeable={false}
                                        >
                                    <div id="main" style={{ width: '100%', height: 240 ,padding:'0 16px',marginBottom:0,paddingTop:10}}></div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', backgroundColor: '#fff' }}>
                                                Content of second tab2
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', backgroundColor: '#fff' }}>
                                                Content of second tab3
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', backgroundColor: '#fff' }}>
                                                Content of second tab4
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', backgroundColor: '#fff' }}>
                                                Content of second tab5
                                            </div>
                                        </Tabs>
                                    </StickyContainer>


                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
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
                                    产品名称
                                </span>
                                <span className={style.contentItemBoxC}>
                                    产品名称>
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    买入币额
                                </span>
                                <span className={style.contentItemBoxC}>
                                    1.0000 BTC
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    买入时间
                                </span>
                                <span className={style.contentItemBoxC}>
                                    2018/12/12  12:00
                                </span>
                            </div>
                        </div>
                        <div className={style.contentItem}>
                            <span className={style.contentItemT}>
                                确认消息
                            </span>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    基金管理费
                                </span>
                                <span className={style.contentItemBoxC}>
                                    1.0000 BTC
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    托管费
                                </span>
                                <span className={style.contentItemBoxC}>
                                    1.0000 BTC
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    销售服务费
                                </span>
                                <span className={style.contentItemBoxC}>
                                    1.0000 BTC
                                </span>
                            </div>
                            <div className={style.contentItemBox}>
                                <span className={style.contentItemBoxT}>
                                    确认时间
                                </span>
                                <span className={style.contentItemBoxC}>
                                    2018/12/12  12:00
                                </span>
                            </div>
                        </div>
                        <div className={style.contentItem}>
                            <div className={style.contentItemBox}>
                            <span className={style.contentItemBoxT}>
                                订单号
                            </span>
                                <span className={style.contentItemBoxC}>
                                12813246451684135486461654
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.button}>
                    立即申购
                </div>
                {/*<Footer/>*/}
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
        getAssetDetail:bindActionCreators(getAssetDetail,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Icon,RefreshControl, Tabs,Carousel,Modal,Button} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getMyFundDetails} from '../../actions/fund'
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
            xu:true,
            xu1:true
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
                text: '累计盈亏',
                subtext: `累计收益：${14.47}`
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
        const tabs = [
            { title: '累计盈亏' },
            { title: '七日年化收益走势' },
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

                                <span className={style.userMoneyT} >
                                    昨日收益 (BTC)    <span className={style.userMoneyC}> +0.00004</span>
                                </span>
                                <span className={style.userMoneyT} >
                                    持有收益 (BTC)   <span className={style.userMoneyC}> +0.00004</span>
                                </span>

                            </div>
                        </div>
                    </div>
                    <div className={style.partHeader}>

                        <a className={style.partA} href="javascript:void(0)" onClick={()=>hashHistory.push('/earningsDetail')}><img className={style.partImg} src={require('./images/list.png')} alt=""/>
                            收益明细
                        </a>
                        <div className={style.line}>
                        </div>
                        <a className={style.partA} href="javascript:void(0)" onClick={()=>hashHistory.push('/recordDetail')}>
                                <img className={style.partImg} src={require('./images/record.png')} alt=""/>
                            交易记录
                        </a>
                    </div>
                    <div className={style.banner}>
                        <Carousel
                            autoplay={false}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >

                                <div className={style.bannerItem}
                                    key={1}
                                    style={{ display: 'inline-block', width: '100%', height: 117 }}
                                >
                                    <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                           06-02买入的将在14天后到期
                                        </span>
                                        <span className={style.bannerAR} onClick={()=>this.setState({
                                            modal2: true,
                                        })}>
                                            {this.state.xu1?'自动续期':'自动赎回'}
                                            <img src={require('./images/arrow.png')} className={style.bannerARI} alt=""/>
                                        </span>
                                    </a>
                                    <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                           06-02买入的将在14天后到期
                                        </span>
                                        <span className={style.bannerAR}>
                                           自动续期
                                            <img src={require('./images/arrow.png')} className={style.bannerARI} alt=""/>
                                        </span>
                                    </a>
                                    <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                           06-02买入的将在14天后到期
                                        </span>
                                        <span className={style.bannerAR}>
                                           自动续期
                                            <img src={require('./images/arrow.png')} className={style.bannerARI} alt=""/>
                                        </span>
                                    </a>
                                    <Modal
                                        popup
                                        visible={this.state.modal2}
                                        onClose={()=>this.setState({
                                            modal2: false,
                                        })}
                                        animationType="slide-up"
                                    >
                                        <List className="popup-list">
                                            {[<div onClick={()=>{this.setState({xu:true
                                            })}}><div className={style.ititle}>自动续期 <span hidden={!this.state.xu} className={style.ititle1}>当前选择</span></div><div className={style.icontent}>到期后本金及收益自动买入下一期，收益不间断。到期前一天15：00前均可更改。</div></div>, <div onClick={()=>{this.setState({xu:false})}}><div className={style.ititle}>自动续回 <span hidden={this.state.xu} className={style.ititle1}>当前选择</span></div><div className={style.icontent}>到期后本金及收益回到活动余币。到期前一天15：00前均可改。</div></div>].map((i, index) => (
                                                <List.Item key={index}>{i}</List.Item>
                                            ))}
                                            <List.Item>
                                                <div className={style.button}>
                                                    <Button type="primary" onClick={()=>this.setState({
                                                        modal2: false,
                                                        xu1:this.state.xu
                                                    })}>确认</Button>
                                                </div>

                                            </List.Item>
                                        </List>
                                    </Modal>
                                </div>
                                <div className={style.bannerItem}
                                    key={2}
                                    style={{ display: 'inline-block', width: '100%', height: 117 }}
                                >
                                    <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                           06-02买入的将在14天后到期
                                        </span>
                                        <span className={style.bannerAR}>
                                           自动续期
                                            <img src={require('./images/arrow.png')} className={style.bannerARI} alt=""/>
                                        </span>
                                    </a>
                                    <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                           06-02买入的将在14天后到期
                                        </span>
                                        <span className={style.bannerAR}>
                                           自动续期
                                            <img src={require('./images/arrow.png')} className={style.bannerARI} alt=""/>
                                        </span>
                                    </a>
                                    <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                           06-02买入的将在14天后到期
                                        </span>
                                        <span className={style.bannerAR}>
                                           自动续期
                                            <img src={require('./images/arrow.png')} className={style.bannerARI} alt=""/>
                                        </span>
                                    </a>
                                </div>
                                <div className={style.bannerItem}
                                    key={3}
                                    style={{ display: 'inline-block', width: '100%', height: 117 }}
                                >
                                    <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                           06-02买入的将在14天后到期
                                        </span>
                                        <span className={style.bannerAR}>
                                           自动续期
                                            <img src={require('./images/arrow.png')} className={style.bannerARI} alt=""/>
                                        </span>
                                    </a>
                                    <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                           06-02买入的将在14天后到期
                                        </span>
                                        <span className={style.bannerAR}>
                                           自动续期
                                            <img src={require('./images/arrow.png')} className={style.bannerARI} alt=""/>
                                        </span>
                                    </a>
                                    <a className={style.bannerA} href="javascript:void (0)">
                                        <span className={style.bannerAL}>
                                           06-02买入的将在14天后到期
                                        </span>
                                        <span className={style.bannerAR}>
                                           自动续期
                                            <img src={require('./images/arrow.png')} className={style.bannerARI} alt=""/>
                                        </span>
                                    </a>
                                </div>

                        </Carousel>
                    </div>
                    <div className={style.chart}>
                        <StickyContainer>
                            <Tabs tabs={tabs}
                                  initalPage={'t2'}
                                  renderTabBar={renderTabBar}
                            >
                                <div className={style.box}>
                                    <div id="main" style={{ width: '100%', height: 230 ,padding:'0 16px',marginBottom:'-20px',paddingTop:10}}></div>

                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                                    Content of second tab
                                </div>
                            </Tabs>
                        </StickyContainer>
                        <div className={style.bottomA} onClick={()=>hashHistory.push('/productDetails/1')}>
                            查看基金详情
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    return {
        fund:state.fund
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMyFundDetails:bindActionCreators(getMyFundDetails,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
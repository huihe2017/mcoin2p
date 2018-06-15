import React from 'react'
import style from './index.css'
import {Button} from 'antd-mobile'
import Header from '../../components/header'
import {hashHistory} from 'react-router'
import Footer from '../../components/footer'
import {connect} from 'react-redux'
import Circle from 'react-circle';

const data=[
        {
            yieldRate:15.98,
            name:'基金名称A',
            underline:0.5,
            time:30,
            percent:0,
            up:false
        },{
            yieldRate:12.98,
            name:'基金名称B',
            underline:0.5,
            time:50,
            percent:50,
            up:true
        },{
            yieldRate:14.98,
            name:'基金名称C',
            underline:0.5,
            time:60,
            percent:90,
            up:true
        },
    ]

class Home extends React.Component {
    speedAccound() {console.log('444',this.props.user)
        this.props.user.token ? hashHistory.push('/speedAccount') : hashHistory.push('/auth')
    }

    render() {
        return (
            <div className={style.wrap}>

                <div className={style.fund}>
                    <div  className={style.fundTitle}>
                        精选基金
                    </div>
                    <div className={style.fundContent}>
                        {
                            data.map( i => (
                                <div className={style.contentItem}>
                                    <div className={style.fundHeader}>
                                        <span className={style.fundHeaderBox}>
                                            <div className={style.fundHeaderT}>{i.name}</div>
                                            <div className={style.span}>
                                                {i.underline}BTC起购
                                            </div>

                                        </span>

                                    </div>
                                    <div className={style.contentItemHeader}>

                                        <div className={style.contentItemName}>

                                            <div className={style.yieldRateBox}>
                                                <span className={style.yieldRate}>
                                                    {i.yieldRate}
                                                </span>%
                                            </div>
                                            <div className={style.yieldRateTip}>
                                                七日年化收益率
                                            </div>
                                        </div>
                                        <div className={style.contentItemName1}>
                                            <div className={style.yieldRateBox1}>
                                                <span className={style.yieldRate1}>
                                                    {i.time}
                                                </span>天
                                            </div>
                                            <div className={style.yieldRateTip}>
                                                期限 {i.share}
                                            </div>
                                        </div>
                                        <div className={style.circleBox}>
                                            <div className={style.circle}>
                                                {
                                                    i.up?<Circle
                                                        size={80}
                                                        progress={i.percent}
                                                        progress={i.percent}
                                                    />:<div className={style.cir}>
                                                        敬请期待 <br/>
                                                        ...
                                                    </div>
                                                }


                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home
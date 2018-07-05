import React from 'react'
import style from './index.css'
import {Button,NavBar,Icon} from 'antd-mobile'
import Header from '../../components/header'
import {hashHistory} from 'react-router'
import Footer from '../../components/footer'
import {getFundList} from '../../actions/fund'
import {connect} from 'react-redux'
import Circle from 'react-circle';
import {bindActionCreators} from 'redux'


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

     componentDidMount(){
         this.props.getFundList()
     }

    render() {

        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/')}
                    rightContent={[

                    ]}
                >精选基金</NavBar>
                <div className={style.fund}>

                    <div className={style.fundContent}>
                        {
                            this.props.fund.list&&this.props.fund.list.map( i => (
                                <div className={style.contentItem} onClick={()=>hashHistory.push('/productDetails/'+i.id)}>
                                    <div className={style.fundHeader}>
                                        <span className={style.fundHeaderBox}>
                                            <div className={style.fundHeaderT}>{i.title}</div>
                                            <div className={style.span}>
                                                {i.limitLowAmount}BTC起购
                                            </div>

                                        </span>

                                    </div>
                                    <div className={style.contentItemHeader}>

                                        <div className={style.contentItemName}>

                                            <div className={style.yieldRateBox}>
                                                <span className={style.yieldRate}>
                                                    {i.rateSeven}
                                                </span>%
                                            </div>
                                            <div className={style.yieldRateTip}>
                                                七日年化收益率
                                            </div>
                                        </div>
                                        <div className={style.contentItemName1}>
                                            <div className={style.yieldRateBox1}>
                                                <span className={style.yieldRate1}>
                                                    {i.period}
                                                </span>天
                                            </div>
                                            <div className={style.yieldRateTip}>
                                                期限
                                            </div>
                                        </div>
                                        <div className={style.circleBox}>
                                            <div className={style.circle}>
                                                {/*{*/}
                                                    {/*i.rateSeven?<Circle*/}
                                                        {/*size={80}*/}
                                                        {/*progress={i.rateSeven}*/}
                                                        {/*progress={i.rateSeven}*/}
                                                    {/*/>:<div className={style.cir}>*/}
                                                        {/*敬请期待 <br/>*/}
                                                        {/*...*/}
                                                    {/*</div>*/}
                                                {/*}*/}
                                                <div className={style.cir1}>
                                                    开放申购
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
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
        getFundList:bindActionCreators(getFundList,dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home
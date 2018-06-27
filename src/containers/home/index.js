import React from 'react'
import style from './index.css'
import {Button, Carousel} from 'antd-mobile'
import Header from '../../components/header'
import {getIndexData} from '../../actions/indexPage'
import {hashHistory, Link} from 'react-router'
import Footer from '../../components/footer'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const data = [
    {
        yieldRate: 15.98,
        name: '新手特权基金',
        share: 1
    }, {
        yieldRate: 14.98,
        name: '基金一号',
        share: 100
    }, {
        yieldRate: 11.98,
        name: '基金二号',
        share: 40
    },
]

class Home extends React.Component {
    speedAccound() {
        console.log('444', this.props.user)
        this.props.user.token ? hashHistory.push('/speedAccount') : hashHistory.push('/auth')
    }

    componentDidMount() {
        this.props.getIndexData()
    }

    render() {
        if (!this.props.indexPage.notices) {
            return null
        }
        return (
            <div className={style.wrap}>
                <div className={style.header}>
                    {this.props.indexPage.notices.map((obj) => {
                        return <div className={style.headerItem}>
                        <span className={style.headerItemImg}>
                            公告
                        </span>
                            <span className={style.headerItemContent}>
                                <Link to={'/informationDetails'}><b>{obj.title}</b></Link>
                        </span>
                        </div>
                    })}


                </div>
                <div >
                    <Carousel

                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {[1,1,1,1,1].map(val => (

                            <img className={style.banner}
                                src={'http://img3.imgtn.bdimg.com/it/u=1149214208,1692303621&fm=214&gp=0.jpg'
                                }


                            />

                        ))}
                    </Carousel>
                </div>
                <div className={style.fund}>
                    <div className={style.fundHeader}>
                        <span className={style.fundHeaderT}>
                            精选基金推荐
                        </span>
                        <a className={style.fundHeaderA} href="javascript:void (0)"
                           onClick={() => hashHistory.push('/selectedFunds')}>查看更多 <img
                            className={style.fundHeaderImg} src={require('../moneyDetail/images/arrow.png')} alt=""/>
                        </a>
                    </div>
                    <div className={style.fundContent}>
                        {
                            this.props.indexPage.funds.map(i => (
                                <div className={style.contentItem}>
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
                                            <span className={style.yieldRate1}>
                                                {i.title}
                                            </span>
                                            <div className={style.yieldRateTip}>
                                                最低申购份额 {i.limitLowAmount}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.contentItemContent}>
                                        {
                                            i.tag.map((obj) => {
                                                return <div className={style.span}>
                                                    {obj}
                                                </div>
                                            })
                                        }

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Footer home={true}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user,
        indexPage: state.indexPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getIndexData: bindActionCreators(getIndexData, dispatch)
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home
import React from 'react'
import style from './index.css'
import {Button,Carousel} from 'antd-mobile'
import Header from '../../components/header'
import {hashHistory} from 'react-router'
import Footer from '../../components/footer'
import {connect} from 'react-redux'

const data=[
        {
            yieldRate:15.98,
            name:'新手特权基金',
            share:1
        },{
            yieldRate:14.98,
            name:'基金一号',
            share:100
        },{
            yieldRate:11.98,
            name:'基金二号',
            share:40
        },
    ]

class Home extends React.Component {
    speedAccound() {console.log('444',this.props.user)
        this.props.user.token ? hashHistory.push('/speedAccount') : hashHistory.push('/auth')
    }

    render() {
        return (
            <div className={style.wrap}>
                <div className={style.header}>
                    <div className={style.headerItem}>
                        <span className={style.headerItemImg}>
                            公告
                        </span>
                        <span className={style.headerItemContent}>
                            <b>标题内容：</b>内容哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈...
                        </span>
                    </div>
                    <div className={style.headerItem}>
                        <span className={style.headerItemImg}>
                            公告
                        </span>
                        <span className={style.headerItemContent}>
                            <b>标题内容：</b>内容哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈...
                        </span>
                    </div>
                    <div className={style.headerItem}>
                        <span className={style.headerItemImg}>
                            公告
                        </span>
                        <span className={style.headerItemContent}>
                            <b>标题内容：</b>内容哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈...
                        </span>
                    </div>
                </div>
                <div className={style.banner1}>
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        <div className={style.banner}>

                        </div>
                        <div className={style.banner}>

                        </div>
                    </Carousel>
                </div>
                <div className={style.fund}>
                    <div className={style.fundHeader}>
                        <span className={style.fundHeaderT}>
                            精选基金推荐
                        </span>
                        <a className={style.fundHeaderA} href="javascript:void (0)">查看更多 <img className={style.fundHeaderImg} src={require('../moneyDetail/images/arrow.png')} alt=""/> </a>
                    </div>
                    <div className={style.fundContent}>
                        {
                            data.map( i => (
                                <div className={style.contentItem}>
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
                                            <span className={style.yieldRate1}>
                                                {i.name}
                                            </span>
                                            <div className={style.yieldRateTip}>
                                                最低申购份额 {i.share}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.contentItemContent}>
                                        <div className={style.span}>
                                            7天赎回
                                        </div>
                                        <div className={style.span}>
                                            零费率
                                        </div>
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
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home
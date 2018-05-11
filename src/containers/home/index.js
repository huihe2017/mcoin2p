import React from 'react'
import style from './index.css'
import {Button} from 'antd-mobile'
import Header from '../../components/header'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux'

class Home extends React.Component {
    speedAccound() {console.log('444',this.props.user)
        this.props.user.token ? hashHistory.push('/speedAccount') : hashHistory.push('/auth')
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header/>
                <header className={style.header}>
                    <div className={style.button}>
                        <Button onClick={this.speedAccound.bind(this)} className="btn" type="primary"
                                style={{width: '130px', height: '50px', lineHeight: '50px'}}>极速开户</Button>
                    </div>
                </header>
                <section className={style.content}>
                    <div className={style.advantage}>
                        <ul>
                            <li className={style.adv}>
                                <div className={style.advi1}></div>
                                <div className={style.advp}>
                                    <p className={style.advtitle}>
                                        资质合规
                                    </p>
                                </div>
                            </li>
                            <li className={style.adv}>
                                <div className={style.advi2}></div>
                                <div className={style.advp}>
                                    <p className={style.advtitle}>
                                        实力雄厚
                                    </p>
                                </div>
                            </li>
                            <li className={style.adv}>
                                <div className={style.advi3}></div>
                                <div className={style.advp}>
                                    <p className={style.advtitle}>
                                        佣金实惠
                                    </p>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div className={style.mt4}>
                        <div className={style.mt4logo}></div>
                        <div className={style.download}>
                            <a className={style.but} href="javascript:void (0);">
                                <div className={style.phlogo1}>

                                </div>
                                <span>
                                    iOS下载
                                </span>
                            </a>
                            <a className={style.but} href="javascript:void (0);">
                                <div className={style.phlogo2}>

                                </div>
                                <span>
                                    Android下载
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className={style.partner}>
                        <span className={style.partitle}>
                            合作伙伴/
                        </span>
                        <ul>
                            <li className={style.parlogo}></li>
                            <li className={style.parlogo}></li>
                            <li className={style.parlogo}></li>
                            <li className={style.parlogo}></li>
                            <li className={style.parlogo}></li>
                            <li className={style.parlogo}></li>
                        </ul>
                    </div>
                </section>
                <footer className={style.footer}>
                    <nav className={style.fnav}>
                        <ul>
                            <li>
                                <a href="javascript:void (0)">用户协议</a>
                            </li>
                            <li>
                                <a href="javascript:void (0)">隐私条款</a>
                            </li>
                            <li>
                                <a href="javascript:void (0)">监管信息</a>
                            </li>
                            <li>
                                <a href="javascript:void (0)">免责声明</a>
                            </li>
                        </ul>
                    </nav>
                    <section className={style.fcontent}>
                        <p>
                            风险提示：外汇交易存在较高风险，不适合所有投资者。决定参与交易前，您应该谨慎考虑您的投资目标、经验等级及风险承受能力。您可能会亏损部分或者全部资金，如果您有任何疑问，可在必要时向独立的金融顾问征询意见。</p>
                        <p>客服邮箱：info@dolphinforex.com 客服电话：400-8530-050</p>
                        <div className={style.fline}></div>
                        <p>Union Capital Market Limited 是已经在新西兰政府注册的金融服务提供商，海豚匯為Union Capital Market Limited的註冊商標,
                            服务于个人和机构投资者。</p>
                        <p>地址：Flat Bush, Auckland, 2016, NZ</p>
                    </section>
                </footer>
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
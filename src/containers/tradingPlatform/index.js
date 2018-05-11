import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank} from 'antd-mobile';
import Header from '../../components/header'

class TradingPlatform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header/>
                <header className={style.header}>
                    <p className={style.htitle}>
                        交易平台
                    </p>
                    <span className={style.description}>
                        Meta Trader4
                    </span>
                </header>
                <section className={style.content}>
                    <p>
                        海豚汇为您免费提供由迈达克公司研发的交易软件Meta Trader 4。MT4是全球最流行的交易软件，在行业内享有领导地位，为交易者提供24小时即时货币报价，让您随时掌握报价行情。
                    </p>
                    <p>
                        MT4提供几十种系统默认的技术指标，投资者亦可指定或加入自己的技术指标，配合完善的高级图标分析工具，对行情走势进行分析，有效的帮助投资者进行投资分析，并作出英明决策，掌握每一个交易时机。
                    </p>
                    <p>
                        海豚汇免费为您提供PC、安卓、ios多版本的MT4，随时随地连上网络即可交易。
                    </p>
                </section>
            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

TradingPlatform = connect(mapStateToProps, mapDispatchToProps)(TradingPlatform)


export default TradingPlatform;
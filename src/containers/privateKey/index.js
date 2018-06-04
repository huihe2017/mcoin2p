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
                <div className={style.notice}>
                    <span className={style.noticeT}>
                        注意
                    </span>
                    <span className={style.noticeC}>
                        拥有私钥就能完全控制该地址的资产，不要分享给任何人
                    </span>
                </div>
                <div className={style.content}>
                    <div className={style.contentT}>
                        以下是BTC的地址和私钥，点击可复制
                    </div>
                    <div className={style.contentC}>
                        <div className={style.contentPart}>
                            <span className={style.contentPartT}>地址</span>
                            <span className={style.contentPartC}>
                                1LezCq1NAfdsfbsdkjfksdsasdddddddddsdsdsdsdsddsadfsafsadasdasdas
                            </span>
                        </div>
                        <div className={style.contentPart}>
                            <span className={style.contentPartT}>私钥</span>
                            <span className={style.contentPartC}>
                                1LezCq1NAfdsfbsdkjfksdsasdddddddddsdsdsdsdsddsadfsafsadasdasdas
                            </span>
                        </div>
                    </div>
                </div>
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
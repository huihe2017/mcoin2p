import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {Progress, InputItem, Toast,Icon,RefreshControl, ListView} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getAssetDetail} from '../../actions/asset'
import ReactDOM from "react-dom";


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 100,
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

    render() {
        const { percent } = this.state;
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <span className={style.header}>
                    八成私募认为CDR对市场抽血效应有限，点赞数字点点基金，字数超过的时候用...代替...
                </span>
                <span className={style.time}>
                    点点平台  发表于10小时前
                </span>
                <span className={style.content}>
                    Susquehanna分析师Shyam Patil在投资者备忘录中表示，阿里巴巴正在“吃下”中国电商市场的剩余份额，公司在整个2018财年取得了显著的用户增长，而这种增长有望持续到2019年。长久以来，阿里巴巴拥有多种渠道来推动广告营收的持续强劲增长，预计公司未来将维持这种增长方式。
                </span>
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
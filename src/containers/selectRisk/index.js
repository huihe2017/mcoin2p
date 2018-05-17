import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { RefreshControl, ListView } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory,Link} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {bindActionCreators} from 'redux'



class History extends React.Component {

    constructor(props) {
        super(props);



        this.state = {

        };
    }


    render() {

        return (
            <div className={style.wrap}>
                <Header/>
                <div className={style.wrapContent}>
                    <span className={style.header}>
                        请选择适合您的理财方式
                    </span>
                    <div className={style.content}>
                        <Link to={'/riskType'}>
                            <a className={style.aBox} href="javascript:void (0)">
                                <div className={style.aLeft}>
                                    <span className={style.aTitle}>
                                        进取型
                                    </span>
                                    <span className={style.aContent}>
                                        收益与风险并存，投资收益相对较高，整体波动较大
                                    </span>
                                </div>
                                <img className={style.aImg} src={require('../setPerson/images/arrow.png')} alt=""/>
                            </a>
                        </Link>
                        <Link to={'/riskType'}>
                            <a className={style.aBox} href="javascript:void (0)">
                                <div className={style.aLeft}>
                                    <span className={style.aTitle}>
                                        成长型
                                    </span>
                                    <span className={style.aContent}>
                                        收益中等，可承受少量风险，稳中求涨
                                    </span>
                                </div>
                                <img className={style.aImg} src={require('../setPerson/images/arrow.png')} alt=""/>
                            </a>
                        </Link>
                        <Link to={'/riskType'}>
                            <a className={style.aBox} href="javascript:void (0)">
                                <div className={style.aLeft}>
                                    <span className={style.aTitle}>
                                        保守型
                                    </span>
                                    <span className={style.aContent}>
                                        收益较低，稳保本金为主
                                    </span>
                                </div>
                                <img className={style.aImg} src={require('../setPerson/images/arrow.png')} alt=""/>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

        );
    }


}

function mapStateToProps(state, props) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthFrom:bindActionCreators(setAuthFrom, dispatch)
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;
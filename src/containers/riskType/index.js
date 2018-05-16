import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { RefreshControl, ListView } from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory} from 'react-router'
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
                        成长型
                    </span>
                    <div className={style.content}>
                        <div className={style.icoBox}>
                            <span className={style.icoText}>
                                收益需求<i></i>
                            </span>
                            <img className={style.icoImg} src={require('./images/active.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/active.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/active.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>

                        </div>
                        <div className={style.icoBox}>
                            <span className={style.icoText}>
                                实际风险承担<i></i>
                            </span>
                            <img className={style.icoImg} src={require('./images/active.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/active.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                        </div>
                        <div className={style.icoBox}>
                            <span className={style.icoText}>
                                心理风险接受<i></i>
                            </span>
                            <img className={style.icoImg} src={require('./images/active.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/active.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/active.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                        </div>
                        <div className={style.icoBox}>
                            <span className={style.icoText}>
                                流动需求<i></i>
                            </span>
                            <img className={style.icoImg} src={require('./images/active.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                            <img className={style.icoImg} src={require('./images/mo.png')} alt=""/>
                        </div>
                        <div className={style.contentText}>
                            在成长类型下，数字货币托管团队会优先推荐您风险系数较低，
                            收益适当的资产托管类型
                        </div>
                    </div>
                    <div className={style.but}>
                        <button className={style.button}>
                            重新选择
                        </button>
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
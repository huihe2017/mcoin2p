import React from 'react'
import style from "./index.css"
import Star from '../../components/star/index'
import {connect} from 'react-redux'
import {RefreshControl, ListView} from 'antd-mobile';
import Header from '../../components/header'
import ReactDOM from 'react-dom'
import {hashHistory, Link} from 'react-router'
import {setRiskType,riskPage} from '../../actions/user'
import {bindActionCreators} from 'redux'

const star=[{one:2,two:2,three:2,four:2,five:2},{one:3,two:3,three:3,four:3,five:3},{one:4,two:4,three:4,four:4,five:4}]

class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profit: 0,
            riskTaking: 0,
            heartTaking: 0,
            flowDemand: 0,
        };
    }
    componentWillUnmount(){
        this.props.riskPage('get',0)
    }
    ratingChanged = (newRating) => {
        console.log(newRating)
    }

    showType(e){
        if(e==0){
            return '进取型'
        }else if(e==1){
            return '成长型'
        }else if(e==2){
            return '保守型'
        }
    }


    render() {

        return (
            <div className={style.wrap}>
                <div className={style.wrapContent}>
                    <span className={style.header}>
                        {this.showType(this.props.user.userInfo.riskType)}
                    </span>

                    <div className={style.content}>
                        <div className={style.icoBox}>
                            <span className={style.icoText}>
                                收益需求<i></i>
                            </span>

                            <Star
                                rank={0}
                                limit={5}
                                onRank={(n) => {
                                    this.setState({profit: n})
                                }}
                            />

                        </div>
                        <div className={style.icoBox}>
                            <span className={style.icoText}>
                                实际风险承担<i></i>
                            </span>
                            <Star
                                rank={0}
                                limit={5}
                                onRank={(n) => {
                                    this.setState({riskTaking: n})
                                }}
                            />
                        </div>
                        <div className={style.icoBox}>
                            <span className={style.icoText}>
                                心理风险接受<i></i>
                            </span>
                            <Star
                                rank={0}
                                limit={5}
                                onRank={(n) => {
                                    this.setState({heartTaking: n})
                                }}
                            />
                        </div>
                        <div className={style.icoBox}>
                            <span className={style.icoText}>
                                流动需求<i></i>
                            </span>
                            <Star
                                rank={0}
                                limit={5}
                                onRank={(n) => {
                                    this.setState({flowDemand: n})
                                }}
                            />
                        </div>
                        <div className={style.contentText}>
                            在成长类型下，数字货币托管团队会优先推荐您风险系数较低，
                            收益适当的资产托管类型
                        </div>
                    </div>
                    <div className={style.but}>
                        <a onClick={() => {
                            if (this.props.user.userInfo.ristPage === 'set') {
                                this.props.setRiskType({
                                    profit: this.state.profit,
                                    riskTaking: this.state.riskTaking,
                                    heartTaking: this.state.heartTaking,
                                    flowDemand: this.state.flowDemand,
                                    type: this.props.user.userInfo.riskType
                                }, () => {
                                    hashHistory.push('/setPerson')
                                })
                            }else {
                                hashHistory.push('/selectRisk')
                            }
                            return false
                        }} >
                            <button className={style.button}>
                                {this.props.user.userInfo.ristPage === 'set'?'确定':'重新选择'}
                            </button>
                        </a>
                    </div>
                </div>
            </div>

        );
    }


}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setRiskType: bindActionCreators(setRiskType, dispatch),
        riskPage: bindActionCreators(riskPage, dispatch)
    }
}

History = connect(mapStateToProps, mapDispatchToProps)(History)


export default History;
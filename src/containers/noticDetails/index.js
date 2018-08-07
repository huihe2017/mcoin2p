import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {Progress, InputItem, Toast, Icon, RefreshControl, ListView, NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getNoticDetails} from '../../actions/notice'
import ReactDOM from "react-dom";


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 100,
        };
    }

    componentDidMount() {
        this.props.getNoticDetails({
            id: this.props.params.id
        })
    }

    render() {

        if (!this.props.notice.noticeDetails[this.props.params.id]) {
            return null
        }
        const {percent} = this.state;
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}

                >{this.props.notice.noticeDetails[this.props.params.id].title}</NavBar>
                {/*<span className={style.header}>*/}
                    {/*八成私募认为CDR对市场抽血效应有限，点赞数字点点基金，字数超过的时候用...代替...*/}
                {/*</span>*/}
                <span className={style.time}>
                    {this.props.notice.noticeDetails.author} {this.props.notice.noticeDetails[this.props.params.id].createTime}
                </span>
                <span className={style.content}>
                {this.props.notice.noticeDetails[this.props.params.id].content}
                </span>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        notice: state.notice
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNoticDetails: bindActionCreators(getNoticDetails, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
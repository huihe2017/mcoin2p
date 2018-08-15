import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {Progress, InputItem, Toast, Icon, RefreshControl, ListView, NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getInformationDetails} from '../../actions/information'
import ReactDOM from "react-dom";


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 100,
        };
    }

    componentDidMount() {
        this.props.getInformationDetails({
            id: this.props.params.id
        })
    }

    render() {

        if (!this.props.information.infosDetails[this.props.params.id]) {
            return null
        }
        const {percent} = this.state;
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}

                >{this.props.information.infosDetails[this.props.params.id].title}</NavBar>
                <span className={style.header}>
                    {this.props.information.infosDetails[this.props.params.id].title}
                </span>
                <span className={style.time}>
                    {this.props.information.infosDetails[this.props.params.id].author} {this.props.information.infosDetails.createTime}
                </span>
                <div className={style.content} dangerouslySetInnerHTML = {{ __html:this.props.information.infosDetails[this.props.params.id].content }}>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        information: state.information
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getInformationDetails: bindActionCreators(getInformationDetails, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
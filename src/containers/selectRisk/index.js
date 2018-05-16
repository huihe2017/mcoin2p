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
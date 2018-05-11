import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { Button } from 'antd-mobile';
import { Link} from 'react-router';
import Header from '../../components/header'


class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className={style.wrap}>
                <Header/>
                <img src={require(`./images/${this.props.params.status}.png`)} alt="icon"/>
                <span className={style.rtitle}>
                    {this.props.params.title}
                </span>
                <p className={style.rcontent}>
                    {this.props.params.describe}
                </p>
                <div className={style.but}>
                    <Link to={this.props.params.path}>
                        确认
                    </Link>
                </div>
            </div>
        )

    }
}

function mapStateToProps(state, props) {
    return {
        params:state.resultsPage
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

ResultsPage = connect(mapStateToProps, mapDispatchToProps)(ResultsPage)


export default ResultsPage;
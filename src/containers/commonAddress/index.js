import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Tabs, WhiteSpace } from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getBaseUserMsg} from '../../actions/user'
import { createForm } from 'rc-form';
import { StickyContainer, Sticky } from 'react-sticky';

const data = [
    {
        num:1,
        title: 'BTC',
        name: '大大大飞机',
        address: '1LezCq1NAfdsfbsdkjfksdsasdddddddddsddddddddddsadfsafsadasdasdas',
    },
];

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        // this.props.getBaseUserMsg({
        //
        // }, (errorText) => {
        //     Toast.hide()
        //     if (errorText) {
        //         Toast.fail(errorText, 3, null, false)
        //     } else {
        //         //hashHistory.push('/')
        //     }
        // })

    }
    renderTabBar(props) {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    render() {

        const tabs = [
            { title: '全部' },
            { title: 'TOKEN' },
            { title: 'BCH' },
            { title: 'ETC' },
            { title: 'ETH' },

        ];
        return (
            <div className={style.wrap}>

                <div className={style.tab}>
                    <div className={style.item} key={data[0].num} >

                        <div className={style.itemContent}>
                            <div className={style.itemCoin}>
                                <img className={style.itemImg} src={require('../activityBalance/images/BTC.png')} alt=""/>{data[0].title}
                            </div>
                            <div className={style.itemName}>
                                {data[0].name}
                            </div>
                        </div>
                        <div className={style.itemAdressBox}>
                            <div className={style.itemAdressT}>
                                地址
                            </div>
                            <div className={style.itemAdress}>
                                {data[0].address}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)
export default BaseUserMsg;
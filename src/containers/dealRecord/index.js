import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Tabs,Tag} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import {logout,getBaseUserMsg} from '../../actions/user'
import { StickyContainer,Sticky } from 'react-sticky';

const data = [
    {
        num:1,
        name: '基金名称A',
        do: '买入',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:2,
        name: '基金名称B',
        do: '自动赎回',
        time: '2018/05/23',
        coin:'1.000000'
    },{
        num:3,
        name: '基金名称C',
        do: '自动续期',
        time: '2018/05/23',
        coin:'1.000000'
    },


];

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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

    show(){
        if(data.length==0){
            return(
                <div>
                    <img className={style.showImg} src={require('../addressList/images/zero.png')} alt=""/>
                    <span className={style.showTip}>
                        暂无数据
                    </span>
                </div>
            )
        }else {
            return(
                <div className={style.itemBox}>
                    {data.map(i => (

                        <div className={style.item} key={i.num} >
                            <div className={style.itemLeft}>
                                <div className={style.itemLeftH}>
                                    <span className={style.itemLeftTime}>
                                        {i.time}
                                    </span>
                                    <span style={ i.do=='自动赎回'?{color:'#F49193'}:{color:'#5262ff'}}>
                                        {i.do}
                                    </span>
                                </div>
                                <div className={style.itemLeftB}>
                                    <span>
                                        {i.name}
                                    </span>
                                </div>
                            </div>
                            <div className={style.itemRight}>
                                <span className={style.itemRightT}>
                                    币额
                                </span>
                                <span className={style.itemRightC}>
                                    {i.coin}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }


    }



    render() {
        function  renderTabBar(props) {
            return (<Sticky>
                {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }
        const tabs = [
            { title: '全部' },
            { title: '进行中' },
        ];
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}

                <StickyContainer>
                    <Tabs tabs={tabs} initalPage={'t2'} renderTabBar={renderTabBar}
                    >

                        <div className={style.content}>
                            <div className={style.tagBox}>
                                <Tag data-seed="logId">买入</Tag>
                                <Tag data-seed="logId">赎回</Tag>
                                <Tag data-seed="logId">续期</Tag>
                                <Tag data-seed="logId">其他</Tag>
                            </div>
                            <div >
                                {this.show()}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            Content of second tab
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            Content of third tab
                        </div>
                    </Tabs>
                    </StickyContainer>

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
        logout: bindActionCreators(logout, dispatch),
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
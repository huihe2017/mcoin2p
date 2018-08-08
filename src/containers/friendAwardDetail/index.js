import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Icon,RefreshControl, ListView,NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import {getAwardDetails} from '../../actions/asset'
import ReactDOM from "react-dom";


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }


    componentDidMount() {
        if (this.props.asset.awardDetails) {
            return null
        }
        this.props.getAwardDetails({page: this.state.page,currency:'BTC'}, () => {

        })
    }


    render() {
        if (!this.props.asset.awardDetails) {
            return null
        }
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/friendAward')}

                >好友奖励明细</NavBar>
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                累计好友奖励明细
                            </span>
                            <a className={style.headerTopR} href="javascript:void (0)">
                                <img className={style.headerTopI} src={require('../moneyDetail/images/money.png')} alt=""/>账户安全险保障中
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        BTC
                                    </span>
                                    <span className={style.userTime}>
                                        {this.props.asset.awardDetails.totalAmount}
                                    </span>
                                </div>
                            </a>

                        </div>
                    </div>
                    <div className={style.content}>

                        {this.props.asset.awardDetails.list.length === 0 ? <div>
                                <img className={style.showImg} src={require('../outAddressList/images/zero.png')}
                                     alt=""/>
                                <span className={style.showTip}>
                                    暂无数据
                                </span>
                            </div> :
                                <ListView
                                    ref={el => this.lv = el}
                                    dataSource={(() => {
                                        const dataSource = new ListView.DataSource({
                                            rowHasChanged: (row1, row2) => row1 !== row2
                                        });
                                        return dataSource.cloneWithRows(this.props.asset.awardDetails.list)
                                    })()}
                                    renderRow={(rowData, sectionID, rowID) => {
                                        const obj = rowData;

                                        return (
                                            <div className={style.item} key={rowID}>
                                                <div className={style.icontent}>
                                                    <div className={style.number}>
                                                        <span style={obj.state>0?{color:'#5262FF'}:{color:'#3B3D40'}}>{obj.time}</span>
                                                    </div>
                                                    <div className={style.state}>
                                                        <span style={{color:'#3b3d40'}}>{obj.amount}</span>
                                                    </div>


                                                </div>
                                            </div>
                                        );
                                    }}
                                    renderSeparator={(sectionID, rowID) => (
                                        <div
                                            key={`${sectionID}-${rowID}`}
                                            style={{
                                                backgroundColor: '#F5F5F9',
                                                height: 0,
                                                borderTop: '1px solid #ECECED',
                                                borderBottom: '1px solid #ECECED',
                                            }}
                                        />
                                    )}
                                    style={{
                                        height: document.documentElement.clientHeight,
                                    }}
                                    refreshControl={<RefreshControl
                                        onRefresh={() => {
                                            // this.props.getBillsList({page: 1}, () => {
                                            //     this.setState({
                                            //         dataSource: this.state.dataSource.cloneWithRows(this.props.asset.bills.list),
                                            //         refreshing: false,
                                            //         showFinishTxt: true,
                                            //     });
                                            // })
                                        }}

                                    />}
                                    onEndReached={() => {
                                        if (this.lv.getInnerViewNode().offsetHeight < (document.documentElement.clientHeight + 150)) {
                                            return false
                                        }
                                        this.setState({page: ++this.state.page}, () => {
                                            this.props.getAwardDetails({page: this.state.page,currency:'BTC'}, () => {
                                            })
                                        })

                                    }}
                                    onEndReachedThreshold={10}
                                />}
                        </div>

                    </div>
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
        getAwardDetails:bindActionCreators(getAwardDetails,dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
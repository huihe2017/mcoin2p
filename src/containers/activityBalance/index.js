import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, RefreshControl, NavBar, Icon} from 'antd-mobile';
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {logout} from '../../actions/user'
import {ListView} from "antd-mobile/lib/index";
import ReactDOM from "react-dom";
import {getAssetDetail} from '../../actions/asset'
import {getActiveCoin} from "../../actions/asset";


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }


    componentDidMount() {
        this.props.getActiveCoin({page: this.state.page}, () => {

        })
    }


    render() {
        if (!this.props.asset.activeCoin) {
            return null
        }
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/baseUserMsg')}

                >点点数字基金</NavBar>
                <div>
                    <div className={style.header}>
                        <div className={style.headerTop}>
                            <span className={style.headerTopW}>
                                活动余币额
                            </span>
                            <a className={style.headerTopR} href="javascript:void (0)">
                                <img className={style.headerTopI} src={require('./images/money.png')} alt=""/>账户安全险保障中
                            </a>
                        </div>
                        <div className={style.headerBottom}>
                            <a className={style.user} href="javascript:void (0)">
                                <div className={style.userData}>
                                    <span className={style.userName}>
                                        市值
                                    </span>
                                    <span className={style.userTime}>
                                        ￥{this.props.asset.activeCoin.totalAmount}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className={style.content}>
                        <div className={style.contentHeader}>
                            <span className={style.contentTitle1}>
                                币种
                            </span>
                            <span className={style.contentTitle2}>
                                数量
                            </span>
                            <span className={style.contentTitle3}>
                                市值
                            </span>
                        </div>

                        <div className={style.contentContent}>
                            {this.props.asset.activeCoin.list.length === 0 ? <div>
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
                                        return dataSource.cloneWithRows(this.props.asset.activeCoin.list)
                                    })()}
                                    renderRow={(rowData, sectionID, rowID) => {
                                        const obj = rowData;
                                        return (
                                            <div className={style.item} key={rowID}>
                                                <div className={style.contentPart}>
                                <span className={style.contentPart1}>
                                   <img src={require('./images/BTC.png')} className={style.contentImg}
                                        alt=""/>{obj.currency}
                                </span>
                                                    <span className={style.contentPart2}>
                                    {obj.amount}
                                </span>
                                                    <span className={style.contentPart3}>
                                    ￥{obj.marketValue}
                                                        <span className={style.contentPart4}>
                                        市场价:￥{obj.marketPrice}
                                    </span>
                                </span>
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
                                        margin: '0.05rem 0'
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

                                        this.setState({page: ++this.state.page}, () => {
                                            this.props.getActiveCoin({page: this.state.page}, () => {
                                            })
                                        })

                                    }}
                                    onEndReachedThreshold={10}
                                />}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        asset: state.asset
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getActiveCoin: bindActionCreators(getActiveCoin, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
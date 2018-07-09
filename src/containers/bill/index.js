import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Icon, RefreshControl, ListView, NavBar} from 'antd-mobile';
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getBillsList} from '../../actions/asset'
import ReactDOM from "react-dom";


class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            height: document.documentElement.clientHeight
        }
    }


    componentDidMount() {
        // setTimeout(() => this.setState({
        //     height: this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop,
        // }), 0);
        this.props.getBillsList({page: this.state.page}, () => {

        })
    }


    render() {
        if (!this.props.asset.bills) {
            return null
        }
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/baseUserMsg')}
                >账单</NavBar>
                <div>
                    <div className={style.content}>
                        {this.props.asset.bills.list.length === 0 ? <div>
                                <img className={style.showImg} src={require('../outAddressList/images/zero.png')} alt=""/>
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
                                    return dataSource.cloneWithRows(this.props.asset.bills.list)
                                })()}
                                renderRow={(rowData, sectionID, rowID) => {
                                    const obj = rowData;
                                    return <div className={style.item} key={rowID}>
                                        <div className={style.contentPart}>
                                                    <span className={style.contentPart1}>
                                                        <img src={require('../friendAward/images/BTC.png')}
                                                             className={style.contentImg}
                                                             alt=""/>{obj.currency}
                                                    </span>
                                            <span className={style.contentPart2}>
                                                        <span className={style.contentPart31}>
                                                            {obj.week}
                                                        </span>
                                                        <span className={style.contentPart32}>
                                                            {obj.createDate}
                                                        </span>
                                                    </span>
                                            <div className={style.contentPart3}>
                                                        <span className={style.contentPart5}>
                                                            {obj.amount}
                                                        </span>
                                                <span className={style.contentPart4}>
                                                            {obj.remark}
                                                        </span>
                                            </div>
                                        </div>
                                    </div>

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
                                    // height:this.state.height,
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
                                    if (this.lv.getInnerViewNode().offsetHeight < (document.documentElement.clientHeight - 45)) {
                                        return false
                                    }
                                    this.setState({page: ++this.state.page}, () => {
                                        this.props.getBillsList({page: this.state.page}, () => {
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
        asset: state.asset
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getBillsList: bindActionCreators(getBillsList, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
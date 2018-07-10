import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, RefreshControl, Toast, Tabs, NavBar,Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getCommonAddress} from '../../actions/wallet'
import {createForm} from 'rc-form';
import {StickyContainer, Sticky} from 'react-sticky';
import {ListView} from "antd-mobile/lib/index";
import ReactDOM from "react-dom";

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }


    componentDidMount() {

        this.props.getCommonAddress({page: this.state.page,currency: this.props.wallet.current.balance.currency}, () => {

        })
    }


    render() {
        if (!this.props.wallet.commonAddress[this.props.wallet.current.balance.currency]) {
            return null
        }
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <Link to={'/addAddress/null/null'} >添加</Link>,

                    ]}
                >常用地址</NavBar>


                            <ListView
                                ref={el => this.lv = el}
                                dataSource={(() => {
                                    const dataSource = new ListView.DataSource({
                                        rowHasChanged: (row1, row2) => row1 !== row2
                                    });
                                    return dataSource.cloneWithRows(this.props.wallet.commonAddress[this.props.wallet.current.balance.currency])
                                })()}
                                renderRow={(rowData, sectionID, rowID) => {

                                    const obj = rowData;
                                    return (
                                        <div className={style.item} key={rowID}>
                                            <Link to={'/forwardBTC/'+obj.address}>
                                                <div className={style.item1}>
                                                    <div className={style.itemContent}>
                                                        <div className={style.itemCoin}>
                                                            <img className={style.itemImg}
                                                                 src={require('../activityBalance/images/BTC.png')}
                                                                 alt=""/>{obj.currency}
                                                        </div>
                                                        <div className={style.itemName}>
                                                            {obj.tag}
                                                        </div>
                                                    </div>
                                                    <div className={style.itemAdressBox}>
                                                        <div className={style.itemAdressT}>
                                                            地址
                                                        </div>
                                                        <div className={style.itemAdress}>
                                                            {obj.address}
                                                        </div>
                                                    </div>
                                                </div>


                                            </Link>
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
                                        this.props.getCommonAddress({page: this.state.page,currency: this.props.wallet.current.balance.currency}, () => {
                                        })
                                    })

                                }}
                                onEndReachedThreshold={10}
                            />
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        wallet: state.wallet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCommonAddress: bindActionCreators(getCommonAddress, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
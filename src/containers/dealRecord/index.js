import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, RefreshControl, Toast, Tabs, Tag, NavBar, Icon} from 'antd-mobile';
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getTradeList} from '../../actions/fund'
import {StickyContainer, Sticky} from 'react-sticky';
import {ListView} from "antd-mobile/lib/index";
import ReactDOM from "react-dom";
import TradeIng from "../../containers/tradeIng";

let type = 'all';

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
        if (this.props.fund['tradeList' + type]) {
            return false
        }
        let params = {
            type: type,
            page: 1
        }
        if(this.props.params.id!=='null'){
            params.productId = this.props.params.id
        }

        this.props.getTradeList(params)
    }

    renderList = (type) => {

        return <div>
            {!this.props.fund['tradeList' + type] ?
                <div>
                    <img className={style.showImg}
                         src={require('../outAddressList/images/zero.png')} alt=""/>
                    <span className={style.showTip}>
                        暂无数据
                    </span>
                </div> : <ListView
                    ref={el => this.lv = el}
                    dataSource={(() => {
                        const dataSource = new ListView.DataSource({
                            rowHasChanged: (row1, row2) => row1 !== row2
                        });
                        return dataSource.cloneWithRows(this.props.fund['tradeList' + type])
                    })()}
                    renderRow={(rowData, sectionID, rowID) => {
                        const obj = rowData;
                        return (
                            <Link to={'/recordDetail/' + obj.orderId+'?'+obj.id}>
                                <div key={rowID} style={{padding: '0 15px'}}
                                >
                                    <div className={style.item} key={obj.amount}>
                                        <div className={style.itemLeft}>
                                            <div className={style.itemLeftH}>
                                <span className={style.itemLeftTime}>
                                    {obj.createDate}
                                </span>
                                                <span
                                                    style={obj.type == '1' ? {color: '#F49193'} : {color: '#5262ff'}}>
                                    {obj.typeName}
                                </span>
                                            </div>
                                            <div className={style.itemLeftB}>
                                <span>
                                    {obj.productTitle}
                                </span>
                                            </div>
                                        </div>
                                        <div className={style.itemRight}>
                            <span className={style.itemRightT}>
                                币额
                            </span>
                                            <span className={style.itemRightC}>
                                {obj.amount}
                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
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
                        height: document.documentElement.clientHeight-134,

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
                    onScroll={(e) => {
                        console.log(e.scroller.getValues().top);
                        this.scrollerTop = e.scroller.getValues().top;
                        this.domScroller = e;
                    }}
                    onEndReached={() => {
                        if (this.lv.getInnerViewNode().offsetHeight < (document.documentElement.clientHeight + 150)) {
                            return false
                        }
                        this.props.getTradeList({
                            type: type,
                            page: ++this.props.fund['tradeList' + type + 'page']
                        }, () => {
                        })

                    }}
                />}
        </div>
    }

    renderTabBar(props) {
        return (<Sticky>
            {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    render() {


        const tabs = [
            {title: '全部'},
            {title: '进行中'},
        ];

        const tabs1 = [
            {title: '全部', type: 'all'},
            {title: '买入', type: 0},
            {title: '赎回', type: 1},
            {title: '续期', type: 2},

        ];

        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[]}
                >交易记录</NavBar>
                <StickyContainer>
                    <Tabs tabs={tabs} renderTabBar={this.renderTabBar.bind(this)}
                    >

                        <div className={style.content}>
                            <div className={style.tagBox}>
                                <Tabs tabs={tabs1}
                                      onChange={(a, b) => {

                                          type = a.type
                                          if (!this.props.fund['tradeList' + a.type]) {
                                              this.props.getTradeList({
                                                  type: a.type,
                                                  page: 1
                                              })
                                          }


                                          // this.lv.getInnerViewNode().style.transform = 'translate3d(0px, 0px, 0px) scale(1)'
                                          // if (b === 0) {
                                          //     this.type = ''
                                          //     this.setState({type: ''})
                                          // }
                                          // if (b === 1) {
                                          //     this.type = 0
                                          //     if (!this.props.fund.tradeListBuyPage) {
                                          //         this.props.getTradeList({page: 1, type: 0}, () => {
                                          //         })
                                          //     } else {
                                          //         this.setState({type: 0})
                                          //     }
                                          // }
                                          // if (b === 2) {
                                          //     this.type = 1
                                          //     if (!this.props.fund.tradeListBack) {
                                          //         this.props.getTradeList({page: 1, type: 1}, () => {
                                          //         })
                                          //     } else {
                                          //         this.setState({type: 1})
                                          //     }
                                          // }
                                          // if (b === 3) {
                                          //     this.type = 2
                                          //     if (!this.props.fund.tradeListOn) {
                                          //         this.props.getTradeList({page: 1, type: 2}, () => {
                                          //         })
                                          //     } else {
                                          //         this.setState({type: 2})
                                          //     }
                                          // }
                                      }}
                                      renderTabBar={this.renderTabBar.bind(this)}
                                >
                                    {
                                        tabs1.map((obj) => {
                                            return <div>
                                                {this.renderList(obj.type)}
                                            </div>
                                        })
                                    }
                                </Tabs>
                            </div>

                        </div>

                        <TradeIng></TradeIng>
                    </Tabs>
                </StickyContainer>

            </div>
        )
    }


}

function mapStateToProps(state, props) {
    return {
        fund: state.fund
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTradeList: bindActionCreators(getTradeList, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
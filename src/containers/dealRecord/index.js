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

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.type = ''
        this.state = {
            type: '',
            height: document.documentElement.clientHeight
        }
    }


    componentDidMount() {



        let list, page
        if (this.type === '') {
            if (this.props.fund.tradeListAll) {
                return null
            }
            list = this.props.fund.tradeListAll
            page = this.props.fund.tradeListAllPage
        }

        if (this.type === 0) {
            if (this.props.fund.tradeListBuy) {
                return null
            }
            list = this.props.fund.tradeListBuy
            page = this.props.fund.tradeListBuyPage
        }

        if (this.type === 1) {
            if (this.props.fund.tradeListBack) {
                return null
            }
            list = this.props.fund.tradeListBack
            page = this.props.fund.tradeListBackPage
        }

        if (this.type === 2) {
            if (this.props.fund.tradeListOn) {
                return null
            }
            list = this.props.fund.tradeListOn
            page = this.props.fund.tradeListOnPage
        }


        this.props.getTradeList({page: 1, type: ''}, () => {
            // alert(ReactDOM.findDOMNode(this.lv).scrolltop)
            // this.setState({
            //     height: document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop
            // });
        })
    }

    render() {
        let list, page
        if (this.type === '') {
            if (!this.props.fund.tradeListAll) {
                return null
            }
            list = this.props.fund.tradeListAll
            page = this.props.fund.tradeListAllPage
        }

        if (this.type === 0) {
            if (!this.props.fund.tradeListBuy) {
                return null
            }
            list = this.props.fund.tradeListBuy
            page = this.props.fund.tradeListBuyPage
        }

        if (this.type === 1) {
            if (!this.props.fund.tradeListBack) {
                return null
            }
            list = this.props.fund.tradeListBack
            page = this.props.fund.tradeListBackPage
        }

        if (this.type === 2) {
            if (!this.props.fund.tradeListOn) {
                return null
            }
            list = this.props.fund.tradeListOn
            page = this.props.fund.tradeListOnPage
        }

        function renderTabBar(props) {
            return (<Sticky>
                {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
            </Sticky>);
        }

        const tabs = [
            {title: '全部'},
            {title: '进行中'},
        ];
        const tabs1 = [
            {title: '全部'},
            {title: '买入'},
            {title: '赎回'},
            {title: '续期'},

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
                    <Tabs tabs={tabs} initalPage={'t2'} renderTabBar={renderTabBar}
                    >

                        <div className={style.content}>
                            <div className={style.tagBox}>
                                <Tabs tabs={tabs1}
                                      initalPage={'t2'}
                                      onChange={(a, b) => {
                                          this.lv.getInnerViewNode().style.transform = 'translate3d(0px, 0px, 0px) scale(1)'
                                          if (b === 0) {
                                              this.type = ''
                                              this.setState({type: ''})
                                          }
                                          if (b === 1) {
                                              this.type = 0
                                              if (!this.props.fund.tradeListBuyPage) {
                                                  this.props.getTradeList({page: 1, type: 0}, () => {
                                                  })
                                              } else {
                                                  this.setState({type: 0})
                                              }
                                          }
                                          if (b === 2) {
                                              this.type = 1
                                              if (!this.props.fund.tradeListBack) {
                                                  this.props.getTradeList({page: 1, type: 1}, () => {
                                                  })
                                              } else {
                                                  this.setState({type: 1})
                                              }
                                          }
                                          if (b === 3) {
                                              this.type = 2
                                              if (!this.props.fund.tradeListOn) {
                                                  this.props.getTradeList({page: 1, type: 2}, () => {
                                                  })
                                              } else {
                                                  this.setState({type: 2})
                                              }
                                          }
                                      }}
                                      renderTabBar={renderTabBar}
                                >

                                </Tabs>
                            </div>
                            <div>
                                {list.length === 0 ?
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
                                            return dataSource.cloneWithRows(list)
                                        })()}
                                        renderRow={(rowData, sectionID, rowID) => {
                                            const obj = rowData;
                                            return (
                                                <Link to={'/recordDetail/' + obj.orderId}>
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
                                        onScroll={(e) => {
                                            console.log(e.scroller.getValues().top);
                                            this.scrollerTop = e.scroller.getValues().top;
                                            this.domScroller = e;
                                        }}
                                        onEndReached={() => {
                                            if (this.lv.getInnerViewNode().offsetHeight < (document.documentElement.clientHeight + 150)) {
                                                return false
                                            }
                                            ++page
                                            this.props.getTradeList({
                                                page,
                                                type: this.type
                                            }, () => {
                                            })

                                        }}
                                    />}
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
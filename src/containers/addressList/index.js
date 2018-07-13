import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, Icon, InputItem, Toast, Tabs, RefreshControl, NavBar, Modal} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getCommonAddress, delAddress} from '../../actions/wallet'
import {createForm} from 'rc-form';
import {StickyContainer, Sticky} from 'react-sticky';
import {ListView} from "antd-mobile/lib/index";
import ReactDOM from "react-dom";

let currentId = 0;

const tabs = [
    {title: 'all'},
    {title: 'BTC'},
    {title: 'ETH'}

];

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (this.props.wallet.commonAddress[currentId]) {
            return null
        }
        currentId = tabs[0].title

        this.props.getCommonAddress({page: 1, currency: currentId}, () => {
        })
    }

    renderTabBar(props) {
        return (<Sticky>
            {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    renderList = (currentId) => {

        return <div className={style.listBox}>
            {!this.props.wallet.commonAddress[currentId]? <div>
                <img className={style.showImg} src={require('./images/zero.png')} alt=""/>
                <span className={style.showTip}>
                        暂无数据
                    </span>
            </div> : <ListView
                ref={el => this.lv = el}
                dataSource={(() => {
                    const dataSource = new ListView.DataSource({
                        rowHasChanged: (row1, row2) => row1 !== row2
                    });
                    return dataSource.cloneWithRows(this.props.wallet.commonAddress[currentId])
                })()}
                renderRow={(rowData, sectionID, rowID) => {

                    const obj = rowData;
                    return (


                        <div className={style.item} key={obj.id}>

                            <div className={style.itemContent}>
                                <div className={style.itemCoin}>
                                    <img className={style.itemImg} src={require('../activityBalance/images/BTC.png')}
                                         alt=""/>{obj.currency}
                                </div>
                                <div className={style.itemName}>
                                    {obj.tag}
                                </div>
                                <div className={style.itemDo}>
                                    <a onClick={(e) => {

                                        this.setState({isShowModal: true})
                                        this.setState({delAddressId: obj.id})

                                        e.stopPropagation()
                                    }} href="javascript:void (0)">
                                        <img className={style.iconImg} src={require('./images/delete.png')} alt=""/>删除
                                    </a>
                                    <Link to={'/addAddress/' + obj.id+'/'+currentId}>

                                        <img className={style.iconImg} src={require('./images/editor.png')} alt=""/>修改
                                    </Link>
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
                    // let page = this.state.page
                    // if(this.state.currency==='BTC'){
                    //     this.setState({page: ++this.state.page}, () => {
                    //
                    //         this.props.getCommonAddress({page,currency:this.state.currency?this.state.currency:''}, () => {
                    //         })
                    //     })
                    // }
                    // if(this.state.currency==='ETH'){
                    //     page = this.state.ethPage
                    // }
                    // if(this.state.currency===''){
                    //     page = this.state.ethPage
                    // }
                    this.props.getCommonAddress({
                        page: ++this.props.wallet.commonAddress[currentId+'page'],
                        currency: currentId
                    }, () => {
                    })


                }}
                onEndReachedThreshold={10}
            />}
        </div>
    }
    delAddress = () => {
        this.props.delAddress({
            id: this.state.delAddressId
        }, () => {
            window.location.reload()
        })
    }

    render() {
        if (!this.props.wallet.commonAddress[currentId]) {
            return null
        }
        return (
            <div className={style.wrap}>
                <Modal
                    visible={this.state.isShowModal}
                    transparent
                    maskClosable={true}
                    onClose={() => this.setState({isShowModal: false})}
                    title="确定要删除"
                    closable={true}
                    footer={[
                        {
                            text: '取消', onPress: () => {
                                this.setState({isShowModal: false})
                            }
                        }
                        , {
                            text: '完成', onPress: () => {
                                this.delAddress();
                            }
                        }
                    ]}
                    wrapProps={{onTouchStart: this.onWrapTouchStart}}
                />
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/walletIndex')}
                    rightContent={[

                        <Link to={'/addAddress/null/null'}>+
                        </Link>,
                    ]}
                >添加常用地址</NavBar>
                <div className={style.tab}>
                    <StickyContainer>
                        <Tabs tabs={tabs}
                              initalPage={'t2'}
                              onChange={(a, b) => {
                                  currentId = a.title
                                  if (!this.props.wallet.commonAddress[a.title]) {
                                      this.props.getCommonAddress({page: 1, currency: a.title}, () => {
                                      })
                                  }
                              }}
                            // onChange={(a, b) => {
                            //     if (b === 1) {
                            //         this.setState({btcPage: ++this.state.btcPage, currency: 'BTC'}, () => {
                            //             this.props.getCommonAddress({
                            //                 page: this.state.btcPage,
                            //                 currency: 'BTC'
                            //             }, () => {
                            //             })
                            //         })
                            //
                            //     }
                            //     if (b === 2) {
                            //         this.setState({ethPage: ++this.state.ethPage, currency: 'ETH'}, () => {
                            //             this.props.getCommonAddress({
                            //                 page: this.state.ethPage,
                            //                 currency: 'ETH'
                            //             }, () => {
                            //             })
                            //         })
                            //
                            //     }
                            // }}
                              renderTabBar={this.renderTabBar.bind(this)}
                        >
                            {
                                tabs.map((obj) => {
                                    return <div>
                                        {this.renderList(obj.title)}
                                    </div>
                                })
                            }

                        </Tabs>
                    </StickyContainer>
                </div>


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
        getCommonAddress: bindActionCreators(getCommonAddress, dispatch),
        delAddress: bindActionCreators(delAddress, dispatch)

    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)
export default BaseUserMsg;
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, Icon, InputItem, Toast, Tabs, RefreshControl, WhiteSpace, NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {createForm} from 'rc-form';
import {getInformationList, getInformationType} from '../../actions/information';
import {StickyContainer, Sticky} from 'react-sticky';
import {ListView} from "antd-mobile/lib/index";

let currentId = 0;

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

        this.props.getInformationType({}, () => {


            currentId = this.props.information.infosType[0].id

            this.props.getInformationList({
                typeId: this.props.information.infosType[0].id,
                page: 1
            })
        })

    }

    renderTabBar(props) {
        return (<Sticky>
            {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    changeDate = (json) => {
        for (let i = 0; i < json.length; i++) {
            json[i]["title"] = json[i]['name'];   //'text'是需要的字段
            //delete json[i][key];  //key是要替换为'text'的字段
        }
        return json;
    }


    renderList = (currentId) => {
        if (!this.props.information[currentId]) {
            return (
                <div>
                    <img className={style.showImg} src={require('../addressList/images/zero.png')} alt=""/>
                    <span className={style.showTip}>
                        暂无数据
                    </span>
                </div>
            )
        }
        return <ListView
            ref={el => this.lv = el}
            dataSource={(() => {
                const dataSource = new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2
                });
                return dataSource.cloneWithRows(this.props.information[currentId])
            })()}
            renderRow={(rowData, sectionID, rowID) => {
                const i = rowData;
                return <Link to={'/informationDetails/'+rowData.id}><div className={style.itemBox}>


                    <div className={style.item}>
                        {false ?
                            <div>
                                <p className={style.itemTitle1}>
                                    {i.title}
                                </p>
                                {i.img ? <img className={style.itemImgB} src={i.img} alt=""/> : ''}

                                <span className={style.itemTerrace}>
                                {i.terrace}
                            </span></div>
                            : <div className={style.Lbox}>
                                <div className={style.Left}>
                                    <p className={style.itemTitle1}>
                                        {i.title}
                                    </p>
                                    <span className={style.itemTerrace}>
                                            {i.author}
                                        </span>
                                </div>
                                <img className={style.itemImgB1} src={i.coverUrl} alt=""/>
                            </div>}
                    </div>


                </div></Link>

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
                // this.setState({page: ++this.state.page}, () => {
                //     this.props.getBillsList({page: this.state.page}, () => {
                //     })
                // })
                this.props.getInformationList({
                    typeId: currentId,
                    page: ++this.props.information[currentId+'page']
                })

            }}
            onEndReachedThreshold={10}
        />
    }

    render() {

        if (!this.props.information.infosType) {
            return null
        }


        return (
            <div className={style.wrap}>
                <div className={style.tab}>
                    <StickyContainer>
                        <Tabs tabs={this.changeDate(this.props.information.infosType)}
                              initalPage={'t2'}
                              onChange={(a, b) => {
                                  currentId = a.id
                                  if (!this.props.information[a.id]) {
                                      this.props.getInformationList({
                                          typeId: a.id,
                                          page: 1
                                      })
                                  }
                              }}
                              renderTabBar={this.renderTabBar.bind(this)}
                        >

                            {
                                this.props.information.infosType.map((obj) => {
                                    return <div>
                                        {this.renderList(obj.id)}
                                    </div>
                                })
                            }


                        </Tabs>
                    </StickyContainer>
                </div>
                <Footer information={true}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        information: state.information
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getInformationList: bindActionCreators(getInformationList, dispatch),
        getInformationType: bindActionCreators(getInformationType, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)
export default BaseUserMsg;
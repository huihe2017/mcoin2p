import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, Icon,InputItem, Toast, Tabs, WhiteSpace,NavBar } from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory,Link} from 'react-router'
import { createForm } from 'rc-form';
import { StickyContainer, Sticky } from 'react-sticky';

const data = [
    {
        title: '八成私募认为CDR对市场抽血效应有限，点赞数字点点基金，字数超过的时候用...代替...',
        terrace: '点点平台',
        bottom:true,
    },
    {
        title: '八成私募认为CDR对市场抽血效应有限，点赞数字点点基金，字数超过的时候用...代替...',
        terrace: '点点平台',
        bottom:false,
        img:require('./images/small.png')
    },
    {
        title: '八成私募认为CDR对市场抽血效应有限，点赞数字点点基金，字数超过的时候用...代替...',
        terrace: '点点平台',
        bottom:true,
        img:require('./images/big.png')
    },




];

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){


    }
    renderTabBar(props) {
        return (<Sticky>
            {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
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
                <div className={style.itemBox} >
                    {data.map(i => (

                        <div className={style.item} >
                            {i.bottom?
                                <div>
                            <p className={style.itemTitle1}>
                                {i.title}
                            </p>
                                    {i.img?<img className={style.itemImgB} src={i.img} alt=""/>:''}

                            <span className={style.itemTerrace}>
                                {i.terrace}
                            </span></div>
                                :<div className={style.Lbox}>
                                    <div className={style.Left}>
                                        <p className={style.itemTitle1}>
                                            {i.title}
                                        </p>
                                        <span className={style.itemTerrace}>
                                            {i.terrace}
                                        </span>
                                    </div>
                                    <img className={style.itemImgB1} src={i.img} alt=""/>
                                </div>}
                        </div>

                    ))}
                </div>
            )
        }


    }

    render() {

        const tabs = [
            { title: '推荐' },
            { title: '区块链' },
            { title: '区块链1' },
            { title: '区块链2' },
            { title: '区块链3' },
            { title: '区块链4' },
            { title: '区块链5' },
            { title: '区块链6' },
        ];
        return (
            <div className={style.wrap}>
                <div className={style.tab}>
                    <StickyContainer>
                        <Tabs tabs={tabs}
                              initalPage={'t2'}
                              renderTabBar={this.renderTabBar.bind(this)}
                        >
                            <div >
                                {this.show()}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                                2
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                                3
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                                4
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                                5
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                                6
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                                7
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                                8
                            </div>

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
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)
export default BaseUserMsg;
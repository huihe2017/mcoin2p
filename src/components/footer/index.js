import React from 'react';
import style from "./index.css"
import {TabBar } from 'antd-mobile';
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'

class Footer extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            fullScreen: false,
        }


    }




    componentWillReceiveProps() {

    }

    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>

                <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           hidden: !this.state.hidden,
                       });
                   }}
                >
                    Click to show/hide tab-bar
                </a>
                <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
                   onClick={(e) => {
                       e.preventDefault();
                       this.setState({
                           fullScreen: !this.state.fullScreen,
                       });
                   }}
                >
                    Click to switch fullscreen
                </a>
            </div>
        );
    }

    render() {

        return (
            <div >
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        icon={
                            <div className={this.props.home?style.homeA:style.home}/>
                        }
                        selectedIcon={
                            <div className={style.homeA}/>
                        }
                        title={<span style={this.props.home?{color:'#5262ff'}:{}}>首页</span>}
                        key="Koubei"

                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            },()=>{
                                hashHistory.push('/')
                            });
                        }}
                        data-seed="logId1"
                    >
                        {/*{this.renderContent('Koubei')}*/}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className={this.props.information?style.newA:style.new}/>
                        }

                        selectedIcon={
                            <div className={style.newA}/>
                        }
                        title={<span style={this.props.information?{color:'#5262ff'}:{}}>资讯</span>}
                        key="Friend"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            },()=>{
                                hashHistory.push('/informationIndex')
                            });
                        }}
                    >
                        {/*{this.renderContent('Friend')}*/}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div className={this.props.person?style.personA:style.person}/>}
                        selectedIcon={<div className={style.personA}/>}

                        title={<span style={this.props.person?{color:'#5262ff'}:{}}>我的</span>}
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            },()=>{
                                hashHistory.push('/baseUserMsg')
                            });
                        }}
                    >
                        {/*{this.renderContent('My')}*/}
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

Footer = connect(mapStateToProps, mapDispatchToProps)(Footer)
export default Footer;
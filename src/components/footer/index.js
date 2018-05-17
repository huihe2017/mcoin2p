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
                            <div className={style.home}/>
                        }
                        selectedIcon={
                            <div className={style.homeA}/>
                        }
                        title="首页"
                        key="Koubei"

                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                        {/*{this.renderContent('Koubei')}*/}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div className={style.new}/>
                        }

                        selectedIcon={
                            <div className={style.newA}/>
                        }
                        title="资讯"
                        key="Friend"
                        dot
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                        {/*{this.renderContent('Friend')}*/}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div className={style.person}/>}
                        selectedIcon={<div className={style.personA}/>}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
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
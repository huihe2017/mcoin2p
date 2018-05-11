import React from 'react';
import style from "./index.css"
import {Drawer} from 'antd-mobile';
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux'

class Header extends React.Component {
    constructor(props) {
        console.log(hashHistory)
        super(props);
        this.state = {
            open: false,
            position: 'relative',
            otherStyle: true

        }
        this.choceType = this.choceType.bind(this)


    }


    componentWillMount() {
        this.choceType()
    }

    componentWillReceiveProps() {
        // if (window.location.hash.substr(1).indexOf('/') !== -1) {
        //     this.setState({position: 'relative'})
        //     this.setState({otherStyle: true})
        //     window.onscroll = null
        //     return true
        // } else {
        //     if (!window.onscroll) {
        //         this.choceType()
        //         return true
        //     }
        // }
        // return true
    }

    choceType() {
        if (window.location.hash.substr(1).indexOf('/?') !== -1) {
            this.setState({position: 'absolute'})
            this.setState({otherStyle: false})
            let dance = document.body.clientWidth * 0.46
            let danceCopy = dance
            window.onscroll = null
            window.onscroll = (e) => {
                //console.log(document.body.scrollTop)
                var oTop = document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop;

                if (oTop < danceCopy) {
                    this.setState({position: 'absolute'})
                    this.setState({otherStyle: false})
                    return false
                }

                if (oTop - dance < 0) {
                    this.setState({position: 'fixed'})
                    this.setState({otherStyle: true})
                } else {
                    this.setState({position: 'absolute'})
                    this.setState({otherStyle: false})
                }
                dance = oTop
            }
        }
    }

    componentWillUnmount() {

    }

    onOpenChange = (...args) => {
        console.log(args);
        this.setState({open: !this.state.open});
    }

    render() {
        const Array = [{
            label: this.props.user.userName ? this.props.user.userName : '登录与注册',
            link:  this.props.user.userName ? '/baseUserMsg' : '/auth'
        }, {label: '首页', link: '/'}, {label: '产品交易', link: '/forexPresentation'}, {
            label: '交易平台',
            link: '/tradingPlatform'
        }, {label: '关于海豚汇', link: '/aboutUs'}, {label: '海豚学院', link: '/school'}, {
            label: '账户出金',
            link: '/outgold'
        }, {label: '账户入金', link: '/ingold'}, {label: '用户资料', link: '/detailUserMsg'}, {
            label: '更改密码',
            link: '/modifyPwd'
        }, {label: '历史记录', link: '/history'}]
        const sidebar = (<ul style={{paddingTop: 20}}>
            {Array.map((i, index) => {
                return (<li className={style.navlist} key={index}>
                    <Link to={i.link}>
                        {i.label}
                    </Link>
                </li>);
            })}
        </ul>);
        return (
            <div>
                <div
                    className={this.state.otherStyle ? ( style.wrap + ' ' + style[this.state.position] + ' ' + style.otherStyle) : ( style.wrap + ' ' + style[this.state.position])}>
                    <div className={style.logo}>
                        {
                            this.state.otherStyle ? <Link to="/"><img src={require("./logoO.png")}/></Link> :
                                <Link to="/">
                                    <img src={require("./logo.png")}/>
                                </Link>
                        }
                    </div>
                    <div onClick={this.onOpenChange} className={style.sider}>
                    </div>
                </div>
                <Drawer
                    className="my-drawer"
                    style={{
                        minHeight: document.documentElement.clientHeight - 200,
                        position: 'fixed',
                        zIndex: this.state.open ? 100 : -1
                    }}
                    sidebar={sidebar}
                    open={this.state.open}
                    position="right"
                    // contentStyle={{zIndex:this.state.open?98:-1}}
                    // overlayStyle={{zIndex:this.state.open?99:-1}}
                    onOpenChange={this.onOpenChange}
                    sidebarStyle={{background: '#656b6f'}}
                >
                </Drawer>
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

Header = connect(mapStateToProps, mapDispatchToProps)(Header)
export default Header;
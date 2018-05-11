import React, {Component} from 'react'
import SideBar from './sideBar/index'
import Login from '../../login/index'
import Register from '../../register/index'
import Layer from '../../renderLayer/index'
import {Link} from 'react-router-dom';
import style from './header.css';
import HeaderNav from '../../headerNav'
import {hashHistory} from 'react-router';

export default class Header extends Component {

    checkedForPath(sidePath) {
        if (sidePath === hashHistory.getCurrentLocation().pathname) {
            return true
        }else {
            return false
        }
    }
    toDownload(){
        if (hashHistory.getCurrentLocation().pathname=="/") {
            document.documentElement.scrollTop=1800;
        }
    }
    render() {


        return (
            <div className={style.head}>

                {/*<div className={this.state.isFixed ? (style.header + ' ' + style.fixed) : style.header}>*/}
                <div
                    className={this.props.otherStyle ? ( style.header + ' ' + style[this.props.position] + ' ' + style.otherStyle) : ( style.header + ' ' + style[this.props.position])}>
                    <div className={style.logo}>
                        {
                            this.props.otherStyle ? <Link to="/"><img className={style.logoimg} src={require("./logoO.png")}/></Link> :
                                <Link to="/">
                                    <img className={style.logoimg} src={require("./logo.png")}/>
                                </Link>
                        }
                    </div>
                    <div className={style.line}></div>
                    <div className={style.nav}>
                        <div className={style.personCenter}>
                            <Link to="/userCenter">
                                <HeaderNav showBorder={(() => {return this.checkedForPath('/userCenter')})()} content="个人中心" ischangecolor={this.props.otherStyle} />
                            </Link>
                        </div>
                        <div className={style.personCenter}>
                            <Link to="/" onClick={this.toDownload.bind(this)}>
                                <HeaderNav showBorder={(() => {return this.checkedForPath('/download')})()} content="软件下载" ischangecolor={this.props.otherStyle} />
                            </Link>
                        </div>
                        <div className={style.personCenter}>
                            <Link to="/aboutUs">
                                <HeaderNav showBorder={(() => {return this.checkedForPath('/aboutUs')})()} content="关于海豚汇" ischangecolor={this.props.otherStyle} />
                            </Link>
                        </div>

                    </div>
                    <div className={style.headerRight}>
                        <a className={style.checked} style={{display: 'none'}}>中文</a>
                        <a className="english" style={{display: 'none'}}>EN</a>
                        <a onClick={() => {
                            if(this.props.isLogin){
                                ''
                            }else{
                                this.props.toggle(true)
                            }
                        }} className={style.login}>{this.props.isLogin ? localStorage.userName : '登录'}</a>
                        <a onClick={() => {
                            if(this.props.isLogin){
                                this.props.signOut()
                            }else{
                                this.props.toggle(false)
                            }

                        }} className={style.login}>{this.props.isLogin ? '退出' : '注册'}</a>
                        <a onMouseLeave={() => {
                            this.props.hideSideBar()
                        }} onMouseOver={() => {
                            this.props.showSideBar()
                        }} className={style.isPand}><i
                            className='fa fa-list-ul'></i> &nbsp;&nbsp;全部导航
                            <SideBar userCenterClick={this.props.toggle.bind(this)} show={this.props.isShowSideBar}/>
                        </a>
                    </div>
                </div>
                {this.props.isShowLogin ?
                    <Layer closeFn={this.props.hideLogin}><Login login={this.props.login} toReg={this.props.toggle.bind(this)} toFind={this.props.ftoggle.bind(this)}/></Layer> : ''}
                {this.props.isShowReg ?
                    <Layer closeFn={this.props.hideReg}><Register title={"注册海豚汇账号"} hid={false} login={this.props.login} toLogin={this.props.toggle.bind(this)}  butword={"完成注册并登录"}/></Layer> : ''}
                {this.props.isShowFind ?
                    <Layer closeFn={this.props.hideFind}><Register title={"忘记密码"} hid={true} login={this.props.login}  butword={"确认修改密码"} /></Layer> : ''}
            </div>
        )
    }
}
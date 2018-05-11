import React, {Component} from 'react'
import Layer from '../../../renderLayer/index'
import { Link } from 'react-router-dom'
import style from './sideBar.css'
import {hashHistory} from 'react-router';


class SideBar extends Component {

    onClickHandle(e) {
        if (localStorage.userName === 'null') {
            e.preventDefault()
            this.props.userCenterClick(true)
        }

    }

    checkedForPath(sidePath) {
        if (sidePath === hashHistory.getCurrentLocation().pathname) {//alert(22)
            return style.checked
        }
    }

    render() {
        let isHide = this.props.show ? '' : style.hide

        return (
            <div>
                <div className={style.sideBar + ' ' + isHide}>
                    <Link to="/">
                        <div className={(() => {
                            return this.checkedForPath('/')
                        })()}>首页
                        </div>
                    </Link>
                    <Link to="/ProductDeal">
                        <div className={(() => {
                            return this.checkedForPath('/ProductDeal')
                        })()}>产品交易
                        </div>
                    </Link>
                    <Link to="/DealTerrace">
                        <div className={(() => {
                            return this.checkedForPath('/DealTerrace')
                        })()}>交易平台
                        </div>
                    </Link>
                    <Link to="/aboutUs">
                        <div className={(() => {
                            return this.checkedForPath('/aboutUs')
                        })()}>关于海豚汇
                        </div>
                    </Link>
                    <Link to="/DolphinSchool">
                        <div className={(() => {
                            return this.checkedForPath('/DolphinSchool')
                        })()}>合伙人计划
                        </div>
                    </Link>
                    <Link to="/DolphinSchool">
                        <div className={(() => {
                            return this.checkedForPath('/DolphinSchool')
                        })()}>海豚学院
                        </div>
                    </Link>
                    <Link onClick={this.onClickHandle.bind(this)} to="/userCenter">
                        <div className={(() => {
                            return this.checkedForPath('/userCenter')
                        })()}>个人中心
                        </div>
                    </Link>
                    {/*<Link to="/ib">*/}
                        {/*<div className={(() => {*/}
                            {/*return this.checkedForPath('/ib')*/}
                        {/*})()}>代理系统*/}
                        {/*</div>*/}
                    {/*</Link>*/}
                    <Link to="/partnerEntry">
                        <div className={(() => {
                            return this.checkedForPath('/partnerEntry')
                        })()}>合伙人入口
                        </div>
                    </Link>
                    {/*<Link to="/partnerReg">*/}
                        {/*<div className={(() => {*/}
                            {/*return this.checkedForPath('/partnerReg')*/}
                        {/*})()}>合伙人注册*/}
                        {/*</div>*/}
                    {/*</Link>*/}
                    {/*<Link to="/partnerLogin">*/}
                        {/*<div className={(() => {*/}
                            {/*return this.checkedForPath('/partnerLogin')*/}
                        {/*})()}>合伙人登录*/}
                        {/*</div>*/}
                    {/*</Link>*/}


                </div>
                {this.props.show ? <Layer></Layer> : ''}

            </div>
        )
    }
}

export default SideBar
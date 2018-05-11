import React from 'react'
import {Route, Router, IndexRoute, hashHistory} from 'react-router'
import Home from './containers/home/'
import OutGold from './containers/outGold/'
import InGold from './containers/inGold/'
import ModifyPwd from './containers/modifyPwd/'
import ResultsPage from './containers/resultsPage/'
import GetAccount from './containers/getAccount/'
import SpeedAccount from './containers/speedAccount/'
import AboutUs from './containers/aboutUs/'
import School from './containers/school/'
import History from './containers/history/'
import ForgetPwd from './containers/forgetPwd/'
import TradingPlatform from './containers/tradingPlatform/'
import Auth from './containers/auth/'
import ForexPresentation from './containers/forexPresentation/'
import DetailUserMsg from './containers/detailUserMsg/'
import BaseUserMsg from './containers/baseUserMsg/'

export default () => {


    return (
        <Router history={hashHistory}>
            <Route path="/" component={Home}/>
            <Route path="/outgold" component={OutGold}/>
            <Route path="/ingold" component={InGold}/>
            <Route path="/modifyPwd" component={ModifyPwd}/>
            <Route path="/resultsPage" component={ResultsPage}/>
            <Route path="/getAccount" component={GetAccount}/>
            <Route path="/speedAccount" component={SpeedAccount}/>
            <Route path="/aboutUs" component={AboutUs}/>
            <Route path="/school" component={School}/>
            <Route path="/history" component={History}/>
            <Route path="/forgetPwd" component={ForgetPwd}/>
            <Route path="/tradingPlatform" component={TradingPlatform}/>
            <Route path="/forexPresentation" component={ForexPresentation}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/detailUserMsg" component={DetailUserMsg}/>
            <Route path="/baseUserMsg" component={BaseUserMsg}/>

        </Router>
    )
}
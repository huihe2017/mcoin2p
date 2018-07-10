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
import MoneyDetail from './containers/moneyDetail/'
import SetPerson from './containers/setPerson/'
import RiskType from './containers/riskType/'
import SelectRisk from './containers/selectRisk/'
import YesterdayEarnings from './containers/yesterdayEarnings/'
import FriendAward from './containers/friendAward/'
import ActivityBalance from './containers/activityBalance/'
import QCode from './containers/qcode/'
import PrivateKey from './containers/privateKey/'
import AddressList from './containers/addressList/'
import AddAddress from './containers/addAddress/'
import ForwardBTC from './containers/forwardBTC/'
import SafeSet from './containers/safeSet/'
import CustomCost from './containers/customCost/'
import OutQcode from './containers/outQcode/'
import WalletIndex from './containers/walletIndex/'
import DealDetails from './containers/dealDetails/'
import OutAddressList from './containers/outAddressList/'
import WalletSetting from './containers/walletSetting/'
import SafeCenter from './containers/safeCenter/'
import CommonAddress from './containers/commonAddress/'
import AmendSafe from './containers/amendSafe/'
import FundIndex from './containers/fundIndex/'
import EarningsDetail from './containers/earningsDetail/'
import RecordDetail from './containers/recordDetail/'
import DealRecord from './containers/dealRecord/'
import FundName from './containers/fundName/'
import FriendAwardDetail from './containers/friendAwardDetail/'
import ProductDetails from './containers/productDetails/'
import ProductBuying from './containers/productBuying/'
import BuyResult from './containers/buyResult/'
import InformationDetails from './containers/informationDetails/'
import noticDetails from './containers/noticDetails/'
import SelectedFunds from './containers/selectedFunds/'
import InformationIndex from './containers/informationIndex/'
import InputSafe from './containers/inputSafe/'
import ImportSafe from './containers/importSafe/'
import Bill from './containers/bill/'
import SetName from './containers/setName/'

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
            <Route path="/setPerson" component={SetPerson}/>
            <Route path="/setName" component={SetName}/>
            <Route path="/moneyDetail" component={MoneyDetail}/>
            <Route path="/riskType" component={RiskType}/>
            <Route path="/selectRisk" component={SelectRisk}/>
            <Route path="/yesterdayEarnings" component={YesterdayEarnings}/>
            <Route path="/friendAward" component={FriendAward}/>
            <Route path="/activityBalance" component={ActivityBalance}/>
            <Route path="/qCode" component={QCode}/>
            <Route path="/privateKey" component={PrivateKey}/>
            <Route path="/addressList" component={AddressList}/>
            <Route path="/addAddress/:id/:currency" component={AddAddress}/>
            <Route path="/forwardBTC/:address" component={ForwardBTC}/>
            <Route path="/safeSet" component={SafeSet}/>
            <Route path="/customCost" component={CustomCost}/>
            <Route path="/outQcode" component={OutQcode}/>
            <Route path="/walletIndex" component={WalletIndex}/>
            <Route path="/dealDetails/:currency" component={DealDetails}/>
            <Route path="/outAddressList" component={OutAddressList}/>
            <Route path="/walletSetting" component={WalletSetting}/>
            <Route path="/safeCenter" component={SafeCenter}/>
            <Route path="/commonAddress" component={CommonAddress}/>
            <Route path="/amendSafe" component={AmendSafe}/>
            <Route path="/fundIndex" component={FundIndex}/>
            <Route path="/earningsDetail" component={EarningsDetail}/>
            <Route path="/recordDetail/:id" component={RecordDetail}/>
            <Route path="/dealRecord" component={DealRecord}/>
            <Route path="/fundName/:id" component={FundName}/>
            <Route path="/friendAwardDetail" component={FriendAwardDetail}/>
            <Route path="/productDetails/:id" component={ProductDetails}/>
            <Route path="/productBuying" component={ProductBuying}/>
            <Route path="/buyResult" component={BuyResult}/>
            <Route path="/informationDetails/:id" component={InformationDetails}/>
            <Route path="/noticDetails/:id" component={noticDetails}/>
            <Route path="/selectedFunds" component={SelectedFunds}/>
            <Route path="/informationIndex" component={InformationIndex}/>
            <Route path="/inputSafe" component={InputSafe}/>
            <Route path="/importSafe" component={ImportSafe}/>
            <Route path="/bill" component={Bill}/>
        </Router>
    )
}
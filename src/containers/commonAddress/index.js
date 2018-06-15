import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, Tabs, WhiteSpace} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {getBaseUserMsg} from '../../actions/user'
import {getCommonAddress} from '../../actions/wallet'
import {createForm} from 'rc-form';
import {StickyContainer, Sticky} from 'react-sticky';

const data = [
    {
        num: 1,
        title: 'BTC',
        name: '大大大飞机111',
        address: '1LezCq1NAfdsfbsdkjfksdsasdddddddddsddddddddddsadfsafsadasdasdas',
    },
];

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getCommonAddress()
        // this.props.getBaseUserMsg({
        //
        // }, (errorText) => {
        //     Toast.hide()
        //     if (errorText) {
        //         Toast.fail(errorText, 3, null, false)
        //     } else {
        //         //hashHistory.push('/')
        //     }
        // })

    }

    renderTabBar(props) {
        return (<Sticky>
            {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
        </Sticky>);
    }

    render() {

        const tabs = [
            {title: '全部'},
            {title: 'TOKEN'},
            {title: 'BCH'},
            {title: 'ETC'},
            {title: 'ETH'},

        ];
        if (!this.props.wallet.commonAddress) {
            return null
        }
        return (
            <div className={style.wrap}>
                {
                    this.props.wallet.commonAddress.map((obj, index) => {
                        return <Link to={'/forwardBTC'}>
                            <div className={style.tab}>
                                <div className={style.item} key={index}>

                                    <div className={style.itemContent}>
                                        <div className={style.itemCoin}>
                                            <img className={style.itemImg}
                                                 src={require('../activityBalance/images/BTC.png')}
                                                 alt=""/>{obj.currency}
                                        </div>
                                        <div className={style.itemName}>
                                            {obj.tag}
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

                            </div>
                        </Link>

                    })
                }


                <Footer/>
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
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)
export default BaseUserMsg;
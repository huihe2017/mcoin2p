import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Picker,Icon,Slider} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {logout,getBaseUserMsg} from '../../actions/user'

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sValue:['0.002']
        }
    }

    log (name){
        return (value) => {
            console.log(`${name}: ${value}`);
        };
    }

    logout() {
        Toast.loading('正在退出', 0)
        this.props.logout({

        }, (errorText) => {
            Toast.hide()
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            } else {
                hashHistory.push('/')
            }
        })
    }

    componentDidMount(){
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


    render() {
        const seasons = [
            [
                {
                    label: '0.002(推荐)',
                    value: '0.002',
                },
                {
                    label: '0.001',
                    value: '0.001',
                },
                {
                    label: '0.007',
                    value: '0.007',
                },
                {
                    label: 'custom',
                    value: 'custom',
                },
            ],

        ];
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <div>
                    <ul className={style.itemUl}>

                        <li className={style.itemBox}>
                            <div className={style.itemB}>
                                <span className={style.itemBoxT1}>
                                    自定义矿工费
                                </span>
                            </div>

                            <InputItem onChange={(value) => {
                                this.setState({classNumber: value})
                            }} placeholder="输入矿工费" type="text" extra="BTC"></InputItem>
                        </li>
                        <li className={style.itemBox}>
                            <div className={style.itemB}>
                                <span className={style.itemBoxT}>
                                    自定义矿工费
                                </span>
                            </div>
                            <div  className={style.silderBoxB}>
                                <span className={style.sip}>
                                    慢
                                </span>
                                <div className={style.silderBox}>
                                    <Slider
                                        style={{ marginLeft: 30, marginRight: 30 }}
                                        defaultValue={26}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </div>
                                <span className={style.sip1}>
                                    快
                                </span>
                            </div>


                        </li>
                    </ul>
                    <div className={style.button}>
                        确定
                    </div>
                </div>
                {/*<Footer/>*/}
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
        logout: bindActionCreators(logout, dispatch),
        getBaseUserMsg: bindActionCreators(getBaseUserMsg, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
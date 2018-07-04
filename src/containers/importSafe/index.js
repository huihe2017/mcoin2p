import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, NavBar, Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory, Link} from 'react-router'
import {logout} from '../../actions/user'
import {getWalletIndexData} from '../../actions/wallet'
class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submit:false
        }
    }

    componentDidMount() {

    }

    check(){
        if((/^\d{6}$/.test(this.state.saveCode))){
            this.setState({
                submit:true
            })
        }
        console.log(2);
    }

    render() {
        const seasons = [
            [
                {
                    label: '2013',
                    value: '2013',
                },
                {
                    label: '2014',
                    value: '2014',
                },
            ],

        ];
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/baseUserMsg')
                    }
                    rightContent={[
                        <div onClick={()=>{
                            if(this.state.submit){
                                this.props.getWalletIndexData({
                                    safeCode:this.state.saveCode
                                }, () => {
                                    hashHistory.push('/walletIndex')
                                })
                            }else {
                                Toast.fail('请确认安全码', 3, null, false)
                            }

                        }} >完成</div>,
                    ]}
                ></NavBar>
                <div>
                    <ul className={style.itemUl}>
                        <span className={style.title}>
                            请输入安全码
                        </span>
                        <li className={style.itemBox}>
                            <List>
                                <InputItem type='password' onChange={(value) => {
                                    this.setState({saveCode: value},()=>{
                                        this.check()
                                    })
                                }} placeholder="安全码设置（6位数字）" type="text"></InputItem>
                            </List>

                        </li>

                    </ul>

                </div>
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
    return {
        getWalletIndexData: bindActionCreators(getWalletIndexData, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
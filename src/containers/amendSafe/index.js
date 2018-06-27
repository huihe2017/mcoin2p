import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Picker,NavBar, Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {getWalletIndexData} from '../../actions/wallet'

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false
        }
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

    show(){
        if(this.state.show){
            this.setState({
                show:false
            })
            return
        }
        this.setState({
            show:true
        })
    }

    submit(){
        if(!this.state.safeCode){
            alert('安全码不得为空')
            return false
        }
        this.props.getWalletIndexData({safeCode:this.state.safeCode},()=>{
            hashHistory.push('/safeSet')
        })
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
                {/*<Header/>*/}
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/safeCenter')}
                    rightContent={[]}
                >安全码更改</NavBar>
                <div>
                    <ul className={style.itemUl}>
                        <span className={style.title}>
                            请输入原安全码
                        </span>
                        <li className={style.itemBox}>

                            <InputItem onChange={(value) => {
                                this.setState({safeCode: value})
                            }} placeholder="请输入原安全码" type={this.state.show?"text":"password"} extra={<img style={{width:16,height:16}} onClick={()=>this.show()} src={require(`./images/${this.state.show}.png`)} alt=""/>}></InputItem>
                        </li>
                        <span className={style.tip}>
                            安全码只能修改，不可找回
                        </span>
                    </ul>
                    <div className={style.button} onClick={()=>this.submit()}>
                        下一步
                    </div>
                </div>
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
        getWalletIndexData: bindActionCreators(getWalletIndexData, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast,Picker,Icon,Slider,NavBar} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import {logout} from '../../actions/user'

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classNumber:''
        }
    }

    log (name){
        return (value) => {
            console.log(`${name}: ${value}`);
        };
    }


    componentDidMount(){

    }
    submit(){
        if(this.state.classNumber==''){
            Toast.fail('请填写矿工费', 3, null, false);
            return false
        }
        alert(1)

    }

    render() {
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[]}
                >自定义矿工费</NavBar>
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
                                        defaultValue={0}
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
                    <div className={style.button} onClick={()=>this.submit()}>
                        确定
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
        logout: bindActionCreators(logout, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)


export default BaseUserMsg;
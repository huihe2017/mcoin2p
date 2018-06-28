import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast, NavBar, Icon} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {setNickname} from '../../actions/user'
import {hashHistory} from 'react-router'
import {createForm} from 'rc-form';

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
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

    setName = () => {
        this.props.setNickname({
            userName: this.state.name
        }, () => {
            hashHistory.push('/setPerson')
        })
    }

    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div className={style.wrap}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => hashHistory.push('/setPerson')}
                    rightContent={[
                        <div onClick={this.setName}>完成</div>
                    ]}
                >设置昵称</NavBar>
                <div className={style.part}>
                    <List>
                        <InputItem



                            placeholder="请输入姓名"
                            ref={el => this.autoFocusInst = el}
                            onChange={(value) => {
                                this.setState({name: value})
                            }}
                        ></InputItem>
                    </List>
                </div>
                {/*<Footer/>*/}
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
        setNickname: bindActionCreators(setNickname, dispatch)
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)

const BaseUserMsgWrapper = createForm()(BaseUserMsg);
export default BaseUserMsgWrapper;
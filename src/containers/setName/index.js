import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import {List, InputItem, Toast} from 'antd-mobile';
import Header from '../../components/header'
import Footer from '../../components/footer'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import { createForm } from 'rc-form';

class BaseUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
        const { getFieldProps } = this.props.form;
        return (
            <div className={style.wrap}>

                <div className={style.part}>
                    <List>
                        <InputItem
                            {...getFieldProps('autofocus')}
                            clear
                            // type={'number'}
                            placeholder="请输入姓名"
                            ref={el => this.autoFocusInst = el}
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
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

BaseUserMsg = connect(mapStateToProps, mapDispatchToProps)(BaseUserMsg)

const BaseUserMsgWrapper = createForm()(BaseUserMsg);
export default BaseUserMsgWrapper;
import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { List,InputItem,TextareaItem,Toast} from 'antd-mobile';
import Header from '../../components/header'
import {hashHistory} from 'react-router'
import {setAuthFrom} from '../../actions/authFrom'
import {getDetailMsg} from '../../actions/user'
import {bindActionCreators} from 'redux'

class DetailUserMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount(){
        if(!this.props.user.token){
            this.props.setAuthFrom('/detailUserMsg',()=>{
                hashHistory.push('/auth')
            })
        }else{
            if(this.props.user.status==='27'){

            }else {
                hashHistory.push('/getAccount')
            }
        }
    }

    componentDidMount(){
        this.props.getDetailMsg({

        }, (errorText) => {
            if (errorText) {
                Toast.fail(errorText, 3, null, false)
            }
        })
    }

    render() {
        return (
            <div className={style.wrap}>
                <Header/>
                <div className={style.part}>
                    <header className={style.header}>
                        <span className={style.title}>
                            联络人信息
                        </span>
                        <span className={style.state}>
                            审核通过
                        </span>
                    </header>

                    <List >
                        <InputItem
                            value={this.props.user.realName}
                            editable={false}
                            style={{textAlign:'right'}}
                        >姓名</InputItem>
                        <InputItem
                            value={this.props.user.id}
                            editable={false}
                            style={{textAlign:'right'}}
                        >身份证号码</InputItem>
                        <InputItem
                            value={this.props.user.email}
                            editable={false}
                            style={{textAlign:'right'}}
                        >邮箱(选填)</InputItem>
                        <TextareaItem
                            title="住址(选填)"
                            rows={2}
                            autoHeight
                            editable={false}
                            labelNumber={5}
                            style={{textAlign:'right'}}
                            value={this.props.user.address}
                        />
                    </List>
                </div>

                <div className={style.part}>
                    <header className={style.header}>
                        <span className={style.title}>
                            银行卡信息
                        </span>
                    </header>
                    <List >
                        <InputItem
                            value={this.props.user.bankNo}
                            editable={false}
                            style={{textAlign:'right'}}
                        >结算卡号</InputItem>
                        <InputItem
                            value={this.props.user.bankName}
                            editable={false}
                            style={{textAlign:'right'}}
                        >银行名称</InputItem>
                        <InputItem
                            value={this.props.user.realName}
                            editable={false}
                            style={{textAlign:'right'}}
                        >开户省份</InputItem>
                        <InputItem
                            value={this.props.user.realName}
                            editable={false}
                            style={{textAlign:'right'}}
                        >开户市区</InputItem>
                        <InputItem
                            value={this.props.user.branch}
                            editable={false}
                            style={{textAlign:'right'}}
                        >开户行</InputItem>
                    </List>
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
        setAuthFrom:bindActionCreators(setAuthFrom, dispatch),
        getDetailMsg:bindActionCreators(getDetailMsg, dispatch)
    }
}

DetailUserMsg = connect(mapStateToProps, mapDispatchToProps)(DetailUserMsg)


export default DetailUserMsg;
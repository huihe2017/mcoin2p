import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank,Picker} from 'antd-mobile';
import Header from '../../components/header'

class ForgetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areaCode: [86],
        }
    }

    render() {
        const quhao=[
            {
                value:86,
                label:"中国大陆  +86"
            },{
                value:87,
                label:"中国台湾  +87"
            },{
                value:88,
                label:"中国香港  +88"
            },

        ]
        return (
            <div className={style.wrap}>

                <Header/>
                    <section className={style.content}>
                        <span className={style.title}>
                        忘记密码？
                        </span>
                        <div className={style.selphone}>
                            <div className={style.qh}>
                                <Picker onChange={(value) => {
                                    this.setState({areaCode: value})

                                }} format={(values) => {
                                    console.log(values)
                                    return values.join('').split(' ')[2]
                                }} data={quhao} cols={1} value={this.state.areaCode} defaultValue="1">
                                    <List.Item arrow="horizontal"></List.Item>
                                </Picker>
                            </div>
                            <div className={style.line}></div>
                            <div className={style.phone}>
                                <List>
                                    <InputItem onChange={(value) => {
                                        this.setState({phone: value})
                                    }} placeholder="请输入手机号" type="number"></InputItem>
                                </List>
                            </div>
                        </div>
                        <div className={style.selphone}>
                            <div className={style.tu}>
                                <List>
                                    <InputItem placeholder="请输入图形验证码" type="text"></InputItem>
                                </List>

                            </div>
                            <img className={style.tuxing} src="http://reso2.yiihuu.com/1331436-z.jpg" alt=""/>
                        </div>
                        <div className={style.selphone}>
                            <div className={style.tu}>
                                <List>
                                    <InputItem placeholder="请输入验证码" type="text" extra="获取验证码"></InputItem>
                                </List>

                            </div>
                            <div className={style.lline}></div>

                        </div>
                        <div className={style.selphone}>
                            <div className={style.tu}>
                                <List>
                                    <InputItem type="password" placeholder='请设置6-20位密码'></InputItem>
                                </List>

                            </div>
                        </div>
                        <div className={style.button}>
                            <Button type="primary">
                                确认修改密码
                            </Button>
                        </div>
                    </section>

            </div>
        )

    }


}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

ForgetPwd = connect(mapStateToProps, mapDispatchToProps)(ForgetPwd)


export default ForgetPwd;
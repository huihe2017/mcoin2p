import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { List,InputItem,Button,WingBlank} from 'antd-mobile';
import Header from '../../components/header'

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className={style.wrap}>
                {/*<Header/>*/}
                <div className={style.content}>
                    <div className={style.qcodeBox}>
                        <div className={style.header}>
                            <img src="" className={style.avator} alt=""/>
                            <span className={style.name}>大大大飞机</span>
                        </div>
                        <div className={style.qcode}>

                        </div>
                        <div className={style.footer}>
                            扫一扫二维码图案，在点点数字基金关注我
                        </div>
                    </div>
                </div>
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

AboutUs = connect(mapStateToProps, mapDispatchToProps)(AboutUs)


export default AboutUs;
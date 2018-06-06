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

                            <a className={style.nameA} href="">
                                <span className={style.name}>设置金额</span>
                                <img className={style.nameImg} src={require('./images/edit.png')} alt=""/>
                            </a>
                        </div>
                        <div className={style.qcode}>

                        </div>
                        <div className={style.footer}>
                            186****0031
                        </div>
                        <div className={style.footer1}>
                            <span className={style.address}>
                                1LezCq1NAfdsfbsdkjfksdsasdddddddddsdddsadfsafsadasdasdas
                            </span>
                            <span className={style.addressDo}>
                                复制
                            </span>

                        </div>
                    </div>
                    <div className={style.save}>
                        保存到相册
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
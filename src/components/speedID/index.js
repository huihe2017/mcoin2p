import React from 'react'
import style from "./index.css"
import {connect} from 'react-redux'
import { ImagePicker,Button,WingBlank} from 'antd-mobile';
import Fileupload from 'react-fileupload'
import { Uploader,UploadField } from '@navjobs/upload'

const data1 = [];
const data2 = [];

class SpeedID extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files1: data1,
            files2: data2,
            upImg:true
        }
    }

    onChange1 = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files1:files
        });
    }
    onChange2 = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files2:files
        });
    }

    render() {
        const { files } = this.state;
        return (
            <div className={style.wrap}>
                <div className={style.selimggrp}>
                    {/*<div className={style.img}>*/}
                    {/*<ImagePicker*/}
                    {/*files={this.state.files1}*/}
                    {/*onChange={this.onChange1}*/}
                    {/*onImageClick={(index, fs) => console.log(index, fs)}*/}
                    {/*selectable={this.state.files1.length < 1}*/}
                    {/*/>*/}
                    {/*</div>*/}
                    {/*<div className={style.img}>*/}
                    {/*<ImagePicker*/}
                    {/*files={this.state.files2}*/}
                    {/*onChange={this.onChange2}*/}
                    {/*onImageClick={(index, fs) => console.log(index, fs)}*/}
                    {/*selectable={this.state.files2.length < 1}*/}
                    {/*/>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*<Fileupload options={{*/}
                    {/*baseUrl: '/node/api',*/}
                    {/*param: {*/}
                    {/*_c: 'file',*/}
                    {/*_a: 'UploadFile'*/}
                    {/*},*/}
                    {/*multiple: true,*/}
                    {/*numberLimit: ()=>{},*/}
                    {/*accept: 'image/*',*/}
                    {/*fileFieldName(file) {*/}
                    {/*return file.rawID*/}
                    {/*},*/}
                    {/*chooseAndUpload: true,*/}
                    {/*wrapperDisplay: 'block',*/}
                    {/*beforeUpload: ()=>{},*/}
                    {/*uploading: ()=>{},*/}
                    {/*uploadSuccess: ()=>{},*/}
                    {/*uploadFail: ()=>{},*/}
                    {/*uploadError: ()=>{}*/}
                    {/*}}>*/}
                    {/*<button >wtew</button>*/}
                    {/*</Fileupload>*/}
                    {/*</div>*/}

                    <div>
                        <Uploader
                            request={{
                                fileName: 'file',
                                url: 'https://upload.com',
                                method: 'POST',
                                fields: {
                                    //extra fields to pass with the request
                                    full_name: 'Testing extra fields',
                                },
                                headers: {
                                    //custom headers to send along
                                    Authorization: 'Bearer: Test',
                                },
                                // use credentials for cross-site requests
                                withCredentials: false,
                            }}
                            onComplete={({ response, status }) => {}}
                            //upload on file selection, otherwise use `startUpload`
                            uploadOnSelection={true}
                        >
                            {({ onFiles, progress, complete }) => (
                                <div>
                                    <UploadField onFiles={onFiles}>

                                        <div className={style.selimg}>
                                            {this.state.upImg? <img src={require('../../containers/home/images/MT4bg3X.png')} alt=""/> : <span className={style.filetext}>点击上传身份证人像面</span>}
                                        </div>

                                    </UploadField>
                                    {progress ? `Progress: ${progress}` : null}
                                    {complete ? 'Complete!' : null}
                                </div>
                            )}
                        </Uploader>
                    </div>
                    <div>
                        <Uploader
                            request={{
                                fileName: 'file',
                                url: 'https://upload.com',
                                method: 'POST',
                                fields: {
                                    //extra fields to pass with the request
                                    full_name: 'Testing extra fields',
                                },
                                headers: {
                                    //custom headers to send along
                                    Authorization: 'Bearer: Test',
                                },
                                // use credentials for cross-site requests
                                withCredentials: false,
                            }}
                            onComplete={({ response, status }) => {}}
                            //upload on file selection, otherwise use `startUpload`
                            uploadOnSelection={true}
                        >
                            {({ onFiles, progress, complete }) => (
                                <div>
                                    <UploadField onFiles={onFiles}>
                                        <div className={style.selimg}>
                                            {this.state.upImg? <img src={require('../../containers/home/images/MT4bg3X.png')} alt=""/> : <span className={style.filetext}>点击上传身份证国徽面</span>}

                                        </div>
                                    </UploadField>
                                    {progress ? `Progress: ${progress}` : null}
                                    {complete ? 'Complete!' : null}
                                </div>
                            )}
                        </Uploader>
                    </div>
                </div>
                <div className={style.button}>
                    <WingBlank size="lg">
                        <Button type="primary">确认上传</Button>
                    </WingBlank>
                </div>
                <section className={style.hint}>
                    <header className={style.hinth}>
                        温馨提示：
                    </header>
                    <section className={style.hintc}>
                        <p>建议拍摄角度保持垂直，避免倾斜过大造成图像变形。</p>
                        <p>请提交银行卡原件的正/反两面彩色图片，不要提供黑白图片或复印件。</p>
                        <p>建议银行卡照片保持完整，避免裁剪边角框，有污迹，划痕或折痕。</p>
                        <p>银行卡图片中的文字，号码尽量清晰可辨，建议不要涂改或在名字和卡号文字上加水印。</p>
                    </section>
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

SpeedID = connect(mapStateToProps, mapDispatchToProps)(SpeedID)


export default SpeedID;
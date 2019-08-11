/*
 * @Description: 易交易信息页信息详情
 * @Author: your name
 * @Date: 2019-07-14 14:34:58
 * @LastEditTime: 2019-08-10 19:31:51
 * @LastEditors: Please set LastEditors
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { compose, bindActionCreators } from 'redux';
import {
  WhiteSpace,
  WingBlank,
  Button,
  Modal,
  ImagePicker,
  Toast,
} from 'antd-mobile';
import {
  List,
  ListItem,
  Input,
  Verification,
  Loading,
} from 'components';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import ApiConfig from 'constants/ApiConfig';
import { requestPost } from 'utils/request';
import {
  formaMoney,
  getSeq,
} from 'utils/commonFunction';
import createRequestBody from 'utils/createBody';
import reducer, { initialState } from './redux/reducer';
import saga from './redux/saga';
import {
  // 抢购
  batchUpload,
  popup, // 弹窗控制
  // 图片批量上传
  batchUploadSuccess,
  batchUploadError,
} from './redux/actions';
import Styles from './style.less';
import {
  add,
  noPhoto,
} from '../../../assets/picture';
const IMG_NAME_BASE_URL = ApiConfig.IMG_NAME_BASE_URL;
const requestUrl = ApiConfig.HOST_NAME_BASE_URL + '/business/file/upload';
const alert = Modal.alert;

class Identification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: '', // 营业执照
      manage: '', // 危险品经营许可证
      produce: '', // 危险品产生许可证
      certify: '', // 名牌
      workCard: '', // 在职证明
      incumbency: '', // 工牌
      address: '1', // 地址
      // 填写信息
      bCUrl: '', // 名片
      dGBLUrl: '', // 危险品经营许可证
      entAddress: '', // 公司地址
      entBh: '', // 营业执照号
      entBhUrl: '', // 营业执照
      entPhone: '', // 公司电话
      entTitle: '', // 公司名称
      entType: '', // 公司类型
      hGGLUrl: '', // 危险品生产许可证
      memberId: '', // 会员ID
      memberName: '', // 姓名
      oWUrl: '', // 在职证明
      wCUrl: '', // 工牌

      // 图片选择
      files1: [],
      files2: [],
      files3: [],
      files4: [],
      files5: [],
      files6: [],
      multiple: false,

      positionX: '', // 地址纬度
      positionY: '', // 地址经度

      loading: false, // 控制loading
    };
  }

  componentDidMount() {
    window.Jockey.send('ymt_autoLocation', {}, (data) => {
      this.setState({
        positionX: data.longitude, // 地址纬度
        positionY: data.latitude, // 地址经度
        // address: data.address, // 卸货地址
      });
    });
    this.setState({
      index: this.props.location.index,
    });
  }

  onClickClosePopUp = () => {
    this.props.popup();
  }

  // 选择地址
  chooseAddress = () => {
    window.Jockey.send('ymt_map', {}, (data) => {
      this.setState({
        positionX: data.longitude, // 地址纬度
        positionY: data.latitude, // 地址经度
        address: data.address, // 卸货地址
      });
    });
  }

  onClickSubmit = () => {
    const regexp = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    // alert(regexp.test(this.state.entPhone));
    if (this.state.entTitle === '') {
      Toast.info('请输入公司名称', 1, null, false);
    } else if (this.state.entType === '') {
      Toast.info('请输入公司类型', 1, null, false);
    } else if (this.state.entBh === '') {
      Toast.info('请输入营业执照号', 1, null, false);
    } else if (this.state.address === '') {
      Toast.info('请选择公司地址', 1, null, false);
    } else if (this.state.entPhone === '') {
      Toast.info('请输入公司电话', 1, null, false);
    } else if (!regexp.test(this.state.entPhone)) {
      Toast.info('电话号码格式错误', 1, null, false);
    } else if (this.state.files1.length === 0) {
      Toast.info('请上传营业执照', 1, null, false);
    } else if (this.state.files2.length === 0) {
      Toast.info('请上传危险品经营许可证', 1, null, false);
    } else if (this.state.files3.length === 0) {
      Toast.info('请上传危险品生成许可证', 1, null, false);
    } else if (this.state.memberName == '') {
      Toast.info('请输入姓名', 1, null, false);
    } else if (this.state.files4.length === 0 && this.state.files5.length === 0 && this.state.files6.length === 0) {
      Toast.info('请上传名牌、工牌或者在职证明', 1, null, false);
    } else {
      const formData = new FormData();
      const pic = [];
      pic.push(this.state.files1[0].url);
      pic.push(this.state.files2[0].url);
      pic.push(this.state.files3[0].url);
      if (this.state.files4.length > 0) {
        pic.push(this.state.files4[0].url);
      } else if (this.state.files5.length > 0) {
        pic.push(this.state.files5[0].url);
      } else if (this.state.files6.length > 0) {
        pic.push(this.state.files6[0].url);
      }
      this.setState({
        loading: true, // 控制loading
      });
      // formData.append('files', pic);
      for (let i = 0, j = pic.length; i < j; ++i) {
        this.batchUpload(pic[i]);
      }
      // this.batchUpload(formData);
    }
  }

  // 企业认证
  entAuth = () => {
    const message = {
      arr1: {
        files: '', // 图片数组
        subType: '', // 子类型
      },
      arr: {
        bCUrl: this.state.bCUrl, // 名片
        dGBLUrl: this.state.dGBLUrl, // 危险品经营许可证
        entAddress: this.state.entAddress, // 公司地址
        entBh: this.state.entBh, // 营业执照号
        entBhUrl: this.state.entBhUrl, // 营业执照
        entPhone: this.state.entPhone, // 公司电话
        entTitle: this.state.entTitle, // 公司名称
        entType: this.state.entType, // 公司类型
        hGGLUrl: this.state.hGGLUrl, // 危险品生产许可证
        memberId: this.state.memberId, // 会员ID
        memberName: this.state.memberName, // 姓名
        oWUrl: this.state.oWUrl, // 在职证明
        positionX: this.state.address, // 地址纬度
        positionY: this.state.address, // 地址经度
        wCUrl: this.state.wCUrl, // 工牌
      },
    };
    this.props.batchUpload(message);
  }

  communicatePhotos = (index) => {
    window.Jockey.send('ymt_camera', {
    }, (data) => {
      alert(JSON.stringify(data));
      // const data = num.replace(/\\/g, '');
      alert(JSON.stringify(data));
      if (index === '1') {
        this.setState({
          business: data, // 营业执照
        });
      } else if (index === '2') {
        this.setState({
          manage: data, // 危险品经营许可证
        });
      } else if (index === '3') {
        this.setState({
          produce: data, // 危险品生成许可证
        });
      } else if (index === '4') {
        this.setState({
          certify: data, // 名牌
        });
      } else if (index === '5') {
        this.setState({
          workCard: data, // 工牌
        });
      } else if (index === '6') {
        this.setState({
          incumbency: data, // 工牌
        });
      }
    });
  }

  // input输入框输入
  onChangeInput = (e, value) => {
    if (value === '1') {
      this.setState({
        entTitle: e.target.value, // 公司名称
      });
    } else if (value === '2') {
      this.setState({
        entType: e.target.value, // 公司类型
      });
    } else if (value === '3') {
      this.setState({
        entBh: e.target.value, // 营业执照号
      });
    } else if (value === '4') {
      this.setState({
        entPhone: e.target.value, // 电话号码
      });
    } else if (value === '5') {
      this.setState({
        memberName: e.target.value, // 姓名
      });
    }
  }

  onChangeOne = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files1: files,
    });
  }

  onChangeTwo = (files, type, index) => {
    this.setState({
      files2: files,
    });
  }

  onChangeThree = (files, type, index) => {
    this.setState({
      files3: files,
    });
  }

  onChangeFour = (files, type, index) => {
    this.setState({
      files4: files,
    });
  }

  onChangeFive = (files, type, index) => {
    this.setState({
      files5: files,
    });
  }

  onChangeSix = (files, type, index) => {
    this.setState({
      files6: files,
    });
  }

  // 调用图片上传
  async batchUpload(pic) {
    const message = {
      files: pic,
      subType: 'auth',
    };
    try {
      const result = await requestPost(requestUrl, message, 'multipart/form-data');
      this.setState({
        loading: true, // 控制loading
      });
      if (result.status == '1') {
        this.props.batchUploadSuccess(result.data);
      } else {
        this.props.batchUploadError(result.message);
      }
    } catch (e) {
      this.props.batchUploadError(e.message);
      this.setState({
        loading: false, // 控制loading
      });
    }
  }

  render() {
    const business = {
      backgroundImage: 'url(' + this.state.business + ')',
    };
    const {
      files1,
      files2,
      files3,
      files4,
      files5,
      files6,
    } = this.state;
    return (
      <div className={Styles.identification}>
        <Helmet>
          <title>详情</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div className={Styles.content}>
          <List>
            <ListItem
              arrow=""
              extra="公司名称"
              multipleLine={false}
              onClick={() => {}}
            ><Input placeholder="请输入公司名称" value={this.state.entTitle} onChange={(e) => this.onChangeInput(e, '1')} />
            </ListItem>
            <ListItem
              arrow=""
              extra="公司类型"
              multipleLine={false}
              onClick={() => {}}
            ><Input placeholder="请输入公司类型" value={this.state.entType} onChange={(e) => this.onChangeInput(e, '2')} />
            </ListItem>
            <ListItem
              arrow=""
              extra="营业执照号"
              multipleLine={false}
              onClick={() => {}}
            ><Input placeholder="请输入营业执照号" value={this.state.entBh} onChange={(e) => this.onChangeInput(e, '3')} />
            </ListItem>
            <ListItem
              arrow=""
              extra="公司地址"
              multipleLine={false}
              onClick={() => {}}
            ><div className={Styles.address}><div className={Styles.position}>{this.state.address}</div><div className={Styles.photo} onClick={this.chooseAddress} /></div>
            </ListItem>
            <ListItem
              arrow=""
              extra="公司电话"
              multipleLine={false}
              onClick={() => {}}
            ><Input placeholder="请输入公司电话" value={this.state.entPhone} onChange={(e) => this.onChangeInput(e, '4')} />
            </ListItem>
            <ListItem style={{ minHeight: '0px' }} />
          </List>
        </div>
        <div className={Styles.content}>
          <WingBlank>
            <div className={Styles.businessLicense}>营业执照</div>
            <div className={Styles.license}>
              <div className={Styles.business + ' ' + Styles.block} onClick={() => this.communicatePhoto('1')}>
                <div style={business}>
                  <ImagePicker
                    className={Styles.imageBlock}
                    length="1"
                    files={files1}
                    onChange={this.onChangeOne}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files1.length < 1}
                    // multiple={this.state.multiple}
                  />
                </div>
                {/* <div style={business} />
                <div className={Styles.add} /> */}
                <div>营业执照</div>
              </div>
              <div className={Styles.manage + ' ' + Styles.block} onClick={() => this.communicatePhoto('2')}>
                <div style={business}>
                  <ImagePicker
                    length="1"
                    files={files2}
                    onChange={this.onChangeTwo}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files2.length < 1}
                  />
                </div>
                {/* <div className={Styles.add} /> */}
                <div>危险品经营许可证</div>
              </div>
              <div className={Styles.produce + ' ' + Styles.block} onClick={() => this.communicatePhoto('3')}>
                <div style={business}>
                  <ImagePicker
                    length="1"
                    files={files3}
                    onChange={this.onChangeThree}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files3.length < 1}
                  />
                </div>
                {/* <div className={Styles.add} /> */}
                <div>危险品生成许可证</div>
              </div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
        <div className={Styles.content}>
          <List>
            <ListItem
              arrow=""
              extra="姓名"
              multipleLine={false}
              onClick={() => {}}
            >
              <Input placeholder="请输入姓名" value={this.state.memberName} onChange={(e) => this.onChangeInput(e, '5')} />
            </ListItem>
            <ListItem style={{ minHeight: '0px' }} />
          </List>
          <WingBlank>
            <div className={Styles.businessLicense}>营业执照<span>以下三个任选一个即可认证</span></div>
            <div className={Styles.license}>
              <div className={Styles.certify + ' ' + Styles.block} onClick={() => this.communicatePhoto('4')}>
                <div style={business}>
                  <ImagePicker
                    className={Styles.imageBlock}
                    length="1"
                    files={files4}
                    onChange={this.onChangeFour}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files4.length < 1}
                  />
                </div>
                <div>名牌</div>
              </div>
              <div className={Styles.workCard + ' ' + Styles.block} onClick={() => this.communicatePhoto('5')}>
                <div style={business}>
                  <ImagePicker
                    className={Styles.imageBlock}
                    length="1"
                    files={files5}
                    onChange={this.onChangeFive}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files5.length < 1}
                  />
                </div>
                <div>工牌</div>
              </div>
              <div className={Styles.incumbency + ' ' + Styles.block} onClick={() => this.communicatePhoto('6')}>
                <div style={business}>
                  <ImagePicker
                    className={Styles.imageBlock}
                    length="1"
                    files={files6}
                    onChange={this.onChangeSix}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files6.length < 1}
                  />
                </div>
                <div>在职证明</div>
              </div>
            </div>
          </WingBlank>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button style={{ backgroundColor: 'rgb(32,118,165)' }} onClick={this.onClickSubmit}>提交</Button>
        </WingBlank>
        <WhiteSpace size="lg" />
        {
          this.state.loading ? <Loading /> : ''
        }
        {
          this.props.identification.tips
            ? (
              <Verification
                title1=""
                cancel="取消"
                que="确定"
                ButtonShow="true"
                click={this.onClickClosePopUp}
                clicks={this.onClickClosePopUp}
              >{this.props.identification.errorMsg}
              </Verification>
            )
            : null
        }
      </div>
    );
  }
}

// 向组件中注入action方法
export function mapDispatchToProps(dispatch) {
  return {
    // batchUpload: bindActionCreators(batchUpload, dispatch),
    popup: bindActionCreators(popup, dispatch),
    // 图片批量上传
    batchUploadSuccess: bindActionCreators(batchUploadSuccess, dispatch),
    batchUploadError: bindActionCreators(batchUploadError, dispatch),
  };
}
// 向组件的this.props 注入 store的需要的属性
function mapStateToProps(state, ownProps) {
  return {
    identification: state.get('identification', initialState).toJS(),
    // payMessage: state.get('payMessage').toJS(),
    global: state.get('global').toJS(),
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'identification', reducer });
const withSaga = injectSaga({ key: 'identification', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Identification);

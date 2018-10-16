import { user_Infos, get_material } from 'api/index';
import { useStrict, observable, action, runInAction } from 'mobx';
import _ from 'lodash';
import moment from 'moment';

// useStrict(true);

export default class Store {
  @observable userInfo = {}
  @observable tags = []
  @observable material = {}

  @action.bound
  async fetch_userInfo() {
    this.userInfo = {user:{}};
  }

  @action
  async fetch_material() {
    // get_material().then(res =>{
      // if(200 === res.status) {
        this.material = {
          res: {}
        };
        console.log(this.material);
        // return false;
      // }else {
        // alert('获取数据错误');
      // }
    // })
  }
  // @action
  // fetch_userInfo() {
  //   user_Infos().then(this.success);
  // }
  
  // @action.bound
  // success(res) {
  //   // console.log(res);
  //   if(200 === res.status) {
  //     this.userInfo = res.data;
  //     // console.log(this.userInfo);
  //     return res.data;
  //   }else {
  //     alert('获取数据错误');
  //   }
  // }

}

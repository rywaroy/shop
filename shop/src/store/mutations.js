import * as types from './mutation-types'
export default {
  [types.SHOW_LOGIN_BOX](state, data){
    state.showLoginBox = data;
  },
  [types.SHOW_LOGIN_BOX_TYPE](state, data){
    state.showLoginBoxType = data;
  },
  [types.SET_USERINFO](state, data){
    state.userInfo = data;
  }
}
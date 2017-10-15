import * as types from './mutation-types'
export default {
  [types.SET_ADMININFO](state, data){
    state.adminInfo = data;
  }
}
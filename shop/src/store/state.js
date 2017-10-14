export default {
    userInfo:window.localStorage.getItem('userInfo')?JSON.parse(window.localStorage.getItem('userInfo')):{}, //个人信息
    showLoginBox:false,
    showLoginBoxType:0, //0：显示登录  1：显示注册
  }
const router = require('koa-router')();
const User = require('../controllers/user')
const login = require('../middlewares/isLogin')
const admin = require('../middlewares/isAdmin')
const owner = require('../middlewares/isOwner')

router.post('/reg',User.register)  //注册
router.post('/login',User.login)  //登录
router.post('/avatar',login.isLogin,User.avatar)  //更换头像
router.post('/nickname',login.isLogin,User.nickname)  //更换昵称
router.post('/sex',login.isLogin,User.sex)  //更换性别
router.post('/password',login.isLogin,User.password)  //更换密码
router.get('/list',admin.isAdmin,User.list)  //获取用户列表
router.post('/disable',owner.isOwner,User.disable)  //禁用用户

module.exports = router;
const router = require('koa-router')();
const Attr = require('../controllers/attr')
const admin = require('../middlewares/isAdmin')

router.get('/list',admin.isAdmin,Attr.list)  //获取规格总类
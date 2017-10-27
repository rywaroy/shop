const router = require('koa-router')();
const Attr = require('../controllers/attr')
const admin = require('../middlewares/isAdmin')

router.get('/list',admin.isAdmin,Attr.list)  //获取规格总类
router.get('/item',admin.isAdmin,Attr.item)  //获取分类项目
router.get('/all',admin.isAdmin,Attr.all)  //获取所有规格
router.post('/addclass',admin.isAdmin,Attr.addclass)  //获取添加分类
router.post('/additem',admin.isAdmin,Attr.additem)  //获取添加分类项目
router.post('/deleteitem',admin.isAdmin,Attr.deleteitem)  //删除分类项目
router.post('/deleteclass',admin.isAdmin,Attr.deleteclass)  //删除分类
module.exports = router;
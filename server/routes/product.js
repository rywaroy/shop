const router = require('koa-router')();
const Pro = require('../controllers/product')
const admin = require('../middlewares/isAdmin')

router.post('/addclass',admin.isAdmin,Pro.addclass)  //增加商品分类
router.post('/deleteclass',admin.isAdmin,Pro.deleteclass)  //删除商品分类
router.get('/classlist',Pro.classlist)  //获取商品分类
router.post('/product',admin.isAdmin,Pro.product)  //添加商品
module.exports = router;
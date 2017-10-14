const router = require('koa-router')();
const multer = require('koa-multer');

const storage = multer.diskStorage({  
    //文件保存路径  
    destination: function (req, file, cb) {  
      cb(null, 'public/uploads/')  
    },  
    //修改文件名称  
    filename: function (req, file, cb) {  
      var fileFormat = (file.originalname).split(".");  
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
    }  
  })  
  //加载配置  
  const upload = multer({ storage: storage });  


  router.post('/upload', upload.single('file'), async (ctx, next) => { 
    ctx.success('1','上传成功',{filename: 'http://' + ctx.request.host + '/uploads/' +ctx.req.file.filename}) 
  })  


  module.exports = router;
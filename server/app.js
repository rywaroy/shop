
const Koa = require('koa');
const app = new Koa();
var cors = require('koa-cors');
const router = require('koa-router')();
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')();

var staticServer = require('koa-static');
const user = require('./routes/user');
const file = require('./routes/file');
const attr = require('./routes/attr')
// const admin = require('./routes/admin');
const fs = require('fs')

app.use(staticServer(__dirname + '/public'));
app.use(cors())


//中间件

app.use(convert(bodyparser));
app.use(convert(json()));
app.use(require('./middlewares/returnData'));

router.use('/api/user', user.routes(), user.allowedMethods());
router.use('/api/file', file.routes(), file.allowedMethods());
router.use('/api/attr', attr.routes(), attr.allowedMethods());
app.use(router.routes(), router.allowedMethods());
// router.use('/api/admin',admin.routes(),admin.allowedMethods());

// router.get('/', async (ctx) => {
//     var htmlFile = await (new Promise(function(resolve, reject){
//         let deviceAgent = ctx.headers['user-agent'].toLowerCase();
//         let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
//         if(agentID){
//             fs.readFile('./views/index.html', (err, data) => {
//                 if (err){
//                     reject(err);
//                 }else{
//                     resolve(data);
//                 }
//             });
//         }else{
//             console.log('指到pc网页')
//         }
        
//     }))
//     ctx.type = 'html';
//     ctx.body = htmlFile;
//     // res.sendFile(path.join(__dirname + '/admin/index.html'));
// });


app.listen(3000);
console.log('app started at port 3000...');
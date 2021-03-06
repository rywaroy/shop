const db = require('../config/database');


let isLogin = exports.isLogin = async function (ctx, next) {
    let token = ctx.headers.authorization
    if (!token) {
        ctx.error('401', '您还未登录')
    } else {
        let data = await (new Promise(function (resolve, reject) {
            db.query('select * from user where token = "' + token + '"', function (err, row) {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        }))
        if (data.length == 1) {
            if(data[0].status > 0){
                ctx.userInfo = data[0];
                await next();
            }else{
                ctx.error('0', '你的账号已被禁用')
            }
            
        } else {
            ctx.error('401', '登录失效')
        }
    }



}
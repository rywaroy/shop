const db = require('../config/database');


let isOwner = exports.isOwner = async function (ctx, next) {
    let token = ctx.headers.authorization
    if (!token) {
        ctx.error('401', '您还未登录')
    }else{
        let data = await (new Promise(function (resolve, reject) {
            db.query('select * from user where token = "' + token + '"', function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        }))
        if (data.length == 1) {
            if(data[0].status == 3){
                ctx.userInfo = data[0];
                await next();
            }else{
                ctx.error('0', '你没有权限')
            }
            
        } else {
            ctx.error('401', '登录失效')
        }
    }
    


}

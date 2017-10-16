const db = require('../config/database');

const Attr = {}

Attr.list = async () => {
    let data = await(new Promise((resolve,reject) => {
        db.query('selet * from attr',function(err,rows){
            if(err) throw err;
            resolve(rows)
        })  
    }))
    ctx.success('1','获取成功',data)
}
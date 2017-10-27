const db = require('../config/database');

const Attr = {}

Attr.list = async (ctx) => {
    let data = await(new Promise((resolve,reject) => {
        db.query('select * from attr',function(err,rows){
            if(err) throw err;
            resolve(rows)
        })  
    }))
    ctx.success('1','获取成功',data)
}

Attr.item = async (ctx) => {
    let id = ctx.query.id
    let data = await(new Promise((resolve,reject) => {
        db.query('select * from attr_item where attr_id = ?',[id],function(err,rows){
            if(err) throw err;
            resolve(rows)
        })  
    }))
    ctx.success('1','获取成功',data)
}

Attr.all = async (ctx) => {
    let data = await(new Promise((resolve,reject) => {
        db.query('select a.id, a.value ,b.id as aid, b.attr_id , b.value as item_value from attr as a left join attr_item as b on a.id = b.attr_id',function(err,rows){
            if(err) throw err;
            resolve(rows)
        })  
    }))
    let json = {}
    let arr = []
    for(let i = 0; i < data.length ; i++){
        if(!json[data[i].id]){
            let arr2 = []
            for(let j = 0; j <data.length ; j++){
                if(data[i].id == data[j].id){
                    arr2.push({'attr_id':data[j].attr_id,'item_value':data[j].item_value,'aid':data[j].aid})
                }
            }
            arr.push({'id':data[i].id,value:data[i].value,items:arr2})
            json[data[i].id] = 1
        }
    }
    ctx.success('1','获取成功',arr)
}

Attr.addclass = async (ctx) => {
    let value = ctx.request.body.value
    await (new Promise((resolve,reject) => {
        db.query('insert into attr (value) values (?)',[value],function(err,rows){
            if (err) {
                throw err
            } else {
                if (rows.insertId) {
                    resolve()
                }
            }
        })
    }))
    ctx.success('1','添加成功')
}

Attr.additem = async (ctx) => {
    let id = ctx.request.body.id
    let value = ctx.request.body.value
    await (new Promise((resolve,reject) => {
        db.query('insert into attr_item (value,attr_id) values (?,?)',[value,id],function(err,rows){
            if (err) {
                throw err
            } else {
                if (rows.insertId) {
                    resolve()
                }
            }
        })
    }))
    ctx.success('1','添加成功')
}

Attr.deleteitem = async (ctx) => {
    let id = ctx.request.body.id
    await (new Promise((resolve,reject) => {
        db.query('delete from attr_item where id = ?',[id],function(err,rows){
            if (err) throw err
            resolve()
        })
    }))
    ctx.success('1','删除成功')
}

Attr.deleteclass = async (ctx) => {
    let id = ctx.request.body.id
    await (new Promise((resolve,reject) => {
        db.query('delete from attr where id = ?',[id],function(err,rows){
            if (err) throw err
            resolve()
        })
    }))
    ctx.success('1','删除成功')
}
module.exports = Attr
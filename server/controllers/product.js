const db = require('../config/database');

const Product = {}

Product.addclass = async (ctx) => {
    let value = ctx.request.body.value
    await (new Promise((resolve,reject) => {
        db.query('insert into class (value) values (?)',[value],function(err,rows){
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

Product.deleteclass = async (ctx) => {
    let id = ctx.request.body.id
    await (new Promise((resolve,reject) => {
        db.query('delete from class where id = ?',[id],function(err,rows){
            if (err) throw err
            resolve()
        })
    }))
    ctx.success('1','删除成功')
}

Product.classlist = async (ctx) => {
    let data = await (new Promise((resolve,reject) => {
        db.query('select * from class',function(err,rows){
            if (err) throw err
            resolve(rows)
        })
    }))
    ctx.success('1','获取成功',data)
}

Product.product = async (ctx) => {
    let cid = ctx.request.body.cid
    let name = ctx.request.body.name
    let price = ctx.request.body.price
    let stock = ctx.request.body.stock
    let intro = ctx.request.body.intro
    let photo = ctx.request.body.photo
    let insertId = await (new Promise((resolve,reject) => {
        db.query('insert into product (name,price,stock,intro,photo,cid) values (?,?,?,?,?,?)',[name,price,stock,intro,photo,cid],function(err,rows){
            if (err) {
                throw err
            } else {
                if (rows.insertId) {
                    resolve(rows.insertId)
                }
            }
        })
    }))
}

module.exports = Product
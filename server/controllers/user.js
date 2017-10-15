const db = require('../config/database');
const uuidv4 = require('uuid/v4');

const User = {}

User.register = async(ctx) => {
    let account = ctx.request.body.account
    let password = ctx.request.body.password
    let nickname = ctx.request.body.nickname
    let date = new Date()
    try {
        let id = await register(account, password, nickname, date)
        if (id) {
            ctx.success('1', '注册成功')
        }
    } catch (e) {
        ctx.error('0', '该手机已被注册')
    }
}

function register(account, password, nickname, date) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user (account,password,nickname,created) VALUES(?,?,?,?)', [account, password, nickname, date], (err, rows) => {
            if (err) {
                if (err.sqlState = 23000) {
                    reject()
                }
            } else {
                if (rows.insertId) {
                    resolve(rows.insertId)
                }
            }


        })
    })
}

User.login = async(ctx) => {
    let account = ctx.request.body.account
    let password = ctx.request.body.password
    let data = await login(account, password)
    if(data.length == 1){
        let token = await setToken(account, password)
        data[0].token = token
        ctx.success('1','登录成功',data[0])
    }else{
        ctx.error(0,'账号或密码错误')
    }
}   

function login(account, password) {
    return new Promise((resolve, reject) => {
        db.query('select * from user where account = ? and password = ?', [account, password], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}
function setToken(account, password){
    return new Promise((resolve, reject) => {
        let token = uuidv4();
        db.query('update user set token = ? where account = ? and password = ?',[token,account, password],(err, rows) =>{
            if(err){
                reject(err)
            }else{
                resolve(token)
            }
        })
    })
}

User.avatar = async (ctx) => {
    let imgurl = ctx.request.body.imgurl
    let token = ctx.headers.authorization
    await (new Promise((resolve, reject) => {
        db.query('update user set avatar = ? where token = ?',[imgurl,token],(err, rows) =>{
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    }))
    let userInfo = await newUesrInfo(token);
    ctx.success('1','修改成功',userInfo)
}

User.nickname = async (ctx) => {
    let nickname = ctx.request.body.nickname
    let token = ctx.headers.authorization
    await (new Promise((resolve, reject) => {
        db.query('update user set nickname = ? where token = ?',[nickname,token],(err, rows) =>{
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    }))
    let userInfo = await newUesrInfo(token);
    ctx.success('1','修改成功',userInfo)
}

User.sex = async (ctx) => {
    let sex = ctx.request.body.sex
    let token = ctx.headers.authorization
    await (new Promise((resolve, reject) => {
        db.query('update user set sex = ? where token = ?',[sex,token],(err, rows) =>{
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    }))
    let userInfo = await newUesrInfo(token);
    ctx.success('1','修改成功',userInfo)
}

User.password = async (ctx) => {
    let password = ctx.request.body.password
    let oldpwd = ctx.request.body.oldpwd
    if(ctx.userInfo.password != oldpwd){
        ctx.error('0','原密码错误')
    }else{
        let token = ctx.headers.authorization
        await (new Promise((resolve, reject) => {
            db.query('update user set password = ? where token = ?',[password,token],(err, rows) =>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        }))
        ctx.success('1','修改成功',{})
    }
    
}

function newUesrInfo(token){
    return new Promise((resolve, reject) => {
        db.query('select * from user where token = ?',[token],(err, rows) =>{
            if(err){
                reject(err)
            }else{
                resolve(rows[0])
            }
        })
    })
}

User.list = async (ctx) => {
    let limit = ctx.query.limit || '20';
    let page = ctx.query.page || '1';
    let data = await (new Promise((resolve,reject) => {
        db.query('select id , account , sex , nickname , integral , created , status from user where status <= 1 limit ' + (page-1)*limit + ' , ' + limit , function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    }))
    let count = await (new Promise((resolve,reject) => {
        db.query('select count(*) from user where status <= 1', function (err, row) {
			if (err) {
				reject(err)
			} else {
				resolve(row[0]['count(*)'])
			}
		})
    }))
    ctx.success('1','获取成功',{list:data,total:count})
}

User.disable = async (ctx) => {
    let id = ctx.request.body.id
    let status = 0
    await (new Promise((resolve,reject) => {
        db.query('update user set status = 0 where id = ' + id, function (err, rows) {
            if (err) {
                reject(err)
            }
            else {
                resolve()
            }
        })
    }))
    ctx.success('1','成功禁用该用户')
}


module.exports = User
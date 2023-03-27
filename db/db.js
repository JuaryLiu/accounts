module.exports = function (success,error) {
// 设置error参数的初始值
if(typeof error !== 'function') {
    error = ()=> {
        console.log('连接失败');
    }
}
//安装 mongoose 
//导入 mongoose
const mongoose = require('mongoose')
// mongoose.set('strictQuery',true)
 // 连接 mongoose 服务                      数据库的名称 不存在会自动创建
 const {DBHOST,DBPORT,DBNAME} = require('../config/config');
 mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

 // 设置回调 提高功能性 once 一次 事件回调函数只执行一次
 //连接成功回调
 mongoose.connection.once('open',() => {
    success()
 })

 // 连接错误回调
 mongoose.connection.on('error',() => {
    error()
 })
 // 连接关闭回调
 mongoose.connection.on('close',() => {
    console.log('连接关闭');
 })
}
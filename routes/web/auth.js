var express = require('express');
var router = express.Router();
const UserModel = require('../../model/UserModel')
const md5 = require('md5')
const session = require('express-session')
const MongoStore = require('connect-mongo')
 //注册路由规则
 router.get('/reg',(req,res) => {
    res.render('reg')
 })

 router.post('/reg',(req,res) => {
    UserModel.create({...req.body, password:md5(req.body.password)} ,(err,data)=> {
        if(err) {
            res.status(500).send('注册失败')
            return
        }
        res.render('success',{title:'注册成功',url:'/login'})
    })
 })

// 登录页面 
router.get('/login',(req,res)=> {
    res.render('login')
})
router.post('/login',(req,res)=> {
    let {username,password} = req.body
    UserModel.findOne({username:username,password:md5(password)},(err,data)=> {
        if(err) {
            res.status(500).send('请稍后在试')
            return
        }
        if(!data) {
            return res.send('用户名或密码错误')
        }
        // 存入session
        req.session.username = data.username
        req.session._id = data._id
        res.render('success',{title:'登录成功',url:'/account'})
        
    })
})
router.post('/logout',(req,res) => {
    req.session.destroy(()=> {
        res.render('success',{title:'退出成功',url:'login'})
    })
})


module.exports = router;

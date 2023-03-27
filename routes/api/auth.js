const express = require('express');
const router = express.Router();
const UserModel = require('../../model/UserModel')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

router.post('/login',(req,res)=> {
    let {username,password} = req.body
    UserModel.findOne({username:username,password:md5(password)},(err,data)=> {
        if(err) {
           res.json({
            code:'2001',
            msg:'数据库读取错误~~~',
            data:null
           })
           return
        }
        if(!data) {
          return  res.json({
                    code:'2002',
                    msg:'用户名或密码错误~~~',
                    data:null
               })
        }
        //存入token
        let token = jwt.sign({
            username: data.username,
            _id: data._id
        },'ljhlovelyl',{
            expiresIn: 60 * 60 *24
        })
        //响应token;
        res.json({
            code:'0000',
            msg:'登录成功',
            data: token
        })
        
    })
})


module.exports = router;

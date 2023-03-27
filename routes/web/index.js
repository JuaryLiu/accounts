var express = require('express');
var router = express.Router();

const moment = require('moment')

const AccountModel = require('../../model/AccountModel')
const checkLoginMindleWare = require('../../mindlewares/checkLoginMindleware')

// 首页
router.get('/',(req,res)=> {
  // 重定向
  res.redirect('/account')
})

/* 记账本列表 */
router.get('/account', checkLoginMindleWare,function(req, res, next) {
  //获取信息
  // let accounts = db.get('accounts').value() 
  AccountModel.find().sort({time:-1}).exec((err,data)=> {
    if(err) {
      console.log('读取失败');
      return
    }
    res.render('list',{accounts:data,moment:moment})
  })
});

/* 添加记录 */
router.get('/account/create', checkLoginMindleWare,function(req, res, next) {
  res.render('create')
});

/* 新增记录 */
router.post('/account',checkLoginMindleWare, function(req, res, next) {
  //字符串转日期对象
  // moment(2022-25-15).toDate()
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改time属性的类型
    time : moment(req.body.time).toDate()
  },(err,data)=> {
    if (err) {
      res.status(500).send('插入失败')
      return
    }
    res.render('success',{title:'添加成功哟~',url:'/account'})
  })
  // 定义 id
  // let id = shortid.generate()
  //  // 写入文件
  //  db.get('accounts').unshift({id:id,...req.body}).write()

});

// 删除记录
router.get('/account/:id',checkLoginMindleWare,(req,res)=> {
  //获取id
  let id = req.params.id
  // db.get('accounts').remove({id:id}).write()
  AccountModel.deleteOne({_id:id},(err,data)=> {
    if(err) {
      console.log('删除失败');
      return
    }
    res.render('success',{title:'删除成功啦~',url:'/account'})
  })
})

module.exports = router;

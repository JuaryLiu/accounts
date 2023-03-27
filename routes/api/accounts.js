var express = require('express');
var router = express.Router();


const moment = require('moment');

const AccountModel = require('../../model/AccountModel')
const checkTokenMindleware = require('../../mindlewares/checkTokenMindleware')

/* 记账本列表 */
router.get('/account',checkTokenMindleware, function(req, res, next) {
  //获取信息
  AccountModel.find().sort({time:-1}).exec((err,data)=> {
    if(err) {
      res.json({
        code:'1001',
        msg:'读取失败',
        data:null
      })
      return
    }
    res.json({
        // 响应编码
        code:'0000',
        // 响应信息
        msg:'读取成功',
        data:data
    })
  })
});

/* 添加记录 */
router.get('/account/create',checkTokenMindleware, function(req, res, next) {
  res.render('create')
});

/* 新增记录 */
router.post('/account', checkTokenMindleware,function(req, res, next) {
  //字符串转日期对象
  // moment(2022-25-15).toDate()
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改time属性的类型
    time : moment(req.body.time).toDate()
  },(err,data)=> {
    if (err) {
      res.json({
        code:'1002',
        msg:'添加失败',
        data:null
      })
      return
    }
    res.json({
        code:'0000',
        msg:'添加成功',
        data:data
    })
  })
//   // 定义 id
//   let id = shortid.generate()
//    // 写入文件
//    db.get('accounts').unshift({id:id,...req.body}).write()

});

// 删除记录
router.delete('/account/:id', checkTokenMindleware,(req,res)=> {
  //获取id
  let id = req.params.id
  // db.get('accounts').remove({id:id}).write()
  AccountModel.deleteOne({_id:id},(err,data)=> {
    if(err) {
      res.json({
        code:'1003',
        msg:'删除失败',
        data:null
      })
      return
    }
    res.json({
        code:'0000',
        msg:'删除成功',
        data:data
    })
  })
})

// 获取单个账单记录
router.get('/account/:id', checkTokenMindleware,(req,res)=> {
    let {id} = req.params
    AccountModel.findById({_id:id},(err,data)=> {
        if(err) {
          return  res.json({
                code:'1004',
                msg:'获取失败',
                data:null
            })
        }
        res.json({
            code:'0000',
            msg :'获取成功',
            data:data
        })

    })
})

// 更新账单接口
router.patch('/account/:id',checkTokenMindleware,(req,res)=> {
    let {id} = req.params
    AccountModel.updateOne({_id:id},req.body,(err,data) =>{
        if(err) {
            return res.json({
                code:'1005',
                msg:'更新失败',
                data:null
            })
        }
        AccountModel.findById({_id:id},(err,data)=> {
            if(err) {
                return  res.json({
                      code:'1004',
                      msg:'获取失败',
                      data:null
                  })
              }
              res.json({
                code:'0000',
                msg:'更新成功',
                data:data
            })
        })
    })
})

module.exports = router;

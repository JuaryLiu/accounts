module.exports = (req,res,next)=> {
  const jwt = require('jsonwebtoken')
    let token = req.get('token')
      if(!token) {
       return res.json({
          code:'2003',
          msg:'数据缺失',
          data:null
        })
      }
    jwt.verify(token,'ljhlovelyl',(err,data)=> {
       if(err) {
        return res.json({
          code:'2004',
          msg:'校验失败',
          data : null
        }) 
       }
     next()
    })
  }
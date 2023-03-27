const mongoose = require('mongoose')
// 创建新文档结构对象
    // 设置集合文档中的属性和属性值得类型
    let AccountSchema = new mongoose.Schema (
        {
            title:{
                type:String,
                required:true
            },
            time: Date,
            type: {
                type:String,
                default:-1
            },
            account: {
                type:Number,
                required:true
            },
            remarks: String
        }
    )
    // 创建模型对象 对文档操作的封装对象
    let AccountModel = mongoose.model('accounts',AccountSchema)

module.exports = AccountModel
const mongoose = require('mongoose')
// 创建新文档结构对象
    // 设置集合文档中的属性和属性值得类型
    let UserSchema = new mongoose.Schema (
        {
            username:{
                type:String,
                required: true,
                unique:true
            },
            password:{
                type:String
            }
        }
    )
    // 创建模型对象 对文档操作的封装对象
    let UserModel = mongoose.model('users',UserSchema)

module.exports = UserModel
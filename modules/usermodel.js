const mongoose = require('mongoose')
const user_schema = mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    pass:String
    

})

const Usermodel = mongoose.model('users',user_schema)
module.exports={
    Usermodel
}
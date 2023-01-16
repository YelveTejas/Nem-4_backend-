const mongoose=require('mongoose')
const post_schema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String
})


const Postmodel =mongoose.model('posts',post_schema)

module.exports={
    Postmodel
}
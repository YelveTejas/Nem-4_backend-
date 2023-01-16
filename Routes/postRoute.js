const express = require('express')
const PostRoute = express.Router()
const { Postmodel } = require('../modules/postmodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

PostRoute.get('/',async(req,res)=>{
    try{
      const posts = await Postmodel.find()
      res.send(posts)

    }catch(err){
        console.log(err)
    }
})

PostRoute.post('/create',async(req,res)=>{
    const payload = req.body
    try{
    const post = new Postmodel(payload)
    await post.save()
    res.send('Added Post')
    }catch(err){
    console.log(err)

    }
})

PostRoute.patch('/update/:id',async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const post = await Postmodel.findOne({'_id':id})
    const userID_in_post = post.userID_in_post
    const userID_in_req = req.body.userID

    try{
        if(userID_in_post!==userID_in_req){
            res.send('You are not authenticated')
        }
        else{
            post = await Postmodel.findByIdAndUpdate({"_id":id},payload)
            res.send('Updated Post')
        }
    
    }catch(err){
       console.log(err)
     
    }
})
PostRoute.delete('/delete/:id',async(req,res)=>{
    const id=  req.params.id
    const post = await Postmodel.findOne({'_id':id})
    const userID_in_post = post.userID_in_post
    const userID_in_req = req.body.userID

    try{
        if(userID_in_post!==userID_in_req){
            res.send('You are not authenticated')
        }else{
            await Postmodel.findOneAndDelete({'_id':id})
             res.send('Deleted')
        }
      
    }catch(err){
    console.log(err)
    }
})

module.exports={
    PostRoute
}